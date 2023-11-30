import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Routes } from "../screens/routes"
import {
    Home as HomeIcon,
    LampDesk,
    Scale,
    UserCircle
} from 'lucide-react-native';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Forum from '../screens/Forums';
import Game from '../screens/Game';

const Tab = createBottomTabNavigator();

const BottomNav = () => (
    <Tab.Navigator
        initialRouteName={Routes.Home}
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
                const { name } = route;

                switch (name) {
                    case Routes.Home:
                        return <HomeIcon color="#FFE835" size={24} />
                    case Routes.Game:
                        return <Scale color="#FFE835" size={24} />
                    case Routes.Forum:
                        return <LampDesk color="#FFE835" size={24} />
                    case Routes.Profile:
                        return <UserCircle color="#FFE835" size={24} />
                    default:
                        return <HomeIcon color="#FFE835" size={24} />
                }
            },
            headerShown: false,
            tabBarStyle: {
                paddingVertical: 10,
                height: 70,
                borderTopEndRadius: 12,
                borderTopStartRadius: 12,
                backgroundColor: '#000'
            },
            tabBarLabel: () => null
        })}
    >
        <Tab.Screen name={Routes.Home} component={Home} />
        <Tab.Screen name={Routes.Game} component={Game} />
        <Tab.Screen name={Routes.Forum} component={Forum} />
        <Tab.Screen name={Routes.Profile} component={Profile} />
    </Tab.Navigator>
)

export default BottomNav
