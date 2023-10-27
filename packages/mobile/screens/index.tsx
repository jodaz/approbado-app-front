import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from "./routes";
import Onboarding from "./onboarding"
import Presentation from "./presentation"
import Login from "./Login"
import CreateAccount from "./SignUp/CreateAccount"
import Home from "./Home"
import ForgetPassword from "./ForgetPassword"
import CompleteProfile from './SignUp/CompleteProfile';
import ConfirmPhone from './ConfirmPhone';
import DeleteAccount from './Settings/DeleteAccount';
import Security from './Settings/Security';
import NotificationSettings from './Settings/NotificationSettings';
import PrivacySettings from './Settings/PrivacySettings';
import Memberships from './Settings/Memberships';
import Settings from './Settings';

const Stack = createNativeStackNavigator();

const MainScreen = () => (
    <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={Routes.Onboarding}
    >
        <Stack.Screen name={Routes.Settings} component={Settings}  />
        <Stack.Screen name={Routes.PrivacySettings} component={PrivacySettings}  />
        <Stack.Screen name={Routes.NotificationSettings} component={NotificationSettings}  />
        <Stack.Screen name={Routes.Security} component={Security}  />
        <Stack.Screen name={Routes.DeleteAccount} component={DeleteAccount}  />
        <Stack.Screen name={Routes.Memberships} component={Memberships}  />
        <Stack.Screen name={Routes.Onboarding} component={Onboarding}  />
        <Stack.Screen name={Routes.Presentation} component={Presentation}  />
        <Stack.Screen name={Routes.Login} component={Login}  />
        <Stack.Screen name={Routes.SignUp} component={CreateAccount}  />
        <Stack.Screen name={Routes.CompleteProfile} component={CompleteProfile}  />
        <Stack.Screen name={Routes.Home} component={Home}  />
        <Stack.Screen name={Routes.ForgetPassword} component={ForgetPassword}  />
        <Stack.Screen name={Routes.ConfirmPhone} component={ConfirmPhone}  />
    </Stack.Navigator>
)

export default MainScreen
