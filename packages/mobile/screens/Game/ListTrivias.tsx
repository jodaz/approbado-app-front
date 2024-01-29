import * as React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Container, Row } from '../../components';
import Logotipo from '@approbado/lib/illustrations/Logotipo.svg'
import Tabs from '../../components/Tabs';
import RecentTrivias from './components/RecentTrivias';
import Categories from './components/Categories';

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

    return (
        <Container>
            <Row size={2} align='center' direction='row' justify='space-between'>
                <Logotipo />
            </Row>
            <Tab.Navigator initialRouteName="Trivias" tabBar={Tabs} screenOptions={{
                tabBarScrollEnabled: true
            }}>
                {screens.map(screen => <Tab.Screen {...screen} />)}
            </Tab.Navigator>
        </Container>
    );
}

export default ListTrivias
