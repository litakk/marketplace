"use client";

import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import { motion } from "framer-motion";
import Link from "next/link";

interface Product {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
  price: number;
  category: {
    name: string;
  };
}

const Products: React.FC = () => {
  const [groupedProducts, setGroupedProducts] = useState<
    Record<string, Product[]>
  >({});
  const [loading, setLoading] = useState(true);

  const [countCart, setCountCart] = useState<Record<string, number>>({});

  function showMore(categoryName: string) {
    setCountCart((prev) => ({
      ...prev,
      [categoryName]: (prev[categoryName] ?? 1) + 5,
    }));
  }

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch("/api/products");
        const data: Product[] = await res.json();
        console.log(data);

        const grouped = data.reduce((acc: Record<string, Product[]>, item) => {
          const cat = item.category?.name || "Без категории";
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(item);
          return acc;
        }, {});
        setGroupedProducts(grouped);
      } catch (error) {
        console.log("Ошибка при получении данных", error);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 6 }).map((_, i) => {
          return (
            <div key={i} className="">
              <Skeleton className="h-[125px] md:h-[312px] lg:h-[309px] xl:h-[320px] w-full rounded-none" />
              <div className="space-y-2 mt-4">
                <Skeleton className="h-3 w-full max-w-[240px]" />
                <Skeleton className="h-3 w-full max-w-[200px]" />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <>
      {Object.entries(groupedProducts).map(([category, products]) => (
        <div key={category} className="mb-24">
          <p className="text-center text-[14px] md:text-[16px] tracking-[0.28em] uppercase text-neutral-900 mb-10">
            {category}
          </p>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.slice(0, countCart[category] ?? 5).map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: product.id * 0.01 }}
              >
                <div
                  key={product.id}
                  className="group bg-white rounded-none border border-neutral-200 hover:shadow-sm transition-shadow duration-300"
                >
                  <div className="overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-[13px] md:text-[14px] tracking-wide text-neutral-900">
                      {product.name}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-[13px] md:text-[14px] text-neutral-600">
                        ${product.price}
                      </p>
                      <Link href={`/product/${product.id}`}>
                        <Button className="cursor-pointer h-9 px-5 rounded-full bg-black text-white hover:bg-neutral-900 text-[12px] tracking-wider uppercase">
                          Подробнее
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Button
              onClick={() => showMore(category)}
              className="mt-14 border border-neutral-900 bg-transparent text-neutral-900 hover:bg-neutral-900 hover:text-white rounded-full transition duration-300 text-[11px] md:text-[12px] px-10 py-3 tracking-[0.22em] uppercase"
            >
              Показать больше
            </Button>
          </div>
        </div>
      ))}
    </>
  );
};

export default Products;
