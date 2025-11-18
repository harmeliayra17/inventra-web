'use client';

import { useOrders } from '@/app/context/OrderContext'; // Asumsi context ada di app/context/
import { Users } from 'lucide-react';


export default function CustomersPage() {
  const { orders } = useOrders();

  return (
    <>
      <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Header Tabel */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Phone</th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Order Details</th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Product</th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Quantity</th>
            </tr>
          </thead>
          {/* Body Tabel */}
          <tbody className="divide-y divide-gray-200 bg-white">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">{order.customerName}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">{order.customerPhone}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">{order.orderDetails}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">{order.productName}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">{order.productQuantity}</td>
                </tr>
              ))
            ) : (
              // State Jika Kosong
              <tr>
                <td colSpan={5} className="py-12 text-center">
                  <Users className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-700">No Customers</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by creating a new order.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Di sini Anda bisa menambahkan komponen Pagination kustom jika diperlukan */}
    </>
  );
}