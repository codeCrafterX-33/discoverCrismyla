"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  calculateTax,
  calculateTotal,
  getTaxRate,
  calculateGST,
  calculatePST,
  calculateQST,
  calculateHST,
  isHSTProvince,
  isGSTPSTProvince,
  isQuebec,
  type CanadianProvince,
} from "@crismyla/lib/tax";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  tax: number;
  gst: number;
  pst: number | null;
  qst: number | null;
  hst: number | null;
  shipping: number;
  total: number;
  taxRate: number;
  province: CanadianProvince | null;
  setProvince: (province: CanadianProvince | null) => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  normalizeQuantities: () => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "crismyla_cart_v1";
const SHIPPING_COST = 20; // Flat shipping fee in dollars

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [province, setProvince] = useState<CanadianProvince | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">, quantity = 1) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.id === item.id);
        if (existing) {
          return prev.map((i) =>
            i.id === item.id
              ? {
                  ...i,
                  quantity: i.quantity + quantity,
                  imageUrl: item.imageUrl || i.imageUrl,
                }
              : i
          );
        }
        return [...prev, { ...item, quantity }];
      });
    },
    []
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: Math.max(0, quantity) } : i
      )
    );
  }, []);

  const normalizeQuantities = useCallback(() => {
    setItems((prev) =>
      prev.map((i) => ({ ...i, quantity: i.quantity === 0 ? 1 : i.quantity }))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const count = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [items]
  );
  const taxRate = useMemo(() => getTaxRate(province), [province]);
  const tax = useMemo(
    () => calculateTax(subtotal, province),
    [subtotal, province]
  );

  // Calculate individual tax components
  const gst = useMemo(() => {
    if (isHSTProvince(province)) return 0; // HST includes GST
    return calculateGST(subtotal);
  }, [subtotal, province]);

  const pst = useMemo(() => {
    if (!isGSTPSTProvince(province)) return null;
    return calculatePST(subtotal, province);
  }, [subtotal, province]);

  const qst = useMemo(() => {
    if (!isQuebec(province)) return null;
    return calculateQST(subtotal);
  }, [subtotal, province]);

  const hst = useMemo(() => {
    if (!isHSTProvince(province)) return null;
    return calculateHST(subtotal, province);
  }, [subtotal, province]);

  const shipping = useMemo(() => SHIPPING_COST, []);
  const total = useMemo(() => {
    const taxAmount = calculateTax(subtotal, province);
    return subtotal + taxAmount + shipping;
  }, [subtotal, province, shipping]);

  const value: CartContextValue = {
    items,
    count,
    subtotal,
    tax,
    gst,
    pst,
    qst,
    hst,
    shipping,
    total,
    taxRate,
    province,
    setProvince,
    addItem,
    removeItem,
    updateQuantity,
    normalizeQuantities,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
