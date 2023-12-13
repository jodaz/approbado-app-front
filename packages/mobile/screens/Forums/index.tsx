import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from '../routes';
import ListForum from './ListForum';

const Stack = createNativeStackNavigator()

const Forum = () => {

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={Routes.Forum}
        >
            <Stack.Screen name={Routes.Forum} component={ListForum}  />
        </Stack.Navigator>
    );
}

export default Forum
