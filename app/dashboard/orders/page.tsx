'use client';

import { useState } from 'react';
import { useOrders } from '@/app/context/OrderContext'; // Asumsi context ada di app/context/


// Komponen Form yang Dibuat Ulang
function FormInput({ label, id, ...props }: any) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="w-full rounded-lg border-gray-300 shadow-sm focus:border-maroon focus:ring-maroon"
      />
    </div>
  );
}

function FormTextarea({ label, id, ...props }: any) {
    return (
      <div>
        <label htmlFor={id} className="mb-2 block text-sm font-medium text-gray-700">
          {label}
        </label>
        <textarea
          id={id}
          {...props}
          rows={3}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-maroon focus:ring-maroon"
        ></textarea>
      </div>
    );
  }

export default function OrdersPage() {
  const { addOrder } = useOrders();
  // State untuk form (tetap sama)
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    orderDetails: '',
    productName: '',
    productQuantity: '',
  });

  const handleChange = (e: any) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    addOrder(formData); // Kirim state formData
    setFormData({ // Reset form
      customerName: '', customerPhone: '', orderDetails: '', productName: '', productQuantity: '',
    });
    alert('Order added successfully!');
  };

  return (
    <>
      <div className="mx-auto max-w-3xl">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl bg-white p-8 shadow-lg"
        >
          <h4 className="text-2xl font-semibold text-gray-800">Add New Order</h4>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormInput label="Customer Name" id="customerName" value={formData.customerName} onChange={handleChange} required />
            <FormInput label="Customer Phone" id="customerPhone" value={formData.customerPhone} onChange={handleChange} required />
          </div>
          
          <FormTextarea label="Order Details" id="orderDetails" value={formData.orderDetails} onChange={handleChange} required />
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormInput label="Product Name" id="productName" value={formData.productName} onChange={handleChange} required />
            <FormInput label="Quantity" id="productQuantity" type="number" min="1" value={formData.productQuantity} onChange={handleChange} required />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-maroon px-6 py-3 text-lg font-semibold text-white shadow-md transition-colors hover:bg-maroon-dark focus:outline-none focus:ring-2 focus:ring-maroon focus:ring-offset-2"
          >
            Save Order
          </button>
        </form>
      </div>
    </>
  );
}