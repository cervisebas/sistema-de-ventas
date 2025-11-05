import { StackScreenName } from '@/enums/StackScreenName';
import { createStackNavigator } from '@react-navigation/stack';
import { BottomNavigation } from './BottomNavigation';

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
    </Stack.Navigator>
  );
}
