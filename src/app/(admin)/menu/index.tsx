import ProductListItem from "@/src/components/ProductListItem";
import { FlatList, SafeAreaView } from "react-native";
import products from "@/assets/data/products";
import { Stack } from "expo-router";


export default function TabOneScreen() {
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          // headerShown: false,
          headerShown: true,
          title: "Menu",
        }}
      />
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </SafeAreaView>
  );
}
