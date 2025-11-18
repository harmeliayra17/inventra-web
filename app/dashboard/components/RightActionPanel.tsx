// app/dashboard/components/RightActionPanel.tsx
'use client';

import {
  Search,
  Bell,
  Plus,
  ArrowRight,
  Shirt,
  Smartphone,
  Headphones,
  User, // Ikon profil
} from 'lucide-react';
import { useSession, signOut } from 'next-auth/react'; // Impor untuk data user & logout

// (Data dummy untuk "Fast Moving Items")
const fastMovingItems = [
  { name: 'Kaos Polos Hitam', icon: Shirt },
  { name: 'Kemeja Putih', icon: Shirt },
  { name: 'iPhone 14 Pro', icon: Smartphone },
  { name: 'Logitech Headset', icon: Headphones },
];

export default function RightActionPanel() {
  // Ambil data session untuk menampilkan nama Admin
  const { data: session } = useSession();

  return (
    // Wrapper Panel Kanan:
    // Posisinya 'fixed' di kanan, lebar 288px (w-72), latar putih, garis batas kiri
    <aside className="fixed right-0 top-0 flex h-screen w-72 flex-col border-l border-gray-200 bg-white">
      
      {/* 1. Header Panel: Search & Profil */}
      <div className="flex h-20 items-center justify-between gap-4 border-b border-gray-200 px-6">
        {/* Search Bar */}
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={20} />
          </span>
          <input
            type="search"
            placeholder="Search..."
            className="w-full rounded-full border-gray-300 py-2 pl-10 pr-4 shadow-sm focus:border-maroon focus:ring-maroon"
          />
        </div>
        
        {/* Ikon Notifikasi & Profil */}
        <div className="flex items-center gap-4">
          <Bell size={24} className="cursor-pointer text-gray-500 hover:text-gray-900" />
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-maroon text-white">
            {/* Tampilkan inisial nama atau ikon */}
            <User size={20} />
          </div>
        </div>
      </div>

      {/* 2. Info Profil (BARU) */}
      <div className="flex flex-col items-center border-b border-gray-200 p-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-maroon text-white mb-3">
          <User size={32} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          {session?.user?.name || (session?.user as any)?.username || 'Admin'}
        </h3>
        <p className="text-sm text-gray-500">
          {(session?.user as any)?.role || 'ADMIN'}
        </p>
        <button 
          onClick={() => signOut()} // Tombol logout
          className="mt-4 w-full rounded-lg bg-gray-100 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          Logout
        </button>
      </div>

      {/* 3. Konten Panel (Bisa di-scroll) */}
      <div className="flex-1 overflow-y-auto p-6">
        
        {/* A. Aksi Cepat (Quick Actions) */}
        <section className="mb-8">
          <h3 className="mb-4 text-lg font-semibold text-gray-800">
            Aksi Cepat
          </h3>
          <div className="space-y-3">
            <button className="flex w-full items-center justify-between rounded-lg bg-maroon/10 p-4 text-maroon transition-colors hover:bg-maroon/20">
              <span className="flex items-center gap-3">
                <Plus size={18} />
                <span className="font-medium">Tambah Produk Baru</span>
              </span>
              <span className="text-xs text-gray-400">ctrl+P</span>
            </button>
            <button className="flex w-full items-center justify-between rounded-lg bg-gray-100 p-4 text-gray-700 transition-colors hover:bg-gray-200">
              <span className="flex items-center gap-3">
                <Plus size={18} />
                <span className="font-medium">Tambah Supplier</span>
              </span>
              <span className="text-xs text-gray-400">ctrl+S</span>
            </button>
          </div>
        </section>

        {/* B. Produk Laris (Fast Moving Items) */}
        <section>
          <h3 className="mb-4 text-lg font-semibold text-gray-800">
            Produk Laris
          </h3>
          <ul className="space-y-4">
            {fastMovingItems.map((item) => (
              <li key={item.name} className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                  <item.icon size={20} className="text-gray-600" />
                </div>
                <span className="flex-1 font-medium text-gray-700">
                  {item.name}
                </span>
                <ArrowRight size={18} className="text-gray-400" />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </aside>
  );
}