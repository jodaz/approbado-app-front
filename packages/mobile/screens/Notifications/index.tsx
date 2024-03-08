import * as React from 'react'
import { Routes } from '../routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotificationsHomeScreen from './NotificationsHomeScreen';
import ShowNotification from './ShowNotification';

const Stack = createNativeStackNavigator();

const Notifications = ({ navigation }) => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={Routes.Notifications}
        >
            <Stack.Screen name={Routes.Notifications} component={NotificationsHomeScreen}  />
            <Stack.Screen name={Routes.ShowNotification} component={ShowNotification}  />
        </Stack.Navigator>
    );
}

export default Notifications
