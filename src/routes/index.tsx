import React from 'react';
import 'react-native-gesture-handler';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

type RootStackParamList = {
  Public: typeof PublicRoutes;
  Private: typeof PrivateRoutes;
};

const Stack = createStackNavigator<RootStackParamList>();

interface NavigationProps {
  colorScheme: string;
}

const Navigation: React.FC<NavigationProps> = ({ colorScheme }) => {
  return (
    <NavigationContainer
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Private"
      >
        <Stack.Screen name="Public" component={PublicRoutes} />
        <Stack.Screen name="Private" component={PrivateRoutes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
