import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "../pages/Home";
import { CarDetails } from "../pages/CarDetails";
import { Scheduling } from "../pages/Scheduling";
import { SchedulingDetails } from "../pages/SchedulingDetails";
import { Confirmation } from "../pages/Confirmation";

import { MyRentals } from "../pages/MyRentals";

const { Navigator, Screen } = createStackNavigator();

export function AppStackRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Screen name="HomeScreen" component={Home} />

      <Screen name="CarDetailsScreen" component={CarDetails} />
      <Screen name="SchedulingScreen" component={Scheduling} />
      <Screen name="SchedulingDetailsScreen" component={SchedulingDetails} />
      <Screen name="ConfirmationScreen" component={Confirmation} />
      <Screen name="MyRentalsScreen" component={MyRentals} />
    </Navigator>
  );
}
