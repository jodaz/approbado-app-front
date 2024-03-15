import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from '../routes';
import { ArrowLeft } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import ShowTrivia from './ShowTrivia';
import SelectTrivia from './SelectTrivia';
import TriviaRules from './TriviaRules';
import ListTrivias from './ListTrivias';
import TriviaHeader from './components/TriviaHeader';

const Stack = createNativeStackNavigator()

const TriviasStack = ({ navigation }) => (
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
            options={{
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowLeft color='#000' />
                    </TouchableOpacity>
                )
            }}
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
