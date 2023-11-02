import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from './screens';
import { theme } from './styles/theme';
import { AuthProvider } from '@approbado/lib/contexts/AuthContext';

export default function App() {
    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <NavigationContainer>
                    <StatusBar style="auto" />
                    <MainScreen />
                </NavigationContainer>
            </ThemeProvider>
        </AuthProvider>
    );
}
