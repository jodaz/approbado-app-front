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
import TriviasStack from '../screens/Game/TriviasStack';
import styled from 'styled-components/native';

const Tab = createBottomTabNavigator();

const StyledButton = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    background-color: ${props => props.isFocused
        ? 'rgba(255, 232, 53, 0.25)' : 'rgba(183, 183, 183, 0.10)'};
    padding: 15px;
    margin-bottom: 5px;
`

const TabIndicator = styled.View`
    height: 10px;
    border-bottom-color: ${props => props.isFocused
       ? props.theme.palette.primary.main
       : '#000'};
    border-bottom-width: 4px;
    width: 20px;
`

const TabButton = ({ children, isFocused }) => (
    <>
        <StyledButton isFocused={isFocused}>
            {children}
        </StyledButton>
        <TabIndicator isFocused={isFocused} />
    </>
)

const BottomNav = () => (
    <Tab.Navigator
        initialRouteName={Routes.Home}
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
                const { name } = route;

                switch (name) {
                    case Routes.Home:
                        return (
                            <>
                                <TabButton isFocused={focused}>
                                    <HomeIcon color="#FFE835" size={24} />
                                </TabButton>
                            </>
                        )
                    case Routes.Game:
                        return (
                            <TabButton isFocused={focused}>
                                <Scale color="#FFE835" size={24} />
                            </TabButton>
                        )
                    case Routes.Forum:
                        return (
                            <TabButton isFocused={focused}>
                                <LampDesk color="#FFE835" size={24} />
                            </TabButton>
                        )
                    case Routes.Profile:
                        return (
                            <TabButton isFocused={focused}>
                                <UserCircle color="#FFE835" size={24} />
                            </TabButton>
                        )
                    default:
                        return (
                            <TabButton>
                                <HomeIcon color="#FFE835" size={24} />
                            </TabButton>
                        )
                }
            },
            headerShown: false,
            tabBarStyle: {
                paddingVertical: 10,
                height: 90,
                borderTopEndRadius: 12,
                borderTopStartRadius: 12,
                backgroundColor: '#000'
            },
            tabBarLabel: () => null
        })}
    >
        <Tab.Screen name={Routes.Home} component={Home} />
        <Tab.Screen name={Routes.Game} component={TriviasStack} />
        <Tab.Screen name={Routes.Forum} component={Forum} />
        <Tab.Screen name={Routes.Profile} component={Profile} />
    </Tab.Navigator>
)

export default BottomNav
