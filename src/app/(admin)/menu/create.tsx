import { View, Text, TextInput, Image, Alert, TouchableOpacity, } from "react-native";
import { Button as NativeButton } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "twrnc";
import Button from "@/src/components/Button";
import Colors from "@/src/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  useInsertProduct,
  useProduct,
  useUpdateProduct,
} from "@/src/api/products";

const Create = () => {
  const { id } = useLocalSearchParams();
  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { data: product } = useProduct(
    parseInt(typeof id === "string" ? id : id[0])
  );
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState<string | null>(null);
  useEffect(() => {
    if (product) {
      setImage(product.image);
      setName(product.name);
      setPrice(product.price.toString());
    }
  }, [product]);

  const { tint } = Colors.light;
  const router = useRouter();
  const isUpdating = !!id;
  // Function to validate input fields
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
  // Function to pick an image
  const pickImage = async () => {
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
  //Function to reset the input fields
  const resetInputFields = () => {
    setName("");
    setPrice("");
  };

  const onSubmit = () => {
    if (!validateInput()) {
      return;
    }
    if (isUpdating) {
      // Update a product
      updateProduct(
        { id, name, price: parseFloat(price), image },
        {
          onSuccess: () => {
            resetInputFields();
            router.back();
          },
        }
      );
    } else {
      // Create a product

      insertProduct(
        { name, price: parseFloat(price), image },
        {
          onSuccess: () => {
            resetInputFields();
            router.back();
          },
        }
      );
    }
  };
  //Function to delete an entry
  const onDelete = () => {
    console.warn("Delete");
  };
  const handleDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to delete this product?", [
      { text: "Cancel" },
      { text: "Delete", style: "destructive", onPress: onDelete },
    ]);
  };

  return (
    <View style={tw`flex-1 justify-center p-4`}>
      <Stack.Screen
        options={{ title: isUpdating ? "Update Product" : "Create Product" }}
      />
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
      <Button text={isUpdating ? "Update" : "Create"} onPress={onSubmit} />
      {isUpdating && (
       
        <TouchableOpacity
          onPress={handleDelete}
          style={tw`p-3 mt-2 bg-white  rounded-3xl`}
        >
          <Text style={tw`text-black text-center`}>Delete</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Create;
