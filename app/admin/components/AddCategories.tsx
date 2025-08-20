"use client";

import { useState } from "react";
import { UploadButton } from "@/src/utils/uploadthing";
import Image from "next/image";

interface modal {
  setOpen: (val: boolean) => void;
}

const AddCategories: React.FC<modal> = ({ setOpen }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!name || !imageUrl) {
        alert("Укажите название и загрузите фото");
        return;
      }

      const res = await fetch("/api/admin/add-categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, imageUrl }),
      });

      if (!res.ok) throw new Error("Ошибка при создании категории");

      alert("✅ Категория успешно добавлена!");
      setName("");
      setImageUrl("");
    } catch (error: any) {
      console.error(error);
      alert(`❌ Ошибка: ${error.message}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0000004d] bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Добавить категорию
            </h2>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Название категории
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Например: T-Shirts"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Фото категории
              </label>
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setImageUrl(res[0].ufsUrl);
                }}
                onUploadError={(error: Error) => {
                  alert(`Ошибка загрузки: ${error.message}`);
                }}
                appearance={{
                  button:
                    "ut-ready:bg-black ut-uploading:cursor-not-allowed bg-gray-900 rounded-md px-4 py-2 text-white",
                  container: "w-full flex justify-start",
                }}
              />
              {imageUrl && (
                <div className="mt-3 border rounded-md overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt="category image"
                    width={500}
                    height={300}
                    className="w-full h-auto object-contain"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Сохранить категорию
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategories;
