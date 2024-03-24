import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InsertTables, UpdateTables } from "../../types";

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

//Function to update an order 
export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn({id, data}: {id: number; data: UpdateTables<'orders'>}) {
      const { data: updatedOrder, error } = await supabase
        .from("orders")
        .update(data)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw error;
      }
      return updatedOrder;
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries({ queryKey: ["orders", id] });
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError(error) {
      console.log(error);
    },
  });
};
