import React from "react";
import { ActivityIndicator, FlatList, Text } from "react-native";
import OrderListItem from "@/src/components/OrderListItem";
import { useAdminOrderList } from "@/src/api/orders";

const OrderScreen = () => {
  const { data: orders, isLoading, error } = useAdminOrderList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch</Text>;
  }

  return (
    <FlatList
      data={orders}
      contentContainerStyle={{ paddingVertical: 10 }}
      renderItem={({ item }) => <OrderListItem order={item} />}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default OrderScreen;
