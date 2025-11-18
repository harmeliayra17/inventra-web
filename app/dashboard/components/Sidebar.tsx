// app/dashboard/components/Sidebar.tsx
'use client'; // Sidebar harus jadi Client Component untuk hook

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react'; // 1. Impor hook useSession
import {
  LayoutDashboard,
  Archive,
  Users,
  ShoppingCart,
  HardDrive,
  Building,
  Tags,
  FileText,
  LogOut,
  BookMarked,
  LoaderCircle, // Untuk loading
} from 'lucide-react';

// 2. Buat "Master List" (Daftar Utama) BARU dengan 'group'
const menuConfig = [
  {
    group: 'GENERAL',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, roles: ['ADMIN'] },
      { name: 'Cabang / Outlet', href: '/dashboard/cabang', icon: Building, roles: ['ADMIN'] },
      { name: 'Produk / Inventory', href: '/dashboard/inventory', icon: Archive, roles: ['ADMIN'] },
      { name: 'Kategori / Supplier', href: '/dashboard/kategori', icon: Tags, roles: ['ADMIN'] },
      { name: 'User / Kasir', href: '/dashboard/users', icon: Users, roles: ['ADMIN'] },
      { name: 'Transaksi / Penjualan', href: '/dashboard/history', icon: BookMarked, roles: ['STAFF', 'ADMIN'] },
    ],
  },
  {
    group: 'LAPORAN',
    items: [
      { name: 'Laporan', href: '/dashboard/laporan', icon: FileText, roles: ['ADMIN'] },
    ],
  },
  {
    group: 'KASIR',
    items: [
      { name: 'Transaksi Baru (POS)', href: '/dashboard/pos', icon: ShoppingCart, roles: ['STAFF'] },
      { name: 'Lihat Stok', href: '/dashboard/stok', icon: Archive, roles: ['STAFF'] },
    ],
  },
];


// --- Komponen Skeleton untuk Loading ---
function SidebarSkeleton() {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col bg-maroon text-white animate-pulse">
      <div className="flex h-20 items-center justify-center gap-3 border-b border-maroon-light px-6">
        <div className="h-8 w-8 rounded-full bg-maroon-light"></div>
        <div className="h-6 w-32 rounded bg-maroon-light"></div>
      </div>
      <nav className="flex-1 space-y-2 p-4">
        <div className="h-10 rounded-lg bg-maroon-light"></div>
        <div className="h-10 rounded-lg bg-maroon-light"></div>
        <div className="h-10 rounded-lg bg-maroon-light"></div>
        <div className="h-10 rounded-lg bg-maroon-light"></div>
      </nav>
    </aside>
  );
}

// --- Komponen Sidebar Utama ---
export default function Sidebar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const userRole = (session?.user as any)?.role;

  // 5. Tampilkan loading skeleton jika session masih diambil
  if (status === 'loading') {
    return <SidebarSkeleton />;
  }

  // 6. Filter menu berdasarkan role pengguna (LOGIKA BARU)
  const accessibleGroups = menuConfig
    .map((group) => {
      // Filter item di dalam setiap grup
      const accessibleItems = group.items.filter((item) =>
        item.roles.includes(userRole)
      );

      // Kembalikan grup HANYA JIKA ada item yang bisa diakses di dalamnya
      return {
        ...group,
        items: accessibleItems,
      };
    })
    .filter((group) => group.items.length > 0); // Hapus grup yang kosong

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col bg-maroon text-white">
      {/* Logo */}
      <div className="flex h-20 items-center justify-center gap-3 border-b border-maroon-light px-6">
        <HardDrive className="h-8 w-8 text-yellow-400" />
        <span className="text-2xl font-bold text-white">Inventra-Web</span>
      </div>

      {/* 7. Render daftar menu yang BARU (dengan grup) */}
      <nav className="flex-1 space-y-4 p-4">
        {accessibleGroups.map((group) => (
          <div key={group.group}>
            {/* Tampilkan sub-judul */}
            <h3 className="mb-2 ml-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
              {group.group}
            </h3>
            <div className="space-y-2">
              {group.items.map((item) => {
                const isActive = pathname.startsWith(item.href) && (item.href !== '/dashboard' || pathname === '/dashboard');
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      flex items-center gap-4 rounded-lg px-4 py-3 text-lg font-medium transition-colors
                      ${
                        isActive
                          ? 'bg-maroon-light text-white shadow-inner'
                          : 'text-gray-200 hover:bg-maroon-light/60'
                      }
                    `}
                  >
                    <item.icon className="h-6 w-6" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Tombol Logout (Pindah ke Header atau Sidebar bawah) */}
      <div className="border-t border-maroon-light p-4">
         <Link
              href="/api/auth/signout" // Link logout dari NextAuth
              className="flex items-center gap-4 rounded-lg px-4 py-3 text-lg font-medium text-gray-200 hover:bg-maroon-light/60"
            >
              <LogOut className="h-6 w-6" />
              <span>Logout</span>
            </Link>
      </div>
    </aside>
  );
}