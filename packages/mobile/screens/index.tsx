import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from "./routes";
import { useAuth, getInitialState } from '@approbado/lib/contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import Onboarding from "./onboarding"
import Presentation from "./presentation"
import Login from "./Login"
import CreateAccount from "./SignUp/CreateAccount"
import ForgetPassword from "./ForgetPassword"
import CompleteProfile from './SignUp/CompleteProfile';
import ConfirmPhone from './ConfirmPhone';
import BottomNav from '../components/BottomNav';
import SettingsStack from './Settings';
import CreateNewPassword from './CreateNewPassword';
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
import ShowTrivia from './Game/ShowTrivia';
import SelectTrivia from './Game/SelectTrivia';
import TriviaRules from './Game/TriviaRules';
import CreateEvent from './Events/CreateEvent';
import CreateEventSuccess from './Events/CreateEventSuccess';

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
            screenOptions={{ headerShown: false }}
            initialRouteName={Routes.Onboarding}
        >
            <Stack.Screen name={Routes.Onboarding} component={Onboarding}  />
            <Stack.Screen name={Routes.CreateEvent} component={CreateEvent}  />
            <Stack.Screen name={Routes.CreateEventSuccess} component={CreateEventSuccess}  />
            <Stack.Screen name={Routes.Presentation} component={Presentation}  />
            <Stack.Screen name={Routes.Login} component={Login}  />
            <Stack.Screen name={Routes.SignUp} component={CreateAccount}  />
            <Stack.Screen name={Routes.CompleteProfile} component={CompleteProfile}  />
            <Stack.Screen name={Routes.ForgetPassword} component={ForgetPassword}  />
            <Stack.Screen name={Routes.ConfirmPhone} component={ConfirmPhone}  />
            <Stack.Screen name={Routes.CreateNewPassword} component={CreateNewPassword}  />
            <Stack.Screen name={Routes.Home} component={BottomNav}  />
            <Stack.Screen name={Routes.Settings} component={SettingsStack} />
            <Stack.Screen name={Routes.EditProfile} component={EditProfileInformation} />
            <Stack.Screen name={Routes.EditProfileContact} component={EditProfileContact} />
            <Stack.Screen name={Routes.EditProfileOcupation} component={EditOcupation} />
            <Stack.Screen name={Routes.EditProfileSocial} component={EditSocialProfile} />
            <Stack.Screen name={Routes.ShowPost} component={ShowPost} />
            <Stack.Screen name={Routes.UserChat} component={UserChat} />
            <Stack.Screen name={Routes.EditPost} component={EditPost} />
            <Stack.Screen name={Routes.ReportPost} component={ReportPost} />
            <Stack.Screen name={Routes.InviteChat} component={InviteChat} />
            <Stack.Screen name={Routes.CreateForum} component={CreatePost} />
            <Stack.Screen name={Routes.ShowTrivia} component={ShowTrivia} />
            <Stack.Screen name={Routes.SelectTrivia} component={SelectTrivia} />
            <Stack.Screen name={Routes.TriviaRules} component={TriviaRules} />
        </Stack.Navigator>
    )
}

export default MainScreen
