import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from "./routes";
// Screens
import Onboarding from "./onboarding"
import Login from "./Login"

const Stack = createNativeStackNavigator();

const MainScreen = () => (
    <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={Routes.Onboarding}
    >
        <Stack.Screen name={Routes.Onboarding} component={Onboarding}  />
        <Stack.Screen name={Routes.Login} component={Login}  />
    </Stack.Navigator>
)

export default MainScreen
