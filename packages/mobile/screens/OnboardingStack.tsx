import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from "./routes";
import Onboarding from "./onboarding"
import Presentation from "./presentation"
import Login from "./Login"
import CreateAccount from "./SignUp/CreateAccount"
import ForgetPassword from "./ForgetPassword"
import ConfirmPhone from './ConfirmPhone';
import CreateNewPassword from './CreateNewPassword';
import CompleteProfile from './SignUp/CompleteProfile';

const Stack = createNativeStackNavigator();

const OnboardingStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name={Routes.Onboarding}
                component={Onboarding}
            />
            <Stack.Screen
                name={Routes.CompleteProfile}
                component={CompleteProfile}
            />
            <Stack.Screen
                name={Routes.Presentation}
                component={Presentation}
            />
            <Stack.Screen
                name={Routes.Login}
                component={Login}
            />
            <Stack.Screen
                name={Routes.SignUp}
                component={CreateAccount}
            />
            <Stack.Screen
                name={Routes.ForgetPassword}
                component={ForgetPassword}
            />
            <Stack.Screen
                name={Routes.ConfirmPhone}
                component={ConfirmPhone}
            />
            <Stack.Screen
                name={Routes.CreateNewPassword}
                component={CreateNewPassword}
            />
        </Stack.Navigator>
    )
}

export default OnboardingStack
