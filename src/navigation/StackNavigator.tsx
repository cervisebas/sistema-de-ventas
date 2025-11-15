import { StackScreenName } from '@/enums/StackScreenName';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomNavigation } from './BottomNavigation';
import { ClientManager } from '@/screens/ClientScreen/ClientManager/ClientManager';
import { CategoryScreen } from '@/screens/CategoryScreen/CategoryScreen';
import { CategoryManager } from '@/screens/CategoryScreen/CategoryManager/CategoryManager';

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

      <Stack.Screen
        name={StackScreenName.CATEGORIES}
        component={CategoryScreen}
      />

      <Stack.Screen
        name={StackScreenName.CATEGORY_MANAGER}
        component={CategoryManager}
      />
    </Stack.Navigator>
  );
}
