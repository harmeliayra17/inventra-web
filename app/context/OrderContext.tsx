'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';


// Definisikan tipe untuk Order
interface Order {
  id: number;
  customerName: string;
  customerPhone: string;
  orderDetails: string;
  productName: string;
  productQuantity: string;
}

// Definisikan tipe untuk Context
interface OrderContextType {
  orders: Order[];
  addOrder: (newOrder: Omit<Order, 'id'>) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  // 1. Muat data dari localStorage saat komponen dimuat
  useEffect(() => {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  // 2. Simpan data ke localStorage setiap kali 'orders' berubah
  useEffect(() => {
    if (orders.length > 0) {
      localStorage.setItem('orders', JSON.stringify(orders));
    }
  }, [orders]);

  const addOrder = (newOrder: Omit<Order, 'id'>) => {
    setOrders((prevOrders) => [
      ...prevOrders,
      { ...newOrder, id: Date.now() }, // Tambahkan ID unik
    ]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

// Buat hook kustom untuk kemudahan
export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}