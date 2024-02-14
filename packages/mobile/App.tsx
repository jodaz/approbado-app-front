import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { theme } from './styles/theme';
import { AuthProvider } from '@approbado/lib/contexts/AuthContext';
import { GameProvider } from '@approbado/lib/contexts/GameContext';
import { ToastProvider } from '@approbado/lib/contexts/ToastContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import MainScreen from './screens';
import Toast from './components/Toast';

export default function App() {
    const [fontsLoaded, fontError] = useFonts({
        'NotoSans-Thin': require('../lib/fonts/NotoSans-Thin.ttf'),
        'NotoSans-ExtraLight': require('../lib/fonts/NotoSans-ExtraLight.ttf'),
        'NotoSans-Light': require('../lib/fonts/NotoSans-Light.ttf'),
        'NotoSans-Regular': require('../lib/fonts/NotoSans-Regular.ttf'),
        'NotoSans-Medium': require('../lib/fonts/NotoSans-Medium.ttf'),
        'NotoSans-SemiBold': require('../lib/fonts/NotoSans-SemiBold.ttf'),
        'NotoSans-Bold': require('../lib/fonts/NotoSans-Bold.ttf'),
        'NotoSans-ExtraBold': require('../lib/fonts/NotoSans-ExtraBold.ttf'),
        'NotoSans-Black': require('../lib/fonts/NotoSans-Black.ttf'),
    });


    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <AuthProvider>
            <ToastProvider>
                <GameProvider>
                    <ThemeProvider theme={theme}>
                        <SafeAreaProvider>
                            <NavigationContainer>
                                <StatusBar style="auto" />
                                <MainScreen />
                                <Toast />
                            </NavigationContainer>
                        </SafeAreaProvider>
                    </ThemeProvider>
                </GameProvider>
            </ToastProvider>
        </AuthProvider>
    );
}
