import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from '../routes';
import CreateEvent from './CreateEvent';
import CreateEventSuccess from './CreateEventSuccess';
import ListEvents from './ListEvents';
import EventsHeader from './components/EventsHeader';

const Stack = createNativeStackNavigator()

const EventsStack = () => (
    <Stack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: '#f0f0f0'
            },
            headerShadowVisible: false,
            headerTitle: props => <EventsHeader {...props} />
        }}
        initialRouteName={Routes.Events}
    >
        <Stack.Screen
            name={Routes.CreateEvent}
            component={CreateEvent}
            options={{ title: 'Agendar una trivia'}}
        />
        <Stack.Screen
            name={Routes.CreateEventSuccess}
            component={CreateEventSuccess}
            options={{ title: 'Agendar una trivia'}}
        />
        <Stack.Screen
            name={Routes.Events}
            component={ListEvents}
            options={{ title: 'Eventos'}}
        />
    </Stack.Navigator>
);

export default EventsStack
