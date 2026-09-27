import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RootStackParamList, TabParamList } from './types';
import { colors, s } from '../theme';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ProductListScreen from '../screens/ProductListScreen';
import ProductRegistrationScreen from '../screens/ProductRegistrationScreen';
import PlaceholderScreen from '../screens/PlaceholderScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: { ...DefaultTheme.colors, background: colors.background },
};

const TAB_ICONS: Record<keyof TabParamList, keyof typeof Feather.glyphMap> = {
  Home: 'home',
  Search: 'search',
  Register: 'plus-circle',
  Chat: 'message-square',
  My: 'user',
};

function MainTabs() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          height: s(56) + insets.bottom,
          paddingTop: s(8),
        },
        tabBarLabelStyle: { fontSize: s(10), fontWeight: '500', marginTop: s(2) },
        tabBarIcon: ({ color }) => (
          <Feather name={TAB_ICONS[route.name]} size={s(21)} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Home" component={ProductListScreen} options={{ title: '홈' }} />
      <Tab.Screen name="Search" component={PlaceholderScreen} options={{ title: '검색' }} />
      <Tab.Screen name="Register" component={ProductRegistrationScreen} options={{ title: '등록' }} />
      <Tab.Screen name="Chat" component={PlaceholderScreen} options={{ title: '채팅' }} />
      <Tab.Screen name="My" component={PlaceholderScreen} options={{ title: '마이' }} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.background } }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Main" component={MainTabs} options={{ gestureEnabled: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
