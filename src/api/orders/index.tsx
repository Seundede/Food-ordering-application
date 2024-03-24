import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";
import { useContext } from "react";
import { AuthContext } from "@/src/providers/AuthProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InsertTables } from "../../types";

//Function to get admin orders from supabase
export const useAdminOrderList = ({ archived = false }) => {
  const statuses = archived ? ["Delivered"] : ["New", "Cooking", "Delivering"];
  return useQuery({
    queryKey: ["orders", { archived }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .in("status", statuses);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

//Function to get user orders from supabase
export const useUserOrderList = () => {
  const { session } = useContext(AuthContext);
  const id = session?.user.id;
  return useQuery({
    queryKey: ["orders", { userId: id }],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", id);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

//Function to read order by id
export const useOrderDetails = (id: number) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*, products(*))")
        .eq("id", id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

//Function to create an order

export const useInsertOrder = () => {
  const queryClient = useQueryClient();
 const { session } = useContext(AuthContext);
 const userId = session?.user.id;
  return useMutation({
    async mutationFn(data: InsertTables<"orders">) {
      const { error, data: newProduct } = await supabase
        .from("orders")
        .insert({ ...data, user_id: userId })
        .select()
        .single();

      if (error) {
        throw error;
      }
      return newProduct;
    },
    async onSuccess(data) {
      await queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
