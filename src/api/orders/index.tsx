import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";
import { useContext } from "react";
import { AuthContext } from "@/src/providers/AuthProvider";

//Function to get product from supabase
export const useAdminOrderList = () => {
     const { session} = useContext(AuthContext);
     const id = session?.user.id
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
        if(!id) return null
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        // .eq("user_id", id);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};
