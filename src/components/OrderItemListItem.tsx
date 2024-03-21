import { View, Text,  Image } from "react-native";
import React from "react";
import Colors from "../constants/Colors";
import { OrderItem } from "../types";
import tw from "twrnc";

const { tint } = Colors.light;
type OrderItemListItemProps = {
  item: OrderItem;
};

const OrderItemListItem = ({ item }: OrderItemListItemProps) => {
  return (
    <View style={tw`bg-white rounded-lg p-3 flex-1 items-center flex-row`}>
      <Image
        source={{ uri: item.products.image || "" }}
        style={tw`self-center mr-2 w-20 aspect-square`}
        resizeMode="contain"
      />
      <View style={tw`flex-1 `}>
        <Text style={tw`font-medium text-base mb-2`}>{item.products.name}</Text>
        <View style={tw`flex-row gap-2`}>
          <Text style={[tw`font-medium`, { color: tint }]}>
            ${item.products.price.toFixed(2)}
          </Text>
          <Text>Size: {item.size}</Text>
        </View>
      </View>
      <View style={tw`flex-row gap-3 items-center my-3`}>
        <Text style={tw`font-medium text-lg`}>{item.quantity}</Text>
      </View>
    </View>
  );
};



 

export default OrderItemListItem;