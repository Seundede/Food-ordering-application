import React from "react";
import { ActivityIndicator, FlatList, Text } from "react-native";
import OrderListItem from "@/src/components/OrderListItem";
import { useAdminOrderList } from "@/src/api/orders";

import { useInsertOrderSubscription } from "@/src/api/orders/subscription";

const OrderScreen = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: false });
 useInsertOrderSubscription()
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
