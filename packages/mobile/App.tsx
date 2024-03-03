import * as React from 'react'
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { theme } from './styles/theme';
import { AuthProvider } from '@approbado/lib/contexts/AuthContext';
import { GameProvider } from '@approbado/lib/contexts/GameContext';
import { ToastProvider } from '@approbado/lib/contexts/ToastContext';
import { BottomSheetProvider } from './contexts/BottomSheetContext';
import { useFonts } from 'expo-font';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
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
        <GestureHandlerRootView style={{ flex: 1 }}>
            <AuthProvider>
                <ToastProvider>
                    <ThemeProvider theme={theme}>
                        <BottomSheetProvider>
                            <GameProvider>
                                <NavigationContainer onReady={onLayoutRootView}>
                                    <StatusBar style="auto" />
                                    <MainScreen />
                                    <Toast />
                                </NavigationContainer>
                            </GameProvider>
                        </BottomSheetProvider>
                    </ThemeProvider>
                </ToastProvider>
            </AuthProvider>
        </GestureHandlerRootView>
    );
}
