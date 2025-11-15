import { PaperProvider, Text, ThemeProvider } from 'react-native-paper';
import { StackNavigator } from '@/navigation/StackNavigator';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { refDialog, refNavigation } from '@/constants/Refs';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { Dialogs } from '@/components/Dialogs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './global.css';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { db } from '@/database/database';
import migrations from 'drizzle/migrations';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function App() {
  const { success, error } = useMigrations(db, migrations);

  if (error) {
    return (
      <ThemeProvider>
        <View className={'flex-1 items-center justify-center bg-black'}>
          <Text>Error de migración: {error.message}</Text>
        </View>
      </ThemeProvider>
    );
  }

  if (!success) {
    return (
      <ThemeProvider>
        <View className={'flex-1 items-center justify-center bg-black'}>
          <Text>Migración en progreso...</Text>
        </View>
      </ThemeProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView className={'flex-1'}>
        <KeyboardProvider>
          <BottomSheetModalProvider>
            <PaperProvider>
              <NavigationContainer ref={refNavigation}>
                <StatusBar translucent />

                <StackNavigator />
                <Dialogs ref={refDialog} />
              </NavigationContainer>
            </PaperProvider>
          </BottomSheetModalProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
