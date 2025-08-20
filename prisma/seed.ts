import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  "Clothing",
  "Shoes",
  "Accessories",
  "Electronics",
  "Home & Kitchen",
  "Sports",
];

const sizes = ["XS", "S", "M", "L", "XL"];
const colors = ["Black", "White", "Red", "Blue"];

const generateImageUrl = (seed: string) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/600/800`;

async function main() {
  console.log("🌱 Seeding started...");

  // Очистка таблиц (в нужном порядке из-за связей)
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Создаем категории
  const categoryRecords = await Promise.all(
    categories.map((name) =>
      prisma.category.create({
        data: { name },
      })
    )
  );

  // Создаем товары и варианты
  for (const category of categoryRecords) {
    for (let i = 1; i <= 8; i++) {
      const productName = `${category.name} Product ${i}`;
      const basePrice = 20 + Math.floor(Math.random() * 80);
      const product = await prisma.product.create({
        data: {
          name: productName,
          description: `Description for ${productName}`,
          imageUrl: generateImageUrl(productName),
          stock: 0, // можно пересчитать позже сумму по вариантам, либо оставить 0
          categoryId: category.id,
        },
      });

      let totalStock = 0;

      // Создаем варианты для каждого товара
      for (const color of colors) {
        for (const size of sizes) {
          const variantPrice = basePrice + (Math.random() > 0.5 ? 5 : 0);
          const variantStock = 5 + Math.floor(Math.random() * 20);
          totalStock += variantStock;

          await prisma.productVariant.create({
            data: {
              color,
              size,
              price: variantPrice,
              stock: variantStock,
              imageUrl: generateImageUrl(`${productName}-${color}-${size}`),
              productId: product.id,
            },
          });
        }
      }

      // Обновим stock в продукте как сумму вариантов
      await prisma.product.update({
        where: { id: product.id },
        data: { stock: totalStock },
      });
    }
  }

  console.log("✅ Seeding completed.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  