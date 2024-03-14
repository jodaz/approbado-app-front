import * as React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { horizontalScale } from '../../styles/scaling';
import Tabs from '../../components/Tabs';
import RecentTrivias from './components/RecentTrivias';
import Categories from './components/Categories';
import TopUsers from './components/TopUsers';

const screens = [
    {
        name: 'Trivias',
        component: RecentTrivias,
        options: {
            tabBarLabel: 'Trivias'
        }
    },
    {
        name: 'Categories',
        component: Categories,
        options: {
            tabBarLabel: 'Categorias'
        }
    }
];

const ListTrivias = () => {
    const Tab = createMaterialTopTabNavigator();
    const theme = useTheme()

    return (
        <View style={{
            paddingHorizontal: horizontalScale(theme.space[4]),
            flex: 1
        }}>
            <TopUsers />
            <Tab.Navigator initialRouteName="Trivias" tabBar={Tabs} screenOptions={{
                tabBarScrollEnabled: true
            }}>
                {screens.map(screen => <Tab.Screen {...screen} />)}
            </Tab.Navigator>
        </View>
    );
}

export default ListTrivias
