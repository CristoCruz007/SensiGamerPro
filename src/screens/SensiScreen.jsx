import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function SensiScreen({ route, navigation }) {
  const { modelo } = route.params;
  const { ajustes: sensiAlta } = modelo; // La que viene por defecto de tu JSON es la Alta
  const esIphone = modelo.nombre.toLowerCase().includes('iphone');

  // Estado para saber qué tipo de sensibilidad está seleccionada ('baja', 'media', 'alta')
  const [tipoSeleccionado, setTipoSeleccionado] = useState('alta');

  // Función para calcular dinámicamente el valor actual según la selección
  const calcularSensi = (valorOriginal, tipo) => {
    const num = parseInt(valorOriginal, 10);
    if (isNaN(num)) return valorOriginal; // Por si viene un texto o guión

    if (tipo === 'media') {
      // Le quita un 15% a la alta (puedes ajustar el 0.85 a lo que gustes)
      return Math.round(num * 0.85).toString();
    }
    if (tipo === 'baja') {
      // Le quita un 30% a la alta (puedes ajustar el 0.70 a lo que gustes)
      return Math.round(num * 0.70).toString();
    }
    return valorOriginal; // Si es alta, se queda igual
  };

  // Componente para filas de datos mejoradas
  const AjusteItem = ({ label, valor, color = '#00d2d3', icon }) => (
    <View style={styles.ajusteRow}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name={icon} size={18} color="#FF4500" style={{ marginRight: 8 }} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={[styles.valor, { color }]}>{valor}</Text>
    </View>
  );

  return (
    <LinearGradient colors={['#1a1a1a', '#000000']} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{modelo.nombre.toUpperCase()}</Text>
        <Text style={styles.subtitle}>CONFIGURACIÓN PRECISA</Text>

        {/* Contenedor de Botones de Filtro */}
        <View style={styles.ContenedorBotones}>
          <TouchableOpacity 
            style={[styles.btnFiltro, tipoSeleccionado === 'baja' && styles.btnFiltroActivo]} 
            onPress={() => setTipoSeleccionado('baja')}
          >
            <Text style={[styles.btnFiltroTexto, tipoSeleccionado === 'baja' && styles.btnFiltroTextoActivo]}>BAJA</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.btnFiltro, tipoSeleccionado === 'media' && styles.btnFiltroActivo]} 
            onPress={() => setTipoSeleccionado('media')}
          >
            <Text style={[styles.btnFiltroTexto, tipoSeleccionado === 'media' && styles.btnFiltroTextoActivo]}>MEDIA</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.btnFiltro, tipoSeleccionado === 'alta' && styles.btnFiltroActivo]} 
            onPress={() => setTipoSeleccionado('alta')}
          >
            <Text style={[styles.btnFiltroTexto, tipoSeleccionado === 'alta' && styles.btnFiltroTextoActivo]}>ALTA</Text>
          </TouchableOpacity>
        </View>

        {/* Panel de Ajustes con cálculos en tiempo real */}
        <View style={styles.contenedorAjustes}>
          <AjusteItem label="General" valor={calcularSensi(sensiAlta.general, tipoSeleccionado)} icon="settings-outline" />
          <AjusteItem label="Punto Rojo" valor={calcularSensi(sensiAlta.punto_rojo, tipoSeleccionado)} icon="radio-button-on-outline" />
          <AjusteItem label="Mira x2" valor={calcularSensi(sensiAlta.mira_x2, tipoSeleccionado)} icon="scan-outline" />
          <AjusteItem label="Mira x4" valor={calcularSensi(sensiAlta.mira_x4, tipoSeleccionado)} icon="scan-outline" />
          <AjusteItem label="AWM" valor={calcularSensi(sensiAlta.mira_franco || '0', tipoSeleccionado)} icon="eye-outline" />
          <AjusteItem label="Cámara 360" valor={calcularSensi(sensiAlta.camara_360 || '0', tipoSeleccionado)} icon="infinite-outline" />
          <AjusteItem label="DPI" valor={sensiAlta.dpi} color="#ff9f43" icon="filter-outline" />
          <AjusteItem label="Botón Disparo" valor={sensiAlta.boton_disparo} color="#FF4500" icon="aperture-outline" />
        </View>

        {esIphone && (
          <View style={styles.notaContenedor}>
            <Text style={styles.notaTitulo}><Ionicons name="information-circle" size={16} /> NOTA PARA IOS</Text>
            <Text style={styles.notaTexto}>Los valores de DPI son referenciales. Ajusta la "Velocidad del cursor" en Accesibilidad.</Text>
          </View>
        )}

        <TouchableOpacity style={styles.btnRegresar} onPress={() => navigation.goBack()}>
          <Text style={styles.btnText}>VOLVER</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  title: { fontSize: 28, fontWeight: '900', color: '#fff', textAlign: 'center', marginTop: 50 },
  subtitle: { fontSize: 14, color: '#FF4500', textAlign: 'center', fontWeight: 'bold', marginBottom: 20, letterSpacing: 2 },
  
  // Estilos nuevos para la botonera
  ContenedorBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1c1c1c',
    borderRadius: 12,
    padding: 5,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333'
  },
  btnFiltro: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  btnFiltroActivo: {
    backgroundColor: '#FF4500',
  },
  btnFiltroTexto: {
    color: '#aaa',
    fontWeight: 'bold',
    fontSize: 13
  },
  btnFiltroTextoActivo: {
    color: '#fff',
  },

  contenedorAjustes: {
    backgroundColor: '#1c1c1c',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 20,
  },
  ajusteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#252525',
  },
  label: { fontSize: 16, color: '#ccc', fontWeight: '500' },
  valor: { fontSize: 18, fontWeight: '800' },
  notaContenedor: {
    backgroundColor: '#251500',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#ff9f43',
    marginBottom: 20,
  },
  notaTitulo: { fontWeight: 'bold', color: '#ff9f43', marginBottom: 5 },
  notaTexto: { fontSize: 13, color: '#ddd' },
  btnRegresar: {
    backgroundColor: '#FF4500',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 50,
  },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold', letterSpacing: 1 },
});