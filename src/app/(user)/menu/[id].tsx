import { Text, Image, View, Pressable, ActivityIndicator } from "react-native";
import React, { useContext, useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import tw from "twrnc";
import Button from "@/src/components/Button";

import { PizzaSize } from "@/src/types";
import { CartContext } from "@/src/providers/CartProvider";
import { useProduct } from "@/src/api/products";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];
const ProductDetail = () => {
  const router = useRouter()
  const { addItem } = useContext(CartContext);
  const { id } = useLocalSearchParams();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");
 const {
   data: product,
   isLoading,
   error,
 } = useProduct(parseInt(typeof id === "string" ? id : id[0]));

 if (isLoading) {
   return <ActivityIndicator />;
 }
 if (error || !product) {
   return <Text>Failed to fetch product</Text>;
 }
  

  const addToCart = () => {
    if (!product) {
      return;
    }
    addItem(product, selectedSize);
    router.push('/cart')

  };
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
      <Text style={tw`text-lg font-bold mt-auto`}>${product.price}</Text>
      <Button onPress={addToCart} text="Add to cart" />
    </View>
  );
};

export default ProductDetail;
