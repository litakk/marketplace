"use client";
import { useState } from "react";
import AddCategories from "./components/AddCategories";

const Admin: React.FC = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          🛠️ Admin Panel
        </h1>

        <div className="flex justify-center gap-6 mb-8">
          <a
            href="/admin/add-product"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            ➕ Добавить товар
          </a>

          <button
            onClick={() => setOpen(true)}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            🗂️ Добавить категорию
          </button>
        </div>

        {isOpen && <AddCategories setOpen={setOpen} />}
      </div>
    </div>
  );
};

export default Admin;
