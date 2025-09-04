import Link from "next/link";

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

export default async function CategoryPage({ params }: { params: { id: string } }) {
  const products = await getProducts(params.id);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Товары категории</h1>
          <p className="text-sm text-muted-foreground mt-1">Найдите то, что вам нужно.</p>
        </div>
        <Link href="/" className="text-sm underline underline-offset-4">На главную</Link>
      </div>

      {!products.length ? (
        <div className="text-sm text-muted-foreground">Товары не найдены.</div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((p) => (
            <div key={p.id} className="">
              <img
                src={p.imageUrl ?? "/placeholder.svg"}
                alt={p.name}
                className="w-full h-[240px] lg:h-[366px] object-cover rounded-[8px]"
              />
              <div className="mt-2">
                <p className="font-medium lg:text-xl text-[#171212]">{p.name}</p>
                <p className="text-sm text-muted-foreground">{Math.max(0, p.price).toFixed(2)} ₽</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}


