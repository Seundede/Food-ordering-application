import { View, Text, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import Button from "../../components/Button";
import Colors from "../../constants/Colors";
import { Link, Stack } from "expo-router";
import tw from "twrnc";
import { supabase } from "@/src/lib/supabase";

const SignUpScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  //Function to sign a user up
  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) Alert.alert(error.message);
    setLoading(false);
  }
  return (
    <View style={tw`p-5 flex-1 justify-center`}>
      <Stack.Screen options={{ title: "Sign up" }} />

      <Text style={tw`text-gray-800`}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="jon@gmail.com"
        autoCapitalize="none"
        style={tw`border border-gray-400 p-3 mt-2 mb-5 bg-white rounded-md`}
      />

      <Text style={tw`text-gray-800`}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        style={tw`border border-gray-400 p-3 mt-2 mb-5 bg-white rounded-md`}
        secureTextEntry
      />

      <Button
        text={loading ? "Creating account ..." : "Create account"}
        onPress={signUpWithEmail}
        disabled={loading}
      />
      <Link
        href="/sign-in"
        style={[tw`self-center font-medium my-3`, { color: Colors.light.tint }]}
      >
        Sign in
      </Link>
    </View>
  );
};

export default SignUpScreen;
