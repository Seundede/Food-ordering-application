import { Text, Image, View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import products from "@/assets/data/products";
import tw from "twrnc";


const ProductDetail = () => {

  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id.toString() == id);
  if (!product) {
    return <Text>Product not found</Text>;
  }

 
  return (
    <View style={tw`bg-white flex-1 p-3`}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: product.name,
        }}
      />
      <Image
        source={{
          uri:
            product.image ||
            "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png",
        }}
        style={tw`w-full aspect-square`}
      />

      <Text style={tw`text-base mt-5`}>{product.name}</Text>
      <Text style={tw`text-lg font-medium `}>${product.price}</Text>
    </View>
  );
};

export default ProductDetail;
