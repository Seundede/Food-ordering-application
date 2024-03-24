import { View, Text, Image } from "react-native";
import React, { useContext } from "react";
import Colors from "../constants/Colors";
import { CartItem } from "../types";
import tw from "twrnc";
import { FontAwesome } from "@expo/vector-icons";
import { CartContext } from "../providers/CartProvider";
const { tint } = Colors.light;

type CartListItemProps = {
  cartItem: CartItem;
};

const CartListItem = ({ cartItem }: CartListItemProps) => {
  const { updateQuantity } = useContext(CartContext);
  return (
    <View style={tw`bg-white rounded-xl p-2 flex-1 flex-row items-center`}>
      <Image
        source={{
          uri:
            cartItem.product.image ||
            "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png",
        }}
        style={tw`aspect-square self-center w-28 mr-3`}
        resizeMode="contain"
      />
      <View style={{ flex: 1 }}>
        <Text style={tw`font-medium text-base mb-2`}>
          {cartItem.product.name}
        </Text>
        <View style={tw`flex-row gap-2`}>
          <Text style={[{ color: tint }, tw`font-bold`]}>
            ${cartItem.product.price.toFixed(2)}
          </Text>
          <Text>Size: {cartItem.size}</Text>
        </View>
      </View>
      <View style={tw`flex-row gap-2 items-center my-2`}>
        <FontAwesome
          onPress={() => updateQuantity(cartItem.id, -1)}
          name="minus"
          color="gray"
          style={{ padding: 5 }}
        />

        <Text style={tw`font-medium`}>{cartItem.quantity}</Text>
        <FontAwesome
          onPress={() => updateQuantity(cartItem.id, 1)}
          name="plus"
          color="gray"
          style={{ padding: 5 }}
        />
      </View>
    </View>
  );
};

export default CartListItem;
