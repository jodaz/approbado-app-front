import * as React from 'react'
import { Button, Container, Row } from '../../components';
import { Routes } from '../routes';
import { Bell, Calendar, Mail } from 'lucide-react-native';
import { horizontalScale } from '../../styles/scaling';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Logotipo from '@approbado/lib/illustrations/Logotipo.svg'
import QuickTrivia from './components/QuickTrivia';
import RecentTrivias from './components/RecentTrivias';
import styled from 'styled-components';
import Notifications from '../Notifications';
import Events from '../Events';

const Stack = createNativeStackNavigator();

const IconButton = styled(Button)`
    padding-horizontal: ${horizontalScale(10)}px;
    margin: 0;
`

const HomeScreen = ({ navigation }) => {

    return (
        <Container>
            <Row size={1} align='center' direction='row'>
                <View style={{
                    flex: 1
                }}>
                    <Logotipo />
                </View>
                <IconButton variant='text' onPress={() => navigation.navigate(Routes.Chat)}>
                    <Mail size={24} color='#000' />
                </IconButton>
                <IconButton variant='text' onPress={() => navigation.navigate(Routes.Events)}>
                    <Calendar size={24} color='#000' />
                </IconButton>
                <IconButton variant='text' onPress={() => navigation.navigate(Routes.Notifications)}>
                    <Bell size={24} color='#000' />
                </IconButton>
            </Row>
            <Row size={1}>
                <QuickTrivia />
            </Row>
            <Row size={1}>
                <RecentTrivias />
            </Row>
        </Container>
    );
}

const Home = ({ navigation }) => (
    <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={Routes.Home}
    >
        <Stack.Screen name={Routes.Home} component={HomeScreen}  />
        <Stack.Screen name={Routes.Notifications} component={Notifications}  />
        <Stack.Screen name={Routes.Events} component={Events}  />
    </Stack.Navigator>
);

export default Home
