import * as React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Plus } from 'lucide-react-native';
import { Routes } from '../routes';
import { Container } from '../../components';
import Tabs from '../../components/Tabs';
import PopularPosts from './components/PopularPosts';
import UnansweredPosts from './components/UnansweredPosts';
import NewPosts from './components/NewPosts';
import FloatingButton from '../../components/FloatingButton';
import BottomDrawer from '../../components/BottomDrawer';

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
            <Tab.Navigator tabBar={Tabs}>
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
