import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from "./routes";
import { useAuth, getInitialState } from '@approbado/lib/contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import EditProfileInformation from './EditProfile/EditProfileInformation';
import EditOcupation from './EditProfile/EditOcupation';
import EditSocialProfile from './EditProfile/EditSocialProfile';
import EditProfileContact from './EditProfile/EditProfileContact';
import InviteChat from './Chat/components/InviteChat';
import UserChat from './Chat/components/UserChat';
// Stacks
import OnboardingStack from './OnboardingStack';
import BottomNav from '../components/BottomNav';
import EventsStack from './Events/EventsStack';
import SettingsStack from './Settings';
import GameStack from './Game/GameStack';
import PostStack from './Forums/PostStack';

const Stack = createNativeStackNavigator();

const MainScreen = () => {
    const { dispatch: authDispatch } = useAuth()
    const navigation = useNavigation()

    const handleAuthentication = async () => {
        const hasToken = await getInitialState(authDispatch)

        if (hasToken) {
            navigation.navigate(Routes.Home)
        }
    }

    React.useEffect(() => { handleAuthentication() }, [])

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#f0f0f0'
                },
                headerShadowVisible: false,
                headerLeft: () => <></>
            }}
            initialRouteName={Routes.Onboarding}
        >
            <Stack.Screen
                name={Routes.Events}
                component={EventsStack}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name={Routes.Home}
                component={BottomNav}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={Routes.Play}
                component={GameStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={Routes.Onboarding}
                component={OnboardingStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={Routes.Settings}
                component={SettingsStack}
                options={{ headerShown: false }}
            />

            {/* Incomplete views */}
            <Stack.Screen
                name={Routes.EditProfile}
                component={EditProfileInformation}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name={Routes.EditProfileContact}
                component={EditProfileContact}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name={Routes.EditProfileOcupation}
                component={EditOcupation}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name={Routes.EditProfileSocial}
                component={EditSocialProfile}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name={Routes.UserChat}
                component={UserChat}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name={Routes.InviteChat}
                component={InviteChat}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name={Routes.Posts}
                component={PostStack}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default MainScreen
