import {  withLayoutContext } from "expo-router";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator)
export default function OrderListNavigation() {
    return (
    <SafeAreaView edges={['top']} style={tw`flex-1 bg-white`}>
      <TopTabs>
        <TopTabs.Screen name='index' options={{title: 'Active'}} />
      </TopTabs>
    </SafeAreaView>
    )
}