import { View, Text, Image } from 'react-native'
import React from 'react'
import tw from "twrnc";
import Colors from "../constants/Colors";
import { Product } from '../types';

const { tint } = Colors.light;
type ProductListItemProps = {
    product: Product
}
const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    <View
      style={tw`bg-white border border-white rounded-xl p-3 overflow-hidden`}
    >
      <Image
        source={{
          uri:
            product.image ||
            "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png",
        }}
        style={tw`w-full aspect-square`}
        resizeMode="contain"
      />
      <Text style={tw`font-semibold text-base my-2`}>{product.name}</Text>
      <Text style={[tw`font-medium`, { color: tint }]}>
        ${product.price.toFixed(2)}
      </Text>
    </View>
  );
};

export default ProductListItem