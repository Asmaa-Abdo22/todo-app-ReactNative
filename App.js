import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store'; 
import AppNavigator from './navigation/AppNavigator';
import { ActivityIndicator } from 'react-native';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator size="large" color="#0000ff" />} persistor={persistor}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
