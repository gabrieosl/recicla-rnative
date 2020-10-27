import React from 'react';
import { Feather } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import Leaderboard from '../screens/Leaderboard';

type BottomTabParamList = {
  Home: undefined;
  Leaderboard: undefined;
};

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        initialRouteName="Home"
        tabBarOptions={{ activeTintColor: '#34885e' }}
      >
        <BottomTab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          }}
        />
        <BottomTab.Screen
          name="Leaderboard"
          component={Leaderboard}
          options={{
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="award" color={color} />
            ),
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Feather size={30} style={{ marginBottom: -3 }} {...props} />;
}
