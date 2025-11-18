// app/dashboard/layout.tsx

import Sidebar from './components/Sidebar';
import { OrderProvider } from '../context/OrderContext';
import RightActionPanel from './components/RightActionPanel'; // 1. Impor Panel Kanan

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OrderProvider>
      {/* Ini adalah cara terbaik untuk layout 3-kolom dengan sidebar 'fixed':
        1. Buat 'Sidebar' (fixed, kiri, w-64)
        2. Buat 'RightActionPanel' (fixed, kanan, w-72)
        3. Buat 'main' (konten) dengan margin kiri (ml-64) dan margin kanan (mr-72)
      */}
      <div className="relative min-h-screen bg-gray-100">
        
        {/* Kolom 1: Sidebar Kiri (Sudah 'fixed') */}
        <Sidebar />

        {/* Kolom 2: Konten Utama (Halaman dinamis) */}
        {/* Kita beri margin kiri (ml-64) & kanan (mr-72) seukuran sidebar */}
        <main className="ml-64 mr-72 h-full overflow-y-auto p-8">
          {children}
        </main>

        {/* Kolom 3: Sidebar Kanan (Sudah 'fixed') */}
        <RightActionPanel />

      </div>
    </OrderProvider>
  );
}