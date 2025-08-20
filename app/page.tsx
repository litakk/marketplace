import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Search from "./components/Search";

import Swiper from "./components/Swiper";
import SwiperLogos from "./components/SwiperLogos";
import CategoryProducts from "./components/CategoryProducts";
import Products from "./components/Products";
import Faq from "./components/Faq";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  type CartItem = {
    id: number;
    quantity: number;
    product: {
      name: string;
      imageUrl: string | null;
      price: number; 
      description: string | null;
      createdAt: Date;
      category: {
        name: string;
      };
    };
  };

  let cartItems: CartItem[] = [];

  if (userId) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(userId) },
        select: {
          cartItems: {
            select: {
              id: true,
              quantity: true,
              product: {
                select: {
                  name: true,
                  imageUrl: true,
                  description: true,
                  createdAt: true,
                  category: {
                    select: {
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      cartItems = (user?.cartItems || []).map((item) => ({
        id: item.id,
        quantity: item.quantity,
        product: {
          name: item.product.name,
          imageUrl: item.product.imageUrl,
          price: 0, // если нужна цена — надо добавить или получить из варианта
          description: item.product.description,
          createdAt: item.product.createdAt,
          category: {
            name: item.product.category.name,
          },
        },
      }));

    } catch (error) {
      console.log("Ошибка при получении данных:", error);
      cartItems = [];
    }
  }

  return (
    <div className="pt-2 pr-2 pl-2 md:px-3 lg:px-5 xl:px-7">
      <div className="lg:hidden">
        <Search />
      </div>
      <div className="mt-5">
        <Swiper />
      </div>
      <div className="mt-[30px] mb-[30px]">
        <p className="font-bold text-[22px]">Shop by Clothes</p>
      </div>
      <div>
        <CategoryProducts />
      </div>
      <div>
        <SwiperLogos />
      </div>
      <div className="mt-[30px] mb-[30px]">
        <p className="font-bold text-[22px]">Our Products</p>
      </div>
      <div>
        <Products />
      </div>
      <div>
        <Faq />
      </div>
    </div>
  );
}
