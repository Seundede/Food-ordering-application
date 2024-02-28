import { Text, SafeAreaView } from "react-native";
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router';


const ProductDetail = () => {
  const { id } = useLocalSearchParams();
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Text>ProductDetail {id}</Text>
    </SafeAreaView>
  );
}

export default ProductDetail