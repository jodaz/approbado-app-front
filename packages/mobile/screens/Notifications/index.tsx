import * as React from 'react'
import { Routes } from '../routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NotificationsHomeScreen from './NotificationsHomeScreen';
import ShowNotification from './ShowNotification';
import AppHeaderWithTitle from '../../components/AppHeaderWithTitle';

const Stack = createNativeStackNavigator();

const Notifications = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#f0f0f0'
                },
                headerShadowVisible: false,
                headerTitle: props => <AppHeaderWithTitle {...props} />
            }}
            initialRouteName={Routes.Notifications}
        >
            <Stack.Screen
                name={Routes.Notifications}
                component={NotificationsHomeScreen}
                options={{ title: 'Notificaciones' }}
            />
            <Stack.Screen
                name={Routes.ShowNotification}
                component={ShowNotification}
                options={{ title: 'Ver notificación'}}
            />
        </Stack.Navigator>
    );
}

export default Notifications
