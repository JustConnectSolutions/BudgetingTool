import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';

import { BudgetProvider } from './src/context/BudgetContext';
import { COLORS } from './src/data/initialData';

import HomeScreen from './src/screens/HomeScreen';
import IncomeScreen from './src/screens/IncomeScreen';
import ExpensesScreen from './src/screens/ExpensesScreen';
import BankBreakdownScreen from './src/screens/BankBreakdownScreen';
import DirectDebitsScreen from './src/screens/DirectDebitsScreen';
import MonthsScreen from './src/screens/MonthsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const screenOptions = {
  headerStyle: { backgroundColor: COLORS.primary },
  headerTintColor: '#fff',
  headerTitleStyle: { fontWeight: '700', fontSize: 17 },
  headerShadowVisible: false,
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const icons = {
            Home: focused ? 'home' : 'home-outline',
            Income: focused ? 'wallet' : 'wallet-outline',
            Expenses: focused ? 'receipt' : 'receipt-outline',
            Banks: focused ? 'business' : 'business-outline',
            Bills: focused ? 'checkmark-done' : 'checkmark-done-outline',
          };
          return <Ionicons name={icons[route.name] || 'ellipse'} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.gold,
        tabBarInactiveTintColor: 'rgba(255,255,255,0.55)',
        tabBarStyle: {
          backgroundColor: COLORS.primary,
          borderTopColor: 'rgba(255,255,255,0.1)',
          paddingBottom: 4,
          height: 60,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600', marginBottom: 2 },
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: '700', fontSize: 17 },
        headerShadowVisible: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: '📊 JCS Budgeting Tool',
          tabBarLabel: 'Dashboard',
          headerRight: () => null,
        }}
        initialParams={{}}
      />
      <Tab.Screen
        name="Income"
        component={IncomeScreen}
        options={{ title: '💰 Income Sources', tabBarLabel: 'Income' }}
      />
      <Tab.Screen
        name="Expenses"
        component={ExpensesScreen}
        options={{ title: '💸 Expenses', tabBarLabel: 'Expenses' }}
      />
      <Tab.Screen
        name="Banks"
        component={BankBreakdownScreen}
        options={{ title: '🏦 Bank Breakdown', tabBarLabel: 'Banks' }}
      />
      <Tab.Screen
        name="Bills"
        component={DirectDebitsScreen}
        options={{ title: '✅ Direct Debits', tabBarLabel: 'Bills' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <BudgetProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen
              name="Main"
              component={MainTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Months"
              component={MonthsScreen}
              options={{
                title: '📅 Manage Months',
                presentation: 'modal',
              }}
            />
            <Stack.Screen
              name="DirectDebits"
              component={DirectDebitsScreen}
              options={{ title: '✅ Direct Debits' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="light" />
      </BudgetProvider>
    </SafeAreaProvider>
  );
}
