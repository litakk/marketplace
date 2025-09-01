"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-neutral-950 border-t border-black/10 dark:border-white/10">
      {/* Основной контент */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Верхняя секция */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Логотип и описание */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                <span className="text-white dark:text-black font-bold text-sm">
                  M
                </span>
              </div>
              <span className="text-lg font-semibold">MARKETPLACE</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              A new standard in wardrobe. Less noise. More intention.
            </p>
          </div>

          {/* Навигационные ссылки */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground mb-4">
                Shop
              </div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/catalog"
                    className="text-sm hover:underline underline-offset-4"
                  >
                    Catalog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cart"
                    className="text-sm hover:underline underline-offset-4"
                  >
                    Cart
                  </Link>
                </li>
                <li>
                  <Link
                    href="/search"
                    className="text-sm hover:underline underline-offset-4"
                  >
                    Search
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground mb-4">
                Account
              </div>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/profile"
                    className="text-sm hover:underline underline-offset-4"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="text-sm hover:underline underline-offset-4"
                  >
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="text-sm hover:underline underline-offset-4"
                  >
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Подписка */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground mb-4">
              Newsletter
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              Stay informed about new collections and exclusive offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 bg-transparent border-0 border-b border-black/15 focus:border-black/80 dark:border-white/20 dark:focus:border-white/80 h-9 px-0 outline-none transition text-sm"
              />
              <button className="ml-4 text-sm underline underline-offset-4 hover:no-underline">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Разделитель */}
        <div className="border-t border-black/10 dark:border-white/10 mb-8" />

        {/* Нижняя секция */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground">
            © {currentYear} Marketplace. All rights reserved.
          </div>

          <div className="flex items-center space-x-6 text-xs">
            <Link href="/" className="hover:underline underline-offset-4">
              Home
            </Link>
            <Link
              href="/catalog"
              className="hover:underline underline-offset-4"
            >
              Shop
            </Link>
            <Link
              href="/profile"
              className="hover:underline underline-offset-4"
            >
              Account
            </Link>
          </div>
        </div>
      </div>

      {/* Кнопка "Наверх" */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 w-10 h-10 bg-black dark:bg-white text-white dark:text-black rounded-none flex items-center justify-center shadow-sm transition-colors duration-300 z-40"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4" />
      </motion.button>
    </footer>
  );
};

export default Footer;
