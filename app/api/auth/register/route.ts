import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { PrismaClient } from "@prisma/client";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Инициализация Redis (Upstash)
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Лимит: 2 запроса за 10 секунд (можешь настроить)
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(2, "10 s"),
  analytics: true,
});

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // Получаем IP (через прокси, если есть)
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() ?? "anonymous";
    console.log("Client IP:", ip);

    // Проверка блокировки IP
    const isBlocked = await redis.get(`block-ip:${ip}`);
    if (isBlocked) {
      return NextResponse.json(
        { error: "Ваш IP временно заблокирован за подозрительную активность." },
        { status: 403 }
      );
    }

    // Rate limiting
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      const key = `violations:${ip}`;
      const violations = await redis.incr(key);
      if (violations === 1) await redis.expire(key, 600);
      if (violations >= 5) {
        await redis.set(`block-ip:${ip}`, "1", { ex: 3600 });
        return NextResponse.json(
          { error: "Ваш IP заблокирован на 1 час." },
          { status: 403 }
        );
      }
      return NextResponse.json(
        { error: "Слишком много запросов. Попробуйте позже." },
        { status: 429 }
      );
    }

    // Парсим тело запроса
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email и пароль обязательны" },
        { status: 400 }
      );
    }

    // Хэшируем пароль
    const hashedPassword = await hash(password, 10);

    // Создаем пользователя
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name ?? null,
      },
    });

    return NextResponse.json({ message: "Пользователь создан" });
  } catch (e) {
    console.error("Ошибка регистрации:", e);
    if (
      e instanceof Error &&
      e.message.includes("Unique constraint failed on the fields: (`email`)")
    ) {
      return NextResponse.json(
        { error: "Пользователь с таким email уже существует" },
        { status: 409 }
      );
    }
    // Добавляем подробный вывод ошибки для разработки
    return NextResponse.json(
      { error: "Ошибка регистрации", details: String(e) },
      { status: 500 }
    );
  }
}
