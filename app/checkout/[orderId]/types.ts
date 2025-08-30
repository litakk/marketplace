export type Variant = {
  id: number;
  imageUrl: string;
  color?: string;
  size?: string;
  label?: string | null;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
};

export type OrderItem = {
  id: number;
  orderId: number;
  productId: number;
  variantId: number;
  price: number;
  quantity: number;
  variant?: Variant;
  createdAt: string;
  updatedAt: string;
};

export type Order = {
  id: number;
  userId: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
};
