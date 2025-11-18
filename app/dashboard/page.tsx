// app/dashboard/page.tsx
import { DollarSign, ShoppingCart, Users, Archive } from 'lucide-react';

/* Ini adalah Server Component (async). 
  Nanti kita bisa 'await' data dari Prisma di sini.
  Contoh: const totalSales = await prisma.order.count();
*/

// Sub-komponen kecil untuk Stat Card
function StatCard({ title, value, icon: Icon, colorClass }: any) {
  return (
    <div className="flex items-center gap-4 rounded-xl bg-white p-6 shadow-sm">
      <div className={`flex h-12 w-12 items-center justify-center rounded-full ${colorClass}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}


export default async function DashboardPage() {
  
  // (Data dummy - Nanti kita ganti dengan data Prisma)
  const stats = {
    totalSales: 15000000,
    netIncome: 4500000,
    totalOrders: 350,
    stockCritical: 12,
  };
  
  // (Data dummy - Nanti kita ganti dengan data Prisma)
  const recentOrders = [
    { id: '#1234', customer: 'Budi Santoso', status: 'Packed', total: 250000, branch: 'Cabang A' },
    { id: '#1233', customer: 'Ani Lestari', status: 'Shipped', total: 150000, branch: 'Cabang B' },
    { id: '#1232', customer: 'Eka Wijaya', status: 'Draft', total: 80000, branch: 'Cabang A' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Judul Halaman */}
      <h1 className="text-4xl font-bold text-gray-800">
        Dashboard Ringkasan
      </h1>

      {/* 1. Area Stat Cards (Sales Summary) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard 
          title="Total Penjualan" 
          value={`Rp ${stats.totalSales.toLocaleString('id-ID')}`} 
          icon={DollarSign}
          colorClass="bg-maroon" // Tema maroon kita
        />
        <StatCard 
          title="Total Laba Bersih" 
          value={`Rp ${stats.netIncome.toLocaleString('id-ID')}`} 
          icon={DollarSign}
          colorClass="bg-green-500"
        />
        <StatCard 
          title="Total Transaksi" 
          value={stats.totalOrders} 
          icon={ShoppingCart}
          colorClass="bg-blue-500"
        />
        <StatCard 
          title="Stok Kritis" 
          value={stats.stockCritical} 
          icon={Archive}
          colorClass="bg-red-500"
        />
      </div>

      {/* 2. Area Grafik (Stock Report) */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-xl font-semibold text-gray-800">Grafik Stok</h3>
        <div className="flex h-80 items-center justify-center rounded-lg bg-gray-50 text-gray-400">
          [Placeholder untuk Grafik Batang (Stock Report) - Kita akan instal 'recharts' nanti]
        </div>
      </div>
      
      {/* 3. Area Tabel (Sales Order) */}
      <div className="rounded-xl bg-white shadow-sm">
        <h3 className="mb-4 p-6 text-xl font-semibold text-gray-800">Pesanan Terbaru</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">ID Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Cabang</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-maroon">{order.id}</td>
                  <td className="whitespace-nowrap px-6 py-4">{order.customer}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">{order.status}</span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">Rp {order.total.toLocaleString('id-ID')}</td>
                  <td className="whitespace-nowrap px-6 py-4">{order.branch}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}