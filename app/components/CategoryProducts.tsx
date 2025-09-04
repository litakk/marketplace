"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

interface Categories {
  id: string;
  name: string;
  imageUrl: string;
}

const CategoryProducts: React.FC = () => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch("/api/categories/all");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.log("Ошибка загрузки категорий:", err);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    getCategories();
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
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {categories.map((item) => (
          <button
            key={item.id}
            onClick={() => router.push(`/category/${item.id}`)}
            className="text-left group"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-[240px] lg:h-[366px] object-cover rounded-[8px] transition-transform group-hover:scale-[1.01]"
            />
            <p className="font-medium lg:text-xl text-[#171212] mt-1">
              {item.name}
            </p>
          </button>
        ))}
      </div>
    </>
  );
};

export default CategoryProducts;
