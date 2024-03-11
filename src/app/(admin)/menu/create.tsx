import { View, Text, TextInput, Image } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import Button from "@/src/components/Button";
import Colors from "@/src/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { Stack } from "expo-router";
const create = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
    const [image, setImage] = useState<string| null>(null);
  const { tint } = Colors.light;
  const validateInput = () => {
    setError("");
    if (!name) {
      setError("Name is required");
      return false;
    }
    if (!price) {
      setError("Price is required");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setError("Price is not a number");
      return false;
    }
    return true;
  };
 const pickImage = async () => {
   // No permissions request is necessary for launching the image library
   let result = await ImagePicker.launchImageLibraryAsync({
     mediaTypes: ImagePicker.MediaTypeOptions.Images,
     allowsEditing: true,
     aspect: [4, 3],
     quality: 1,
   });

 

   if (!result.canceled) {
     setImage(result.assets[0].uri);
   }
 };
  const onCreate = () => {
    if (!validateInput()) {
      return;
    }
    console.log("Creating product", price);
    setName("");
    setPrice("");
  };
  return (
    <View style={tw`flex-1 justify-center p-4`}>
      <Stack.Screen options={{title:"Create Product"}} />
      <Image
        source={{
          uri:
            image ||
            "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/peperoni.png",
        }}
        style={tw`w-1/2 mb-2  aspect-square self-center rounded-full`}
      />
      <Text
        style={[tw`text-base font-medium self-center mb-4 `, { color: tint }]}
        onPress={pickImage}
      >
        Select an image
      </Text>
      <Text style={tw`text-base text-gray-600`}>Name</Text>
      <TextInput
        placeholder="Name"
        style={tw`bg-white rounded-lg p-3 mt-2 mb-5`}
        value={name}
        onChangeText={setName}
      />
      <Text style={tw`text-base text-gray-600`}>Price($)</Text>
      <TextInput
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={tw`bg-white rounded-lg p-3 mt-2 mb-5`}
      />
      <Text style={tw`text-red-500`}>{error}</Text>
      <Button text="Create" onPress={onCreate} />
    </View>
  );
};

export default create;
