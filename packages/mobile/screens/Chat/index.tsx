import * as React from 'react'
import { ArrowLeft, PenSquare } from 'lucide-react-native';
import { Row, Text } from '../../components';
import { Routes } from '../routes';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ChatList from './components/ChatList';
import Tabs from '../../components/Tabs';
import styled from 'styled-components/native';
import ChatInvitations from './components/ChatInvitations';

const screens = [
    {
        name: 'ChatList',
        component: ChatList,
        options: {
            tabBarLabel: 'Todos'
        }
    },
    {
        name: 'Invitations',
        component: ChatInvitations,
        options: {
            tabBarLabel: 'Invitaciones'
        }
    }
];

const Container = styled.View`
    height: 100%;
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;
`

const Chat = ({ navigation }) => {
    const Tab = createMaterialTopTabNavigator()

    return (
        <Container>
            <Row
                align='center'
                direction='row'
                justify='space-between'
                size={6}
            >
                <ArrowLeft
                    size={24}
                    color='#000'
                    onPress={() => navigation.goBack()}
                />
                <Text>
                    Tus mensajes
                </Text>
                <PenSquare
                    size={24}
                    color='#000'
                    onPress={() => navigation.navigate(Routes.InviteChat)}
                />
            </Row>
            <Tab.Navigator tabBar={Tabs}>
                {screens.map(screen => <Tab.Screen {...screen} />)}
            </Tab.Navigator>
        </Container>
    );
}

export default Chat
