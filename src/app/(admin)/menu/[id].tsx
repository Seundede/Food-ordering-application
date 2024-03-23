import { Text, Image, View, Pressable, ActivityIndicator } from "react-native";
import React from "react";
import { Link, Stack, useLocalSearchParams } from "expo-router";
import products from "@/assets/data/products";
import tw from "twrnc";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";
import { useProduct } from "@/src/api/products";


const ProductDetail = () => {

  const { id } = useLocalSearchParams();
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
 

 
  return (
    <View style={tw`bg-white flex-1 p-3`}>
     
      <Stack.Screen

        options={{
          title: product.name,
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={23}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
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
