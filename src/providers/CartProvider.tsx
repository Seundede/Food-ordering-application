import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { CartItem, Product } from "../types";

// Define the type for the context value
interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, size: CartItem["size"]) => void;
}
// Create the context with an initial value
export const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
});



const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const addItem = (product: Product, size: CartItem["size"]) => {
    console.log(product);
  };
  return (
    <CartContext.Provider value={{ items, addItem}}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
