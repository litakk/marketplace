export default function AdminHome() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <a href="/admin/products" className="p-4 rounded border bg-white hover:shadow">
        <div className="text-sm text-gray-500">Раздел</div>
        <div className="text-lg font-semibold">Товары</div>
      </a>
      <a href="/admin/categories" className="p-4 rounded border bg-white hover:shadow">
        <div className="text-sm text-gray-500">Раздел</div>
        <div className="text-lg font-semibold">Категории</div>
      </a>
      <a href="/admin/orders" className="p-4 rounded border bg-white hover:shadow">
        <div className="text-sm text-gray-500">Раздел</div>
        <div className="text-lg font-semibold">Заказы</div>
      </a>
      <a href="/admin/users" className="p-4 rounded border bg-white hover:shadow">
        <div className="text-sm text-gray-500">Раздел</div>
        <div className="text-lg font-semibold">Пользователи</div>
      </a>
    </div>
  );
}
