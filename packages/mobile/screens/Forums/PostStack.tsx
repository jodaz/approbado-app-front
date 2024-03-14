import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from '../routes';
import AppHeaderWithTitle from '../../components/AppHeaderWithTitle';
import ShowPost from './ShowPost';
import EditPost from './EditPost';
import ReportPost from './ReportPost';
import CreatePost from './CreatePost';

const Stack = createNativeStackNavigator()

const PostStack = ({ navigation }) => (
    <Stack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: '#f0f0f0'
            },
            headerShadowVisible: false,
            headerTitle: props => <AppHeaderWithTitle {...props} />
        }}
    >
        <Stack.Screen
            name={Routes.ShowPost}
            component={ShowPost}
            options={{ title: 'Ver post'}}
        />
        <Stack.Screen
            name={Routes.EditPost}
            component={EditPost}
            options={{ title: 'Editar post'}}
        />
        <Stack.Screen
            name={Routes.ReportPost}
            component={ReportPost}
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen
            name={Routes.CreateForum}
            component={CreatePost}
            options={{ title: 'Nuevo post'}}
        />
    </Stack.Navigator>
);

export default PostStack
