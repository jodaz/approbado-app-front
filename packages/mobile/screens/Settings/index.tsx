import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from '../routes';
import { HeaderBack } from '../../components';
import DeleteAccount from './DeleteAccount';
import Security from './Security';
import NotificationSettings from './NotificationSettings';
import PrivacySettings from './PrivacySettings';
import Memberships from './Memberships';
import Settings from './Settings';

const Stack = createNativeStackNavigator();

const SettingsStack = () => (
    <Stack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: '#f0f0f0'
            },
            headerShadowVisible: false,
            headerLeft: props => <HeaderBack {...props} />
        }}
        initialRouteName={Routes.Settings}
    >
        <Stack.Screen
            options={{ title: 'Configuraciones '}}
            name={Routes.Settings}
            component={Settings}
        />
        <Stack.Screen
            options={{ title: 'Ajustes de privacidad '}}
            name={Routes.PrivacySettings}
            component={PrivacySettings}
        />
        <Stack.Screen
            options={{ title: 'Ajustes de notificaciones' }}
            name={Routes.NotificationSettings}
            component={NotificationSettings}
        />
        <Stack.Screen
            options={{ title: 'Ajustes de seguridad' }}
            name={Routes.Security}
            component={Security}
        />
        <Stack.Screen
            options={{ title: 'Ajustes de cuenta' }}
            name={Routes.DeleteAccount}
            component={DeleteAccount}
        />
        <Stack.Screen
            options={{ title: 'Membresía' }}
            name={Routes.Memberships}
            component={Memberships}
        />
    </Stack.Navigator>
)

export default SettingsStack
