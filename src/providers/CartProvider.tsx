import React, { createContext } from "react";

interface CartProviderProps {
  children: React.ReactNode;
}

const CartContext = createContext({});

const CartProvider = ({ children }: CartProviderProps) => {
  return (
    <CartContext.Provider value={{ items: [], onAddItem: () => {} }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
