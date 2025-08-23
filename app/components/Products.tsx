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
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 6 }).map((_, i) => {
          return (
            <div key={i} className="">
              <Skeleton className="h-[125px] md:h-[312px] lg:h-[309px] xl:h-[320px] w-full rounded-xl" />
              <div className="space-y-2 mt-2">
                <Skeleton className="h-4 w-full max-w-[250px]" />
                <Skeleton className="h-4 w-full max-w-[200px]" />
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
        <div key={category} className="mb-8">
          <p className="font-bold text-[22px] mb-2">{category}</p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {products.slice(0, countCart[category] ?? 5).map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: product.id * 0.01 }}
              >
                <div key={product.id}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-[240px] lg:h-[366px] object-cover rounded-[8px]"
                  />
                  <p className="font-medium text-[16px] text-[#171212] mt-1">
                    {product.name}
                  </p>
                  <div className="justify-between">
                    <p className="font-normal text-[14px] text-[#8A6E61] mb-2 mt-1">
                      ${product.price}
                    </p>
                    <Link href={`/product/${product.id}`}>
                      <Button className="flex items-center gap-1 md:gap-2 bg-[#8A6E61] text-white hover:bg-[#6c5247] md:text-[16px] md:px-5 md:py-5 rounded-lg transition duration-700 cursor-pointer">
                        Перейти к товару
                        <ArrowRight size={18} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Button
              onClick={() => showMore(category)}
              className="mt-10 border border-[#8A6E61] bg-[#8A6E61]/5 text-[#8A6E61] hover:bg-[#8A6E61]/20 rounded-lg transition duration-700 md:text-[18px] md:px-6 md:py-6"
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
