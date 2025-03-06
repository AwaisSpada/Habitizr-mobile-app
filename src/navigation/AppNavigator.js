import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/Dashboard';
import ProfileScreen from '../screens/ProfileScreen';
import HabitInfoScreen from '../screens/HabitInfoScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HabitInfo" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HabitInfo" component={HabitInfoScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;