import {  Text, Image, Pressable } from 'react-native'
import React from 'react'
import tw from "twrnc";
import Colors from "../constants/Colors";
import { Link, useSegments } from 'expo-router';
import { Tables } from '../database.types';

const { tint } = Colors.light;
type ProductListItemProps = {
    product: Tables<'products'>
}
const ProductListItem = ({ product }: ProductListItemProps) => {
  const segments = useSegments() 

  return (
    <Link
      href={
        segments[0] == "(admin)"
          ? `/(admin)/menu/${product.id}`
          : `/(user)/menu/${product.id}`
      }
      asChild
    >
      <Pressable
        style={tw`bg-white flex-1 max-w-1/2  border border-white rounded-xl p-3 overflow-hidden`}
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
      </Pressable>
    </Link>
  );
};

export default ProductListItem