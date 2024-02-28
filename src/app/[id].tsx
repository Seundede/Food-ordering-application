import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

const ProductDetail = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>ProductDetail {id}</Text>
    </View>
  )
}

export default ProductDetail