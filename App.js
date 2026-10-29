import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import mobileAds from 'react-native-google-mobile-ads';
import AppNavigation from './src/navigation/AppNavigation';

export default function App() {
  useEffect(() => {
    // Inicializar AdMob al arrancar para evitar cierres forzosos
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        console.log('AdMob inicializado con éxito:', adapterStatuses);
      })
      .catch(error => {
        console.warn('Error al inicializar AdMob:', error);
      });
  }, []);

  return (
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  );
}