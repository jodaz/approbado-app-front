import * as React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Row, TriviaCard, MainHeader } from '../../components';
import { View } from 'react-native';
import { Routes } from '../routes';
import Tabs from '../../components/Tabs';
import Resources from './components/Files';
import Syllabus from './components/Syllabus';

const Stack = createNativeStackNavigator()

const screens = [
    {
        name: 'themes',
        component: Syllabus,
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
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <Row size={2} align='center' direction='row' justify='space-between'>
                <TriviaCard trivia={trivia} />
            </Row>
            <Tab.Navigator initialRouteName="Trivias" tabBar={Tabs}>
                {screens.map(screen => (
                    <Tab.Screen
                        initialParams={{ trivia: trivia }}
                        {...screen}
                    />
                ))}
            </Tab.Navigator>
        </View>
    );
}

const ShowTrivia = props => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#f0f0f0'
                },
                headerShadowVisible: false,
                headerTitle: (props) => <MainHeader {...props} />
            }}
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
