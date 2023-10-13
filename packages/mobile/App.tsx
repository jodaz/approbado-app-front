import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from './screens';

const theme = {
  palette: {
    primary: '#F6FA00',
    secondary: '#A6A6A6',
  },
};

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
