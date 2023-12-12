import * as React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Container, Row } from '../../components';
import Tabs from '../../components/Tabs';
import PopularPosts from './components/PopularPosts';
import UnansweredPosts from './components/UnansweredPosts';
import NewPosts from './components/NewPosts';
import { FloatingButton } from '../../components';
import Logotipo from '@approbado/lib/illustrations/Logotipo.svg'
import { Plus, Search } from 'lucide-react-native';
import { Routes } from '../routes';

const screens = [
    {
        name: 'New',
        component: NewPosts,
        options: {
            tabBarLabel: 'Nuevos'
        }
    },
    {
        name: 'PopularPosts',
        component: PopularPosts,
        options: {
            tabBarLabel: 'Populares'
        }
    },
    {
        name: 'Unanswered',
        component: UnansweredPosts,
        options: {
            tabBarLabel: 'No respondidos'
        }
    }
];

const ListPosts = ({ navigation }) => {
    const Tab = createMaterialTopTabNavigator();

    return (
        <Container>
            <Row size={2} align='center' direction='row' justify='space-between'>
                <Logotipo />
                <Search size={24} color='#000' />
            </Row>
            <Tab.Navigator initialRouteName="New" tabBar={Tabs}>
                {screens.map(screen => <Tab.Screen {...screen} />)}
            </Tab.Navigator>
            <FloatingButton
                icon={<Plus />}
                onPress={() => navigation.navigate(Routes.CreateForum)}
            />
        </Container>
    );
}

export default ListPosts
