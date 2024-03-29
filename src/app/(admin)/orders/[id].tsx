import {
  View,
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import OrderListItem from "@/src/components/OrderListItem";
import tw from "twrnc";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import { OrderStatusList } from "@/src/types";
import Colors from "@/src/constants/Colors";
import { useOrderDetails } from "@/src/api/orders";
import { useUpdateOrder } from "@/src/api/order_item";

const OrderDetail = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
  const { mutate: updateOrder } = useUpdateOrder();
  const { data: order, isLoading, error } = useOrderDetails(id);

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error || !order) {
    return <Text>Failed to fetch</Text>;
  }
const updataOrderStatus = (status) => {
updateOrder({id, data: {status}})
}
  return (
    <View style={tw`p-3 gap-4 flex-1`}>
      <Stack.Screen options={{ title: `Order #${id}` }} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order} />}
        ListFooterComponent={() => (
          <>
            <Text style={tw`font-medium`}>Status</Text>
            <View style={tw`flex-row gap-3`}>
              {OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={() => updataOrderStatus(status)}
                  style={[
                    tw`border p-2 my-3`,
                    {
                      backgroundColor:
                        order.status === status
                          ? Colors.light.tint
                          : "transparent",
                    },
                    { borderColor: Colors.light.tint },
                  ]}
                >
                  <Text
                    style={[
                      tw``,
                      {
                        color:
                          order.status === status ? "white" : Colors.light.tint,
                      },
                    ]}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
      />
    </View>
  );
};

export default OrderDetail;
