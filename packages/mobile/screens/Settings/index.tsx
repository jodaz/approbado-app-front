import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from '../routes';
import DeleteAccount from './DeleteAccount';
import Security from './Security';
import NotificationSettings from './NotificationSettings';
import PrivacySettings from './PrivacySettings';
import Memberships from './Memberships';
import Settings from './Settings';

const Stack = createNativeStackNavigator();

const SettingsStack = () => (
    <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={Routes.Settings}
    >
        <Stack.Screen name={Routes.Settings} component={Settings}  />
        <Stack.Screen name={Routes.PrivacySettings} component={PrivacySettings}  />
        <Stack.Screen name={Routes.NotificationSettings} component={NotificationSettings}  />
        <Stack.Screen name={Routes.Security} component={Security}  />
        <Stack.Screen name={Routes.DeleteAccount} component={DeleteAccount}  />
        <Stack.Screen name={Routes.Memberships} component={Memberships}  />
    </Stack.Navigator>
)

export default SettingsStack
