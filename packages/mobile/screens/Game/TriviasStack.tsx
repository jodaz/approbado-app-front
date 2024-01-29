import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from '../routes';
import ShowTrivia from './ShowTrivia';
import SelectTrivia from './SelectTrivia';
import TriviaRules from './TriviaRules';
import Play from './Play';
import CheckAnswers from './CheckAnswers';
import WinLevel from './WinLevel';
import LoadingTriviaTeam from './LoadingTriviaTeam';
import LoadingResults from './LoadingResults';
import ListTrivias from './ListTrivias';

const Stack = createNativeStackNavigator()

const TriviasStack = () => (
    <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={Routes.Game}
    >
        <Stack.Screen
            name={Routes.Game}
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

export default TriviasStack
