import * as React from 'react'
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { theme } from './styles/theme';
import { AuthProvider } from '@approbado/lib/contexts/AuthContext';
import { ToastProvider } from '@approbado/lib/contexts/ToastContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import MainScreen from './screens';
import Toast from './components/Toast';

export default function App() {
    const [fontsLoaded, fontError] = useFonts({
        'NotoSans-Thin': require('./assets/fonts/NotoSans-Thin.ttf'),
        'NotoSans-ExtraLight': require('./assets/fonts/NotoSans-ExtraLight.ttf'),
        'NotoSans-Light': require('./assets/fonts/NotoSans-Light.ttf'),
        'NotoSans-Regular': require('./assets/fonts/NotoSans-Regular.ttf'),
        'NotoSans-Medium': require('./assets/fonts/NotoSans-Medium.ttf'),
        'NotoSans-SemiBold': require('./assets/fonts/NotoSans-SemiBold.ttf'),
        'NotoSans-Bold': require('./assets/fonts/NotoSans-Bold.ttf'),
        'NotoSans-ExtraBold': require('./assets/fonts/NotoSans-ExtraBold.ttf'),
        'NotoSans-Black': require('./assets/fonts/NotoSans-Black.ttf'),
    });

    const onLayoutRootView = React.useCallback(async () => {
        if (fontsLoaded || fontError) {
          await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    React.useEffect

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <AuthProvider>
            <ToastProvider>
                <ThemeProvider theme={theme}>
                    <SafeAreaProvider>
                        <NavigationContainer onReady={onLayoutRootView}>
                            <StatusBar style="auto" />
                            <MainScreen />
                            <Toast />
                        </NavigationContainer>
                    </SafeAreaProvider>
                </ThemeProvider>
            </ToastProvider>
        </AuthProvider>
    );
}
