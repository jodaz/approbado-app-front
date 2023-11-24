import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from '../routes';
import ListForum from './ListForum';
import CreateForum from './CreateForum';

const Stack = createNativeStackNavigator()

const Forum = ({ navigation }) => {

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName={Routes.Forum}
        >
            <Stack.Screen name={Routes.Forum} component={ListForum}  />
            <Stack.Screen name={Routes.CreateForum} component={CreateForum} />
        </Stack.Navigator>
    );
}

export default Forum
