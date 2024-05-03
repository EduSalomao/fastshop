import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SplashScreen } from "../screens/SplashScreen";
import { BottomTab } from "./BottomTabNavigator";

export type RootStackParamList = {
  Splash: undefined;
  BottomTab: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const InitialRoute = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BottomTab"
        component={BottomTab}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
