// app/dashboard/inventory/page.tsx

import { Plus, Pencil, Trash2, Archive, X } from 'lucide-react';

// 1. Impor "jembatan" Prisma
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// 2. Buat fungsi untuk mengambil data dari database
async function getProducts() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc', // Tampilkan produk terbaru di atas
    },
  });
  return products;
}

// Ubah komponen Anda menjadi "async"
export default async function InventoryPage() {
  // 3. Panggil fungsi dan tunggu datanya
  const products = await getProducts();

  // (Logika untuk add, edit, delete akan kita perbaiki nanti di Fase 2/3)
  // Untuk saat ini, kita fokus menampilkan data dulu

  return (
    <>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Kolom Tabel (Utama) */}
        <div className="flex-1">
          <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left ...">Product</th>
                  <th className="px-6 py-4 text-left ...">Category</th> {/* Akan kosong dulu */}
                  <th className="px-6 py-4 text-left ...">Stock</th>
                  <th className="px-6 py-4 text-left ...">Price</th>
                  <th className="px-6 py-4 text-left ...">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {/* 4. Loop data dari database */}
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 ...">{p.name}</td>
                    <td className="px-6 py-4 ...">-</td> {/* Kategori belum ada */}
                    <td className="px-6 py-4 ...">{p.stock}</td>
                    <td className="px-6 py-4 ...">Rp{p.price.toLocaleString('id-ID')}</td>
                    <td className="flex gap-3 px-6 py-4">
                      {/* Tombol-tombol ini belum berfungsi, akan kita perbaiki */}
                      <button className="text-blue-600 hover:text-blue-800"><Pencil size={18} /></button>
                      <button className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Kolom Kontrol (Samping) */}
        <div className="w-full lg:w-72">
          <button
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-maroon px-6 py-3 text-lg font-semibold text-white shadow-md transition-colors hover:bg-maroon-dark"
          >
            <Plus size={20} />
            Add Product
          </button>
          <div className="mt-6 transform rounded-2xl bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-500">Total Products</span>
              <Archive className="h-8 w-8 text-maroon" />
            </div>
            {/* 5. Hitung data dari database */}
            <p className="mt-4 text-4xl font-bold text-gray-900">{products.length}</p>
          </div>
        </div>
      </div>

      {/* Modal-modal akan kita perbaiki belakangan */}
    </>
  );
}