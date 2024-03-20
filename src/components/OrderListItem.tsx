import { View, Text,  Pressable } from "react-native";
import React from "react";
import { Order } from "../types";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { Link, useSegments } from "expo-router";
import tw from "twrnc";

dayjs.extend(relativeTime);

type OrderListItemProps = {
  order: Order;
};

const OrderListItem = ({ order }: OrderListItemProps) => {
  const segments = useSegments();

  return (
    <Link
      href={
        segments[0] === "(user)"
          ? `/(user)/orders/${order.id}`
          : `/(admin)/orders/${order.id}`
      }
      asChild
    >
      <Pressable
        style={tw`bg-white p-3 rounded-md flex-row justify-between items-center`}
      >
        <View>
          <Text style={tw`font-semibold my-2`}>Order #{order.id}</Text>
          <Text style={tw`text-gray-300`}>
            {dayjs(order.created_at).fromNow()}
          </Text>
        </View>

        <Text style={tw`font-medium`}>{order.status}</Text>
      </Pressable>
    </Link>
  );
};


export default OrderListItem;
