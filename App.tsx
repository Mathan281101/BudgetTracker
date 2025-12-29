import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { BudgetProvider } from './src/context/BudgetContext';
import MainTabNavigator from './src/navigation/MainTabNavigator';

function AppContent() {
  return (
    <NavigationContainer>
      <MainTabNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BudgetProvider>
        <AppContent />
      </BudgetProvider>
    </ErrorBoundary>
  );
}