import * as React from 'react'
import { Row } from '../../components';
import { Routes } from '../routes';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import HomeScreen from './Home';
import HomeHeader from './components/HomeHeader';
import Logotipo from '@approbado/lib/illustrations/Logotipo.svg'
import Notifications from '../Notifications';
import Events from '../Events';
import Chat from '../Chat';

const Stack = createNativeStackNavigator();

const HeaderTitleM = () => {
    const navigation = useNavigation();

    return (
        <Row size={1} align='center' direction='row'>
            <View style={{
                flex: 1
            }}>
                <Logotipo />
            </View>
        </Row>
    )
}

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
            component={Events}
            options={{
                headerShown: false
            }}
        />
    </Stack.Navigator>
);

export default Home
