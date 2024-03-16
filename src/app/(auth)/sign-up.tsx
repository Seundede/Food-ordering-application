import { View, Text, TextInput} from "react-native";
import React, { useState } from "react";
import Button from "../../components/Button";
import Colors from "../../constants/Colors";
import { Link, Stack } from "expo-router";
import tw from "twrnc";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={tw`p-5 flex-1 justify-center`}>
      <Stack.Screen options={{ title: "Sign up" }} />

      <Text style={tw`text-gray-200`}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="jon@gmail.com"
        style={tw`border border-gray-400 p-3 mt-2 mb-5 bg-white rounded-md`}
      />

      <Text style={tw`text-gray-200`}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        style={tw`border border-gray-400 p-3 mt-2 mb-5 bg-white rounded-md`}
        secureTextEntry
      />

      <Button text="Create account" />
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
