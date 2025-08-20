"use client";

import { useEffect, useState } from "react";
import { UploadButton } from "@/src/utils/uploadthing";
import Image from "next/image";

interface Category {
  id: number;
  name: string;
}

interface Variant {
  color: string;
  size: string;
  price: number;
  stock: number;
  imageUrl: string;
}

const AddProduct = () => {
  // 1) Состояния для товара
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<string>("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [baseImageUrl, setBaseImageUrl] = useState("");

  // 2) Массив вариантов
  const [variants, setVariants] = useState<Variant[]>([
    { color: "", size: "", price: 0, stock: 0, imageUrl: "" },
  ]);

  // Загрузка списка категорий
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/categories/all");
        const data: Category[] = await res.json();
        setCategories(data);
        if (data.length) setCategoryId(String(data[0].id));
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  // Функция обновления одного поля варианта
  const updateVariant = (
    idx: number,
    field: keyof Variant,
    value: string | number
  ) => {
    const newVars = [...variants];
    // @ts-ignore
    newVars[idx][field] = value;
    setVariants(newVars);
  };

  // Добавить новый пустой вариант
  const addVariant = () => {
    setVariants((prev) => [
      ...prev,
      { color: "", size: "", price: 0, stock: 0, imageUrl: "" },
    ]);
  };

  // Удалить вариант по индексу
  const removeVariant = (idx: number) => {
    setVariants((prev) => prev.filter((_, i) => i !== idx));
  };

  // Сабмит формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // TODO: можно добавить валидацию дубликатов color+size

      const payload = {
        name,
        description,
        imageUrl: baseImageUrl,
        categoryId: Number(categoryId),
        variants,
      };

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Ошибка при создании");
      alert("✅ Товар с вариантами создан");
      // сброс формы
      setName("");
      setDescription("");
      setBaseImageUrl("");
      setVariants([{ color: "", size: "", price: 0, stock: 0, imageUrl: "" }]);
    } catch (err: any) {
      alert(`❌ ${err.message}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Добавить товар с вариантами</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* --- Основная инфа о товаре --- */}
        <div>
          <label className="block font-medium">Главная картинка</label>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => setBaseImageUrl(res[0].ufsUrl)}
            onUploadError={(e) => alert(e.message)}
          />
          {baseImageUrl && (
            <Image
              src={baseImageUrl}
              alt="base"
              width={240}
              height={240}
              className="mt-2 rounded"
            />
          )}
        </div>
        <div>
          <label className="block font-medium">Название</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Описание</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
            rows={3}
            required
          />
        </div>
        <div>
          <label className="block font-medium">Категория</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full border p-2 rounded"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* --- ДИНАМИЧЕСКИЙ СПИСОК ВАРИАНТОВ --- */}
        <div>
          <h3 className="font-semibold mb-2">Варианты</h3>
          {variants.map((v, i) => (
            <div
              key={i}
              className="border p-4 rounded mb-4 relative bg-gray-50"
            >
              {variants.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeVariant(i)}
                  className="absolute top-2 right-2 text-red-500"
                >
                  ×
                </button>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label>Цвет</label>
                  <input
                    value={v.color}
                    onChange={(e) => updateVariant(i, "color", e.target.value)}
                    className="w-full border p-1 rounded"
                    required
                  />
                </div>
                <div>
                  <label>Размер</label>
                  <input
                    value={v.size}
                    onChange={(e) => updateVariant(i, "size", e.target.value)}
                    className="w-full border p-1 rounded"
                    required
                  />
                </div>
                <div>
                  <label>Цена</label>
                  <input
                    type="number"
                    value={v.price}
                    onChange={(e) =>
                      updateVariant(i, "price", Number(e.target.value))
                    }
                    className="w-full border p-1 rounded"
                    required
                  />
                </div>
                <div>
                  <label>Остаток</label>
                  <input
                    type="number"
                    value={v.stock}
                    onChange={(e) =>
                      updateVariant(i, "stock", Number(e.target.value))
                    }
                    className="w-full border p-1 rounded"
                    required
                  />
                </div>
                <div>
                  <label>Картинка варианта</label>
                  <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) =>
                      updateVariant(i, "imageUrl", res[0].ufsUrl)
                    }
                    onUploadError={(e) => alert(e.message)}
                  />
                  {v.imageUrl && (
                    <Image
                      src={v.imageUrl}
                      alt="variant"
                      width={120}
                      height={80}
                      className="mt-1 rounded"
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addVariant}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            Добавить вариант
          </button>
        </div>

        {/* --- Сабмит --- */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Сохранить товар
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
