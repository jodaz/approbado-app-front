import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from './screens';
import { theme } from './styles/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
          <StatusBar style="auto" />
          <MainScreen />
      </NavigationContainer>
    </ThemeProvider>
  );
}
