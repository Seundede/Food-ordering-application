import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InsertTables } from "../../types";

export const useInsertOrderItems = () => {
  return useMutation({
    async mutationFn(data: InsertTables<"order_items">[]) {
      const { error, data: newProduct } = await supabase.from("order_items").insert(
  data
      ).select()

      if (error) {
        throw error;
      }
      return newProduct
    },
    onError(error) {
      console.log(error);
    },
  });
};
