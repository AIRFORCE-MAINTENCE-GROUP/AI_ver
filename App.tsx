import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import { ProductsProvider } from './src/context/ProductsContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <ProductsProvider>
        <StatusBar style="dark" />
        <RootNavigator />
      </ProductsProvider>
    </SafeAreaProvider>
  );
}
