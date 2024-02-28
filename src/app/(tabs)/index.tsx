import ProductListItem from "@/src/components/ProductListItem";
import { View } from "@/src/components/Themed";
import products from "@/assets/data/products";

export default function TabOneScreen() {
  return (
    <View>
      <ProductListItem product={products[5]} />
      <ProductListItem product={products[1]} />
    </View>
  );
}


