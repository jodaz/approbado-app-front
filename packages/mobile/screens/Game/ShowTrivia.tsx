import * as React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Container, Row } from '../../components';
import { Routes } from '../routes';
import Logotipo from '@approbado/lib/illustrations/Logotipo.svg'
import Tabs from '../../components/Tabs';
import RecentTrivias from './components/RecentTrivias';
import Resources from './components/Files';

const Stack = createNativeStackNavigator()

const screens = [
    {
        name: 'themes',
        component: RecentTrivias,
        options: {
            tabBarLabel: 'Temario'
        }
    },
    {
        name: 'resources',
        component: Resources,
        options: {
            tabBarLabel: 'Recursos'
        }
    }
];

const TriviasContainer = ({ route }) => {
    const trivia = route.params.trivia;
    const Tab = createMaterialTopTabNavigator();

    return (
        <Container>
            <Row size={2} align='center' direction='row' justify='space-between'>
                <Logotipo />
            </Row>
            <Tab.Navigator initialRouteName="Trivias" tabBar={Tabs}>
                {screens.map(screen => (
                    <Tab.Screen
                        initialParams={{ trivia: trivia }}
                        {...screen}
                    />
                ))}
            </Tab.Navigator>
        </Container>
    );
}

const ShowTrivia = props => {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={Routes.ShowTrivia}
        >
            <Stack.Screen
                name={Routes.ShowTrivia}
                component={TriviasContainer}
                initialParams={props.route.params}
            />
        </Stack.Navigator>
    )
};

export default ShowTrivia
