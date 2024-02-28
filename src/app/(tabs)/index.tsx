import ProductListItem from "@/src/components/ProductListItem";
import { SafeAreaView, FlatList } from "react-native";
import products from "@/assets/data/products";

export default function TabOneScreen() {
  return (
    <SafeAreaView>
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
