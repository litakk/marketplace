"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ToastContainer, toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowRight } from "lucide-react";

import SwiperLogos from "@/app/components/SwiperLogos";
import CategoryProducts from "@/app/components/CategoryProducts";

import "swiper/css";

interface Product {
  id: number;
  imageUrl: string | null;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  category: {
    name: string;
  };
}

interface ProductVariant {
  id: number;
  color: string;
  size: string;
  imageUrl: string | null;
  price: number | null;
  stock: number;
  productId: number;
}

const Page: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
    null
  );
  const [quantity, setQuantity] = useState(1);

  const params = useParams();
  const { data: session } = useSession();

  const notifyTrue = () => toast.success("Added to cart!");
  const notifyFalse = () => toast.error("Failed to add to cart!");

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch("/api/products");
        const data: Product[] = await res.json();
        setAllProducts(data);

        const selectedProduct = data.find((p) => p.id === Number(params.id));
        setProduct(selectedProduct ?? null);

        if (selectedProduct) {
          const resVariants = await fetch(
            `/api/variants?productId=${selectedProduct.id}`
          );
          const variantsData: ProductVariant[] = await resVariants.json();

          setVariants(variantsData);
          if (variantsData.length > 0) {
            setSelectedVariantId(variantsData[0].id);
          }
        }
      } catch (error) {
        console.log("Ошибка при получении данных:", error);
      }
    };
    getProduct();
  }, [params.id]);

  const handleAddToCart = async () => {
    try {
      if (!selectedVariantId) return;
      const cart = await fetch("/api/cart/addCartProd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product?.id,
          variantId: selectedVariantId,
          quantity: quantity,
        }),
      });
      cart.ok ? notifyTrue() : notifyFalse();
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return (
      <div className="flex flex-col items-center space-y-4 p-6">
        <Skeleton className="h-5 w-[200px]" />
        <Skeleton className="h-[300px] w-[250px]" />
        <Skeleton className="h-5 w-[200px]" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-5 py-10">
      <ToastContainer />
      <p className="text-[13px] md:text-[14px] tracking-wide text-neutral-500 mb-6">
        Home / Shop / {product.category.name}
      </p>

      {/* Блок товара */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Картинка товара */}
        <div className="flex items-center justify-center">
          <img
            src={
              variants.find((v) => v.id === selectedVariantId)?.imageUrl ||
              product.imageUrl ||
              ""
            }
            alt={product.name}
            className="w-full max-w-[400px] sm:max-w-[500px] max-h-[300px] sm:max-h-[500px] object-cover border border-neutral-200"
          />
        </div>

        {/* Описание товара */}
        <div className="space-y-6">
          <h1 className="text-[20px] md:text-[24px] font-semibold tracking-wide text-neutral-900">
            {product.name}
          </h1>
          <p className="text-[14px] md:text-[15px] text-neutral-600 leading-relaxed">
            {product.description}
          </p>
          <p className="text-[16px] md:text-[18px] font-semibold text-neutral-900">
            $
            {variants.find((v) => v.id === selectedVariantId)?.price ??
              product.price}
          </p>

          {/* Варианты */}
          {variants.length > 0 && (
            <div>
              <p className="text-[13px] uppercase tracking-[0.22em] mb-2 text-neutral-700">
                Варианты
              </p>
              <select
                className="border border-neutral-300 text-[14px] px-3 py-2 rounded-md w-full"
                value={selectedVariantId ?? ""}
                onChange={(e) => setSelectedVariantId(Number(e.target.value))}
              >
                {variants.map((variant) => (
                  <option key={variant.id} value={variant.id}>
                    {variant.color} / {variant.size} —{" "}
                    {variant.price ? `$${variant.price}` : "Базовая цена"}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Количество */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="flex items-center justify-center border border-neutral-300 w-8 h-8 rounded-full"
            >
              -
            </button>
            <span className="text-[14px]">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="flex items-center justify-center border border-neutral-300 w-8 h-8 rounded-full"
            >
              +
            </button>
          </div>

          {/* Кнопка */}
          {session ? (
            <Button
              onClick={handleAddToCart}
              className="w-full md:w-auto bg-black text-white hover:bg-neutral-900 px-8 py-3 rounded-full uppercase tracking-[0.22em] text-[12px]"
            >
              Add to Cart
            </Button>
          ) : (
            <a href="/register">
              <Button className="bg-black text-white hover:bg-neutral-900 px-8 py-3 rounded-full uppercase tracking-[0.22em] text-[12px]">
                Register / Login
              </Button>
            </a>
          )}

          <p className="text-[13px] text-neutral-500">
            Category:{" "}
            <span className="text-neutral-900 font-medium">
              {product.category.name}
            </span>
          </p>
        </div>
      </div>

      {/* Похожие товары */}
      <p className="mt-14 mb-10 text-center text-[14px] md:text-[16px] tracking-[0.28em] uppercase text-neutral-900">
        Похожие товары из категории "{product.category.name}"
      </p>
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="px-2"
      >
        {allProducts
          .filter((p) => p.category.name === product.category.name)
          .map((Allprod) => (
            <SwiperSlide key={Allprod.id}>
              <div className="bg-white border border-neutral-200 hover:shadow-sm transition duration-300">
                <img
                  src={Allprod.imageUrl || ""}
                  alt={Allprod.name}
                  className="w-full aspect-[3/4] object-cover"
                />
                <div className="p-3">
                  <p className="text-[13px] md:text-[14px] tracking-wide text-neutral-900">
                    {Allprod.name}
                  </p>
                  <p className="text-[13px] md:text-[14px] text-neutral-600 mb-2">
                    ${Allprod.price}
                  </p>
                  <a
                    href={`/product/${Allprod.id}`}
                    className="flex items-center justify-center gap-2"
                  >
                    <Button className="w-full h-9 rounded-full bg-black text-white hover:bg-neutral-900 text-[12px] tracking-wider uppercase">
                      Подробнее <ArrowRight size={16} />
                    </Button>
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>

      <div className="mt-16">
        <SwiperLogos />
      </div>

      <div className="mt-16">
        <CategoryProducts />
      </div>
    </div>
  );
};

export default Page;
