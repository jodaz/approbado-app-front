import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from "./onboarding"
import Presentation from "./presentation"
import { Routes } from "./routes";

const Stack = createNativeStackNavigator();

const MainScreen = () => (
    <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={Routes.Onboarding}
    >
        <Stack.Screen name={Routes.Onboarding} component={Onboarding}  />
        <Stack.Screen name={Routes.Presentation} component={Presentation}  />
    </Stack.Navigator>
)

export default MainScreen