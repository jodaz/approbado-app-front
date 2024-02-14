import * as React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Container } from '../../components';
import Tabs from '../../components/Tabs';
import PopularPosts from './components/PopularPosts';
import UnansweredPosts from './components/UnansweredPosts';
import NewPosts from './components/NewPosts';
import ForumSearchbox from './components/ForumSearchbox';
import CreatePostWarning from './components/CreatePostWarning';

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
            <ForumSearchbox />
            <Tab.Navigator initialRouteName="New" tabBar={Tabs}>
                {screens.map(screen => <Tab.Screen {...screen} />)}
            </Tab.Navigator>
            <CreatePostWarning />
        </Container>
    );
}

export default ListPosts
