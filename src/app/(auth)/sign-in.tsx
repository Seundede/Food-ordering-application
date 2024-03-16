import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import Button from "../../components/Button";
import { Link, Stack } from "expo-router";
import tw from "twrnc";
import Colors from "../../constants/Colors";

const SignInScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <View style={tw`p-5 flex-1 justify-center`}>
      <Stack.Screen options={{ title: "Sign in" }} />

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

      <Button text="Sign in" />
      <Link
        href="/sign-up"
        style={[tw`self-center font-medium my-3`, { color: Colors.light.tint }]}
      >
        Create an account
      </Link>
    </View>
  );
};



export default SignInScreen;
