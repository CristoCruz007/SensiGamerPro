import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importamos tu pantalla especificando la extensión exacta .jsx
import HomeScreen from '../screens/HomeScreen.jsx';

// Las demás pantallas quedan comentadas por ahora
import MarcasScreen from '../screens/MarcasScreen';
import ModelosScreen from '../screens/ModelosScreen'; 
import SensiScreen from '../screens/SensiScreen';     
// import AjustesScreen from '../screens/AjustesScreen';
import OptimizacionScreen from '../screens/OptimizancionScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false // Oculta la barra de arriba nativa
      }}
    >
      <Stack.Screen name="Inicio" component={HomeScreen} />
      
      <Stack.Screen name="Marcas" component={MarcasScreen} />
      <Stack.Screen name="ModelosScreen" component={ModelosScreen} />
      <Stack.Screen name="SensiScreen" component={SensiScreen} />
      {/* <Stack.Screen name="AjustesPersonales" component={AjustesScreen} /> */}
      <Stack.Screen name="OptimizacionScreen" component={OptimizacionScreen} /> 
     
    </Stack.Navigator>
  );
}