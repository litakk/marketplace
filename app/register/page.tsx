import { redirect } from "next/navigation";
import Form from "./form";
import { getServerSession } from "next-auth";
import Link from "next/link";
export default async function RegisterPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }

  return (
    <section className="relative py-20">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-white dark:bg-neutral-950" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          <div className="hidden lg:flex relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-neutral-950 text-white p-12">
            <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[repeating-linear-gradient(90deg,transparent,transparent_12px,rgba(255,255,255,0.35)_12px,rgba(255,255,255,0.35)_13px)]" />
            <div className="relative z-10 flex flex-col justify-between min-h-[30rem]">
              <div>
                <div className="text-[10px] uppercase tracking-[0.35em] text-white/60">
                  Fall/Winter 25
                </div>
                <h2 className="mt-4 text-6xl font-extrabold leading-[1.05] tracking-tight">
                  MARKETPLACE
                </h2>
                <p className="mt-4 max-w-md text-sm text-white/70">
                  A new standard in wardrobe. Less noise. More intention.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-6 text-xs">
                <div className="space-y-1">
                  <div className="uppercase tracking-widest text-white/60">
                    Member
                  </div>
                  <div className="text-lg font-semibold">Perks</div>
                </div>
                <div className="space-y-1">
                  <div className="uppercase tracking-widest text-white/60">
                    Curated
                  </div>
                  <div className="text-lg font-semibold">Drops</div>
                </div>
                <div className="space-y-1">
                  <div className="uppercase tracking-widest text-white/60">
                    Early
                  </div>
                  <div className="text-lg font-semibold">Access</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-full max-w-md mx-auto">
              <div className="mb-10">
                <div className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                  Account
                </div>
                <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                  Create account
                </h1>
              </div>

              <div className="rounded-2xl border border-black/10 dark:border:white/10 bg-white dark:bg-neutral-900 p-8">
                <Form />
              </div>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                Уже есть аккаунт?{" "}
                <Link
                  href="/login"
                  className="font-medium underline underline-offset-4"
                >
                  Войти
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
