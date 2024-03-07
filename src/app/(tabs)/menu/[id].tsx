import { Text, Image, View, Pressable } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import products from "@/assets/data/products";
import tw from "twrnc";

const sizes = ["S", "M", "L", "XL"];
const ProductDetail = () => {
  const { id } = useLocalSearchParams();
  const [selectedSize, setSelectedSize] = useState("M");
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
      <Text style={tw`text-base`}>Select Size</Text>

      <View style={tw`flex flex-row justify-around my-3`}>
        {sizes.map((size) => (
          <Pressable
            key={size}
            onPress={() => setSelectedSize(size)}
            style={[
              tw`rounded-full w-12 aspect-square items-center justify-center `,
              tw`${selectedSize === size ? "bg-gray-300" : "bg-white"}`,
            ]}
          >
            <Text
              style={[
                tw`text-lg font-bold`,
                tw`${selectedSize === size ? "text-black" : "text-slate-400"}`,
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={tw`text-lg font-bold`}>${product.price}</Text>
    </View>
  );
};

export default ProductDetail;
