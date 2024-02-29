import { Text, SafeAreaView, Image, View } from "react-native";
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router';
import products from "@/assets/data/products";
import tw from "twrnc";

const sizes = ['S','M','L','XL']
const ProductDetail = () => {
  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id.toString() == id)
  if(!product) {
    return <Text>Product not found</Text>
  }
  return (
    <View style={tw`bg-white flex-1 p-3`}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Image
        source={{
          uri:
            product.image ||
            "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png",
        }}
        style={tw`w-full aspect-square`}
        resizeMode="contain"
      />
      <Text style={tw`text-base`}>Select Size</Text>

      <View style={tw`flex flex-row justify-around my-3`}>
        {sizes.map((size) => (
          <View
            key={size}
            style={tw`bg-gray-200 rounded-full w-12 aspect-square items-center justify-center`}
          >
            <Text style={tw`text-lg font-bold`}>{size}</Text>
          </View>
        ))}
      </View>
      <Text style={tw`text-lg font-bold`}>${product.price}</Text>
    </View>
  );
}

export default ProductDetail