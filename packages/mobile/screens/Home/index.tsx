import * as React from 'react'
import { Routes } from '../routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Home';
import HomeHeader from './components/HomeHeader';
import Notifications from '../Notifications';
import Chat from '../Chat';
import EventsStack from '../Events/EventsStack';

const Stack = createNativeStackNavigator();

const Home = () => (
    <Stack.Navigator
        screenOptions={{
            headerTitle: () => <HomeHeader />,
            headerStyle: {
                backgroundColor: '#f0f0f0'
            },
            headerShadowVisible: false
        }}
        initialRouteName={Routes.Home}
    >
        <Stack.Screen
            name={Routes.Home}
            component={HomeScreen}
        />
        <Stack.Screen
            name={Routes.Notifications}
            component={Notifications}
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen
            name={Routes.Chat}
            options={{
                headerShown: false
            }}
            component={Chat}
        />
        <Stack.Screen
            name={Routes.Events}
            component={EventsStack}
            options={{
                headerShown: false
            }}
        />
    </Stack.Navigator>
);

export default Home
