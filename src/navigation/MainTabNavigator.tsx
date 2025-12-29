import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import AddTransactionScreen from '../screens/AddTransactionScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Text } from 'react-native';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerStyle: { backgroundColor: '#3b82f6' },
                headerTintColor: 'white',
                headerTitleStyle: { fontWeight: 'bold' },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') iconName = '🏠';
                    else if (route.name === 'Add') iconName = '➕';
                    else if (route.name === 'History') iconName = '📜';
                    else if (route.name === 'Profile') iconName = '👤';

                    return <Text style={{ fontSize: size, color: color }}>{iconName}</Text>;
                },
                tabBarActiveTintColor: '#3b82f6',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Budget Tracker' }} />
            <Tab.Screen name="Add" component={AddTransactionScreen} options={{ title: 'Add Transaction' }} />
            <Tab.Screen name="History" component={HistoryScreen} options={{ title: 'History' }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
