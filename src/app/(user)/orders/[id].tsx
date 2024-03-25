import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import OrderListItem from "@/src/components/OrderListItem";
import tw from "twrnc";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import { useOrderDetails } from "@/src/api/orders";
import { useUpadateOrderSubscription } from "@/src/api/orders/subscription";

const OrderDetail = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { data: order, isLoading, error } = useOrderDetails(id);
  useUpadateOrderSubscription(id);

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch</Text>;
  }
  if (!order) {
    return <Text>Order not found</Text>;
  }
  return (
    <View style={tw`p-3 gap-4 flex-1`}>
      <Stack.Screen options={{ title: `Order #${id}` }} />

      <FlatList
        data={order?.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order} />}
      />
    </View>
  );
};

export default OrderDetail;
