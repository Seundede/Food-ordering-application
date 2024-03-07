import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { Platform } from "react-native";
const CartScreen = () => {
  return (
    <View>
      <Text>CartScreen</Text>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

export default CartScreen