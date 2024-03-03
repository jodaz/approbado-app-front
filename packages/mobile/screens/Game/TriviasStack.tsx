import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from '../routes';
import ShowTrivia from './ShowTrivia';
import SelectTrivia from './SelectTrivia';
import TriviaRules from './TriviaRules';
import ListTrivias from './ListTrivias';
import TriviaHeader from './components/TriviaHeader';

const Stack = createNativeStackNavigator()

const TriviasStack = () => (
    <Stack.Navigator
        screenOptions={{
            headerTitle: () => <TriviaHeader />,
            headerStyle: {
                backgroundColor: '#f0f0f0'
            },
            headerShadowVisible: false
        }}
        initialRouteName={Routes.ListTrivias}
    >
        <Stack.Screen
            name={Routes.ListTrivias}
            component={ListTrivias}
         />
        <Stack.Screen
            name={Routes.ShowTrivia}
            component={ShowTrivia}
        />
        <Stack.Screen
            name={Routes.SelectTrivia}
            component={SelectTrivia}
        />
        <Stack.Screen
            name={Routes.TriviaRules}
            component={TriviaRules}
        />
    </Stack.Navigator>
);

export default TriviasStack
