import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { theme } from './styles/theme';
import { AuthProvider } from '@approbado/lib/contexts/AuthContext';
import { ToastProvider } from '@approbado/lib/contexts/ToastContext';
import MainScreen from './screens';
import Toast from './components/Toast';

export default function App() {
    return (
        <AuthProvider>
            <ToastProvider>
                <ThemeProvider theme={theme}>
                    <NavigationContainer>
                        <StatusBar style="auto" />
                        <MainScreen />
                        <Toast />
                    </NavigationContainer>
                </ThemeProvider>
            </ToastProvider>
        </AuthProvider>
    );
}
