import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProductDto {
  id: number;
  name: string;
  imageUrl: string | null;
  price: number;
}

async function getProducts(categoryId: string): Promise<ProductDto[]> {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const res = await fetch(`${base}/api/products/by-category/${categoryId}`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function CategoryPage({ params }: any) {
  const products = await getProducts(params.id);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Товары категории</h1>
          <p className="text-sm text-muted-foreground mt-1">Найдите то, что вам нужно.</p>
        </div>
        <Link href="/" className="text-sm underline underline-offset-4">
          На главную
        </Link>
      </div>

      {!products.length ? (
        <div className="text-sm text-muted-foreground">Товары не найдены.</div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-none border border-neutral-200 hover:shadow-sm transition-shadow duration-300"
            >
              <div className="overflow-hidden">
                <img
                  src={product.imageUrl ?? "/placeholder.svg"}
                  alt={product.name}
                  className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-3">
                <p className="text-[13px] md:text-[14px] tracking-wide text-neutral-900">
                  {product.name}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-[13px] md:text-[14px] text-neutral-600">${product.price}</p>
                  <Link href={`/product/${product.id}`}>
                    <Button className="cursor-pointer h-9 px-5 rounded-full bg-black text-white hover:bg-neutral-900 text-[12px] tracking-wider uppercase">
                      Подробнее
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
