import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener instalado expo/vector-icons
import sensibilidadesData from '../data/sensibilidades.json';

export default function MarcasScreen({ navigation }) {
  const [busqueda, setBusqueda] = useState('');

  const marcasFiltradas = sensibilidadesData.filter((marca) =>
    marca.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const renderMarcaItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('ModelosScreen', { marcaId: item.id, nombreMarca: item.nombre })}
    >
      <Text style={styles.marcaText}>{item.nombre}</Text>
      <Ionicons name="chevron-forward" size={20} color="#FF4500" />
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#1a1a1a', '#000000']} style={styles.container}>
      <Text style={styles.title}>ELIGE TU MARCA</Text>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#8e8e93" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar fabricante..."
          placeholderTextColor="#8e8e93"
          value={busqueda}
          onChangeText={setBusqueda}
        />
      </View>

      <FlatList
        data={marcasFiltradas}
        keyExtractor={(item) => item.id}
        renderItem={renderMarcaItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>No se encontraron resultados</Text>}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50 },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 2,
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
    // Efecto de brillo sutil en el borde al tocar
  },
  marcaText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#eee',
    textTransform: 'uppercase',
  },
  emptyText: { color: '#666', textAlign: 'center', marginTop: 30, fontSize: 16 },
});