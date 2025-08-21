  "use client";

  import { useParams } from "next/navigation";
  import { useEffect, useState } from "react";

  import { useSession } from "next-auth/react";
  import { Button } from "@/components/ui/button";
  import { ArrowRight } from "lucide-react";

  import { Skeleton } from "@/components/ui/skeleton";

  import CategoryProducts from "@/app/components/CategoryProducts";
  import SwiperLogos from "@/app/components/SwiperLogos";

  import { ToastContainer, toast } from "react-toastify";

  import { Swiper, SwiperSlide } from "swiper/react";

  import "swiper/css";
  import "swiper/css/effect-coverflow";
  import "swiper/css/pagination";

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

  const page: React.FC = () => {
    const [product, setProduct] = useState<Product | null>(null);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [variants, setVariants] = useState<ProductVariant[]>([]);
    const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
      null
    );
    const [quantity, setQuantity] = useState(1);

    function AddQuantity() {
      setQuantity(quantity + 1);
    }

    function Decrement() {
      setQuantity(quantity - 1);
    }

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
          console.log(data);

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

        if (cart.ok) {
          notifyTrue();
        } else {
          notifyFalse();
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (!product) {
      return (
        <div className="flex flex-col space-y-3 p-6 items-center justify-center">
          <div className="space-y-2">
            <Skeleton className="h-5 w-[200px]" />
          </div>
          <Skeleton className="h-[384px] w-[345px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-[200px]" />
          </div>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-5 py-5">
        <ToastContainer />
        <p className="text-sm text-gray-600 mb-5">
          Home / Shop / {product.category.name}
        </p>

        <div className="overflow-hidden">
          <div>
            <div className="flex items-center justify-center mb-5">
              {/* Показываем изображение выбранного варианта, если есть, иначе основное */}
              <img
                src={
                  variants.find((v) => v.id === selectedVariantId)?.imageUrl ||
                  product.imageUrl ||
                  undefined
                }
                alt={product.name}
                className="max-h-96 w-full object-contain"
              />
            </div>

            <div className="mb-3">
              <h1 className="font-bold text-[22px] text-[#121717] ">
                {product.name}
              </h1>

              <div className="mb-3">
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mb-2">
                <p className="font-bold text-[18px] text-[#121717] mb-2">Price</p>
                <p className="font-normal text-[16px] text-[#8A6E61] ">
                  {/* Показываем цену варианта, если есть, иначе цену продукта */}
                  $
                  {variants.find((v) => v.id === selectedVariantId)?.price ??
                    product.price}
                </p>
              </div>

              {/* Выбор варианта */}
              {variants.length > 0 && (
                <div className="mb-5">
                  <p className="font-bold text-[18px] text-[#121717] mb-2">
                    Варианты
                  </p>

                  <select
                    className="border border-gray-300 rounded px-3 py-2"
                    value={selectedVariantId ?? ""}
                    onChange={(e) => setSelectedVariantId(Number(e.target.value))}
                  >
                    {variants.map((variant) => (
                      <option key={variant.id} value={variant.id}>
                        {variant.color} / {variant.size} —{" "}
                        {variant.price ? `$${variant.price}` : `Базовая цена`}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <p className="font-bold text-[18px] text-[#121717] mb-2">
                  Quantity
                </p>
              </div>

              <div className="flex justify-between mb-5">
                <div>
                  <p className="font-normal text-[16px] text-[#121717] mb-2">
                    Quantity
                  </p>
                </div>

                <div className="flex items-center">
                  <button
                    onClick={Decrement}
                    className="flex items-center bg-[#F0F5F5] p-2 rounded-full w-7 h-7 "
                  >
                    -
                  </button>
                  <span className="px-3 py-1">{quantity}</span>
                  <button
                    onClick={AddQuantity}
                    className="flex items-center bg-[#F0F5F5] p-2 rounded-full w-7 h-7 "
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="">
                {session ? (
                  <button
                    onClick={handleAddToCart}
                    className="w-full h-auto lg:w-[200px] bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <a href="/register">
                    <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-md font-medium transition-colors">
                      Register or Login for buy something
                    </button>
                  </a>
                )}
              </div>

              <div className="border-t  pt-4 lg:border-none">
                <p className="text-sm text-gray-500">
                  Category:{" "}
                  <span className="font-medium text-gray-700">
                    {product.category.name}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-5 mb-5 md:mt-7 md-mb-7 2xl:mt-10 2xl:mb-10 2xl:text-2xl font-bold">
          Похожие товары из категории "{product.category.name}"
        </p>

        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            320: {
              slidesPerView: 2,
            },
            480: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
            1280: {
              slidesPerView: 5,
            },
          }}
          className="mySwiper px-2"
        >
          {allProducts
            .filter((p) => p.category.name === product.category.name)
            .map((Allprod) => (
              <SwiperSlide key={Allprod.id}>
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <img
                    src={Allprod.imageUrl || undefined}
                    alt={Allprod.name}
                    className="w-full h-[240px] lg:h-[300px] object-cover rounded-[8px]"
                  />
                  <p className="font-medium text-[16px] text-[#171212] mt-2">
                    {Allprod.name}
                  </p>
                  <p className="font-normal text-[14px] text-[#8A6E61] mb-2">
                    ${Allprod.price}
                  </p>
                  <Button className="flex items-center gap-2 bg-[#8A6E61] text-white hover:bg-[#6c5247] text-sm px-4 py-2 rounded-lg transition duration-300">
                    <a href={`/product/${Allprod.id}`}>Перейти к товару</a>
                    <ArrowRight size={18} />
                  </Button>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>

        <div>
          <SwiperLogos />
        </div>

        <div className="mt-5">
          <CategoryProducts />
        </div>
      </div>
    );
  };

  export default page;
