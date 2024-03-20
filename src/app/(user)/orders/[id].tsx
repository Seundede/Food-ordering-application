import { View, Text } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import orders from '@/assets/data/orders'
import OrderListItem from '@/src/components/OrderListItem'
import tw from "twrnc";
const OrderDetail = () => {
    const {id} = useLocalSearchParams()
    const order = orders.find((o) => o.id.toString() === id)
    if(!order) {
     return   <Text> Order not found</Text>
    }
  return (
    <View style={tw`p-3`}>
        <Stack.Screen options={{title:`Order #${id}`}} />

      <OrderListItem order={order} />
    </View>
  )
}

export default OrderDetail