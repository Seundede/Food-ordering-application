import { Pressable, Text, View } from "react-native";
import Colors from "../constants/Colors";
import { forwardRef } from "react";
import tw from "twrnc"; 

type ButtonProps = {
  text: string;
} & React.ComponentPropsWithoutRef<typeof Pressable>;
const { tint } = Colors.light;
const Button = forwardRef<View | null, ButtonProps>(
  ({ text, ...pressableProps }, ref) => {
    return (
      <Pressable ref={ref} {...pressableProps} style={[tw`p-3 flex items-center rounded-md my-2`, { backgroundColor: tint }]}>
        <Text style={tw`font-semibold text-white text-base`}>{text}</Text>
      </Pressable>
    );
  }
);



export default Button;
