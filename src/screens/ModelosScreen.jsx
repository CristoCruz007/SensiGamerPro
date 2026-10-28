import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import sensibilidadesData from '../data/sensibilidades.json';

export default function ModelosScreen({ route, navigation }) {
  const { marcaId, nombreMarca } = route.params;
  const [busqueda, setBusqueda] = useState('');

  const marcaSeleccionada = sensibilidadesData.find(m => m.id === marcaId);

  if (!marcaSeleccionada) {
    return (
      <LinearGradient colors={['#1a1a1a', '#000000']} style={styles.container}>
        <Text style={styles.title}>Error: Marca no encontrada</Text>
      </LinearGradient>
    );
  }

  const modelosFiltrados = marcaSeleccionada.modelos.filter((modelo) =>
    modelo.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const renderModeloItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('SensiScreen', { modelo: item })}
    >
      <Text style={styles.modeloText}>{item.nombre}</Text>
      <Ionicons name="phone-portrait-outline" size={20} color="#FF4500" />
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#1a1a1a', '#000000']} style={styles.container}>
      <Text style={styles.title}>{nombreMarca.toUpperCase()}</Text>
      <Text style={styles.subtitle}>Selecciona tu modelo</Text>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#8e8e93" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar modelo (ej: A54, S23)..."
          placeholderTextColor="#8e8e93"
          value={busqueda}
          onChangeText={setBusqueda}
        />
      </View>
      
      <FlatList
        data={modelosFiltrados}
        keyExtractor={(item) => item.nombre}
        renderItem={renderModeloItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No se encontraron modelos</Text>}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FF4500', // Color neón destacado
    textAlign: 'center',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#252525',
    marginHorizontal: 16,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  searchIcon: { marginRight: 10 },
  searchInput: {
    flex: 1,
    color: '#fff',
    paddingVertical: 12,
  },
  listContainer: { paddingHorizontal: 16, paddingBottom: 20 },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  modeloText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
  emptyText: { color: '#666', textAlign: 'center', marginTop: 30, fontSize: 16 },
});