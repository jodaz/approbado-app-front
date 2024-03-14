import * as React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Tabs from '../../components/Tabs';
import PopularPosts from './components/PopularPosts';
import UnansweredPosts from './components/UnansweredPosts';
import NewPosts from './components/NewPosts';
import CreatePostWarning from './components/CreatePostWarning';
import styled from 'styled-components/native';
import { horizontalScale, verticalScale } from '../../styles/scaling';

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

const Container = styled.View`
    padding-vertical: ${(props) => verticalScale(props.theme.space[1])}px;
    padding-horizontal: ${(props) => horizontalScale(props.theme.space[1])}px;
    position: relative;
    flex: 1;
`

const ListPosts = () => {
    const Tab = createMaterialTopTabNavigator();

    return (
        <Container>
            <Tab.Navigator initialRouteName="New" tabBar={Tabs}>
                {screens.map(screen => <Tab.Screen {...screen} />)}
            </Tab.Navigator>
            <CreatePostWarning />
        </Container>
    );
}

export default ListPosts
