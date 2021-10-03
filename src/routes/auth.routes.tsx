import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Confirmation } from "../pages/Confirmation";
import { Splash } from "../pages/Splash";
import { SignIn } from "../pages/Shared/SignIn";
import { ForgotPassword } from "../pages/Shared/Password/ForgotPassword";
import { ResetPassword } from "../pages/Shared/Password/ResetPassword";
import { SignUpFirstStep } from "../pages/Shared/SignUp/SignUpFirstStep";
import { SignUpSecondStep } from "../pages/Shared/SignUp/SignUpSecondStep";

import { RegulationRaview } from "../pages/Shared/SignUp/RegulationRaview";

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Screen name="Splash" component={Splash} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
      <Screen name="SignUpSecondStep" component={SignUpSecondStep} />
      <Screen name="Confirmation" component={Confirmation} />

      <Screen name="RegulationRaview" component={RegulationRaview} />

      <Screen name="ResetPassword" component={ResetPassword} />
      <Screen name="ForgotPassword" component={ForgotPassword} />
    </Navigator>
  );
}
