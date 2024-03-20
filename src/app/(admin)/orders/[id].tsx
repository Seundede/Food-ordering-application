import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import orders from '@/assets/data/orders'
import OrderListItem from '@/src/components/OrderListItem'
import tw from "twrnc";
import OrderItemListItem from '@/src/components/OrderItemListItem'
const OrderDetail = () => {
    const {id} = useLocalSearchParams()
    const order = orders.find((o) => o.id.toString() === id)
    if(!order) {
     return   <Text> Order not found</Text>
    }
  return (
    <View style={tw`p-3 gap-4 flex-1`}>
      <Stack.Screen options={{ title: `Order #${id}` }} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListHeaderComponent={() => <OrderListItem order={order} />}
      />
    </View>
  );
}

export default OrderDetail