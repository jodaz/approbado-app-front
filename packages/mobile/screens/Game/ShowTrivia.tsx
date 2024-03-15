import * as React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Row, TriviaCard } from '../../components';
import { View } from 'react-native';
import Tabs from '../../components/Tabs';
import Resources from './components/Files';
import Syllabus from './components/Syllabus';

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

const ShowTrivia = ({ route }) => {
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
    )
};

export default ShowTrivia
