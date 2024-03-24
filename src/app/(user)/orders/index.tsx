import {  ActivityIndicator, FlatList, Text } from "react-native";
import React from "react";
import OrderListItem from "@/src/components/OrderListItem";
import { useUserOrderList } from "@/src/api/orders";

const OrderScreen = () => {
  const { data: orders, error, isLoading } = useUserOrderList()
   if (isLoading) {
     return <ActivityIndicator />;
   }

   if (error) {
     return <Text>Failed to fetch</Text>;
   }
  return (
    <FlatList
      data={orders}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      renderItem={({ item }) => <OrderListItem order={item} />}
    />
  );
};

export default OrderScreen;
