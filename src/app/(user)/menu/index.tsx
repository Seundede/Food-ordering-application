import ProductListItem from "@/src/components/ProductListItem";
import { ActivityIndicator, FlatList, SafeAreaView } from "react-native";
import { Stack } from "expo-router";
import { useProductList } from "@/src/api/products";
import { Text } from "react-native";


export default function MenuScreen() {

   const { data, isLoading, error } = useProductList();

   if (isLoading) {
     return <ActivityIndicator />;
   }
   if (error) {
     return <Text>Failed to fetch products</Text>;
   }
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Menu",
        }}
      />
      <FlatList
        data={data}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </SafeAreaView>
  );
}
