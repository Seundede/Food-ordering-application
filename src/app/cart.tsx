import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Platform } from "react-native";
import { CartContext } from '../providers/CartProvider';

const CartScreen = () => {
  const { items } = useContext(CartContext);
  return (
    <View>
      <Text>CartScreen {items.length} length</Text>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

export default CartScreen