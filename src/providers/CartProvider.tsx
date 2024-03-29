import React, { PropsWithChildren, createContext, useState } from "react";
import { CartItem, Product } from "../types";
import { randomUUID } from "expo-crypto";
import { Tables } from "../database.types";
import { useInsertOrder } from "../api/orders";
import { useRouter } from "expo-router";
import { useInsertOrderItems } from "../api/order_item";
import { initialisePaymentSheet, openPaymentSheet } from "../lib/stripe";

// Type for the context value
interface CartContextType {
  items: CartItem[];
  addItem: (product: Tables<"products">, size: CartItem["size"]) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
  total: number;
  checkout: () => void;
}
// Create the context with an initial value
export const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
  checkout: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const { mutate: insertOrderItems } = useInsertOrderItems();
  const [items, setItems] = useState<CartItem[]>([]);
  //Function to add item to cart
  const addItem = (product: Product, size: CartItem["size"]) => {
    const existingItem = items.find(
      (item) => item.product === product && item.size === size
    );
    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }
    const ProductItem: CartItem = {
      product,
      size,
      quantity: 1,
      product_id: product.id,
      id: randomUUID(),
    };
    setItems([ProductItem, ...items]);
  };
  //Function to update (increase or decrease) item quantity
  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    setItems(
      items
        .map((item) =>
          item.id !== itemId
            ? item
            : { ...item, quantity: item.quantity + amount }
        )
        .filter((item) => item.quantity > 0)
    );
  };
  const total = items.reduce(
    (sum, item) => (sum += item.product.price * item.quantity),
    0
  );
  //Function to clear cart
  const clearCart = () => {
    setItems([]);
  };
  const { mutate } = useInsertOrder();
  const checkout = async () => {
 initialisePaymentSheet(Math.floor(total * 100))
    const status = await openPaymentSheet();
     if (!status) {
       console.error("Error initializing payment sheet");
       return;
     }
    mutate(
      { total },
      {
        onSuccess: (data) => {
           const orderItems = items.map((cartItem) => ({
             order_id: data.id,
             product_id: cartItem.product_id,
             quantity: cartItem.quantity,
             size: cartItem.size,
           }));
          insertOrderItems(orderItems, {
            onSuccess() {
              clearCart();
              router.dismiss();
              router.push(`/(user)/orders/${data.id}`);
            },
          });
        },
      }
    );
  };
  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, total, checkout }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
