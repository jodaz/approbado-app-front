import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from '../routes';
import Play from './Play';
import CheckAnswers from './CheckAnswers';
import WinLevel from './WinLevel';
import LoadingTriviaTeam from './LoadingTriviaTeam';
import LoadingResults from './LoadingResults';
import TriviaHeader from './components/TriviaHeader';

const Stack = createNativeStackNavigator()

const GameStack = () => (
    <Stack.Navigator
        screenOptions={{
            headerTitle: () => <TriviaHeader />,
            headerStyle: {
                backgroundColor: '#f0f0f0'
            },
            headerShadowVisible: false
        }}
        initialRouteName={Routes.Play}
    >
        <Stack.Screen
            name={Routes.Play}
            component={Play}
        />
        <Stack.Screen
            name={Routes.CheckAnswers}
            component={CheckAnswers}
        />
        <Stack.Screen
            name={Routes.WinLevel}
            component={WinLevel}
        />
        <Stack.Screen
            name={Routes.LoadingTriviaTeam}
            component={LoadingTriviaTeam}
        />
        <Stack.Screen
            name={Routes.LoadingResults}
            component={LoadingResults}
        />
    </Stack.Navigator>
);

export default GameStack
