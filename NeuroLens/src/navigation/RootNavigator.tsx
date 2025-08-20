import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '@screens/auth/LoginScreen';
import SignupScreen from '@screens/auth/SignupScreen';
import DashboardScreen from '@screens/DashboardScreen';
import CameraScreen from '@screens/CameraScreen';
import WritingAssistantScreen from '@screens/WritingAssistantScreen';
import ProfileScreen from '@screens/ProfileScreen';
import { useAuth } from '@contexts/AuthContext';
import { Text } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{
        tabBarIcon: ({color, size}) => <Text style={{color}}>🏠</Text>
      }} />
      <Tab.Screen name="Camera" component={CameraScreen} options={{
        tabBarIcon: ({color}) => <Text style={{color}}>📷</Text>
      }} />
      <Tab.Screen name="Writing" component={WritingAssistantScreen} options={{
        title: 'Writing',
        tabBarIcon: ({color}) => <Text style={{color}}>✍️</Text>
      }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{
        tabBarIcon: ({color}) => <Text style={{color}}>👤</Text>
      }} />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  const { sessionInitialized, session } = useAuth();

  if (!sessionInitialized) {
    return null;
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {session ? (
        <Stack.Screen name="MainTabs" component={MainTabs} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

