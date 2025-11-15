import { StackScreenName } from '@/enums/StackScreenName';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomNavigation } from './BottomNavigation';
import { ClientManager } from '@/screens/ClientScreen/ClientManager/ClientManager';

const Stack = createStackNavigator();

export function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={StackScreenName.PRINCIPAL}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name={StackScreenName.PRINCIPAL}
        component={BottomNavigation}
      />

      {/* OTHER SCREENS */}
      <Stack.Screen
        name={StackScreenName.CLIENT_MANAGER}
        component={ClientManager}
      />
    </Stack.Navigator>
  );
}
