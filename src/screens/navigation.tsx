// AppNavigator.tsx

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Screens from "./index";          // Your first screen
import WeekForecast from "./weekForecast"; // Your second screen
import { ForecastData } from "../utils";   // Make sure this is correctly imported

// ✅ Step 1: Define your route params
export type RootStackParamList = {
  Home: undefined;
  WeekForecast: {
    forecast: ForecastData[];
    city: string;
  };
};

// ✅ Step 2: Pass the type to createNativeStackNavigator
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Screens} />
        <Stack.Screen name="WeekForecast" component={WeekForecast} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
