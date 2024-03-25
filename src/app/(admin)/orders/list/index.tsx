import React, { useEffect } from "react";
import { ActivityIndicator, FlatList, Text } from "react-native";
import OrderListItem from "@/src/components/OrderListItem";
import { useAdminOrderList } from "@/src/api/orders";
import { supabase } from "@/src/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
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
