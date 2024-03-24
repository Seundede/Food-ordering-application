import { View, FlatList, Text } from 'react-native'
import React, { useContext } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Platform } from "react-native";
import { CartContext } from '../providers/CartProvider';
import CartListItem from '../components/CartListItem';
import tw from "twrnc";
import Button from '../components/Button';

const CartScreen = () => {
  const { items, total, checkout } = useContext(CartContext);
  return (
    <View style={tw`p-2`}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10, padding: 10 }}
      />
      <Text style={tw`font-medium text-lg mt-10`}> Total: ${total.toFixed(2)}</Text>
      <Button text='Checkout' onPress={checkout}/>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

export default CartScreen