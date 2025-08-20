import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      variants: true,
    },
  });

  const productsWithMinPrice = products.map((product) => ({
    ...product,
    price: Math.min(...product.variants.map((v) => v.price ?? 0)),
  }));

  return Response.json(productsWithMinPrice);
}
