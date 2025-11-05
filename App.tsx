import './global.css';
import 'react-native-gesture-handler';

import { ThemeProvider } from 'react-native-paper';
import { StackNavigator } from '@/navigation/StackNavigator';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <StatusBar translucent />

        <StackNavigator />
      </ThemeProvider>
    </NavigationContainer>
  );
}
