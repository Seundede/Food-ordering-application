import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";

type AuthData = {
    session : Session | null
    loading: boolean
};

export const AuthContext = createContext<AuthData>({
    session : null,
    loading: true
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean> (true)
  useEffect(() => {
    console.log("mpunted");
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false)
    };
    fetchSession();
  }, []);
  return <AuthContext.Provider value={{session, loading}}>{children}</AuthContext.Provider>;
}
