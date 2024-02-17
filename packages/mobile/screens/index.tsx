import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from "./routes";
import { useAuth, getInitialState } from '@approbado/lib/contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { HeaderBack } from '../components';
import SettingsStack from './Settings';
import GameStack from './Game/GameStack';
import EditProfileInformation from './EditProfile/EditProfileInformation';
import EditOcupation from './EditProfile/EditOcupation';
import EditSocialProfile from './EditProfile/EditSocialProfile';
import EditProfileContact from './EditProfile/EditProfileContact';
import ShowPost from './Forums/ShowPost';
import InviteChat from './Chat/components/InviteChat';
import UserChat from './Chat/components/UserChat';
import EditPost from './Forums/EditPost';
import ReportPost from './Forums/ReportPost';
import CreatePost from './Forums/CreatePost';
import CreateEvent from './Events/CreateEvent';
import CreateEventSuccess from './Events/CreateEventSuccess';
// Stacks
import OnboardingStack from './OnboardingStack';
import BottomNav from '../components/BottomNav';

const Stack = createNativeStackNavigator();

const MainScreen = () => {
    const { state, dispatch: authDispatch } = useAuth()
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
                headerLeft: props => <HeaderBack {...props} />
            }}
            initialRouteName={Routes.Onboarding}
        >
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
                name={Routes.CreateEvent}
                component={CreateEvent}
                options={{ title: 'Agendar una trivia'}}
            />
            <Stack.Screen
                name={Routes.CreateEventSuccess}
                component={CreateEventSuccess}
            />
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
                name={Routes.ShowPost}
                component={ShowPost}
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
                name={Routes.EditPost}
                component={EditPost}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name={Routes.ReportPost}
                component={ReportPost}
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
                name={Routes.CreateForum}
                component={CreatePost}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}

export default MainScreen
