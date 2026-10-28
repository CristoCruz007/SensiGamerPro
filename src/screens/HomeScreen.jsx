import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Modal, TextInput, ScrollView, Clipboard } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; 
import * as Haptics from 'expo-haptics';
import * as Device from 'expo-device'; 
import { estilosGamer } from '../data/EstilosGamer';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const [modalSensi, setModalSensi] = useState(false);
  const [modalNombres, setModalNombres] = useState(false);
  const [inputNombre, setInputNombre] = useState('');
  const [nombresGenerados, setNombresGenerados] = useState([]);
  const [sensiResultado, setSensiResultado] = useState(null);

  const generarSensiIA = (tipo = 'media') => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      const ramBytes = Device.totalMemory;
      const ramGB = ramBytes ? Math.round(ramBytes / (1024 * 1024 * 1024)) : 4;
      const modeloCelular = Device.modelName || "Dispositivo Estándar";
      const marcaCelular = Device.brand || "";
      const esGamaAlta = ramGB >= 6 || marcaCelular.toLowerCase() === 'apple';

      // Base según el tipo de sensibilidad elegida
      let baseGeneral = 170;
      let factorProcesador = esGamaAlta ? 20 : 12;

      if (tipo === 'baja') {
        baseGeneral = Math.floor(120 + (ramGB * 1.5));
        factorProcesador = esGamaAlta ? 25 : 18;
      } else if (tipo === 'media') {
        baseGeneral = Math.floor(165 + (ramGB * 2) + (esGamaAlta ? 5 : 2));
      } else if (tipo === 'alta') {
        baseGeneral = Math.floor(190 + (ramGB * 1.2));
        factorProcesador = esGamaAlta ? 10 : 5;
      }

      const puntoRojo = Math.floor(baseGeneral - 6);
      const mira2 = Math.floor(baseGeneral - factorProcesador);
      const mira4 = Math.floor(baseGeneral - (factorProcesador * 1.3));
      const awm = Math.floor(60 + (ramGB * 2.5));
      const camara360 = Math.floor(baseGeneral - 4);

      let dpiIdeal = 410;
      if (ramGB > 4 && ramGB <= 6) dpiIdeal = 500;
      if (ramGB > 6) dpiIdeal = 560;
      if (marcaCelular.toLowerCase() === 'apple') dpiIdeal = 0;

      // Modificación de DPI según rango
      if (tipo === 'baja' && dpiIdeal > 0) dpiIdeal = Math.floor(dpiIdeal * 0.85);
      if (tipo === 'alta' && dpiIdeal > 0) dpiIdeal = Math.floor(dpiIdeal * 1.25);

      // Ajustar tamaño del botón de disparo sugerido
      let botonSugerido = "53%";
      if (tipo === 'baja') botonSugerido = "58%";
      if (tipo === 'alta') botonSugerido = "45%";

      setSensiResultado({
        tipo: tipo.toUpperCase(),
        general: baseGeneral > 200 ? 200 : baseGeneral,
        puntoRojo: puntoRojo > 200 ? 200 : puntoRojo,
        mira2: mira2 > 200 ? 200 : mira2,
        mira4: mira4 > 200 ? 200 : mira4,
        awm: awm > 200 ? 200 : awm,
        camara360: camara360 > 200 ? 200 : camara360,
        dpi: dpiIdeal === 0 ? "Por Defecto (iOS)" : dpiIdeal,
        botonDisparo: botonSugerido,
        hardwareDetectado: `${marcaCelular} ${modeloCelular} (${ramGB}GB RAM)`
      });
      
      setModalSensi(true);
    } catch (err) {
      console.log("Error en Sensi IA:", err);
    }
  };

  const generarNombresIA = () => {
    if (!inputNombre.trim()) return;
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      const base = inputNombre.trim();
      
      const mapeados = estilosGamer.map(estilo => estilo.replace(/{NAME}/g, base));
      const mezclados = mapeados.sort(() => 0.5 - Math.random()).slice(0, 20);

      setNombresGenerados(mezclados);
    } catch (err) {
      console.log("Error en Nombres IA:", err);
    }
  };

  const copiarAlPortapapeles = (texto) => {
    Clipboard.setString(texto);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const copiarSensiCompleta = () => {
    if (!sensiResultado) return;
    const texto = `⚡ SENSI IA (Optimizado para ${sensiResultado.hardwareDetectado}) ⚡\nGeneral: ${sensiResultado.general}%\nPunto Rojo: ${sensiResultado.puntoRojo}%\nMira x2: ${sensiResultado.mira2}%\nMira x4: ${sensiResultado.mira4}%\nAWM: ${sensiResultado.awm}%\nCámara 360°: ${sensiResultado.camara360}%\nDPI Sugerido: ${sensiResultado.dpi}`;
    copiarAlPortapapeles(texto);
  };

  // Limpiar el estado al cerrar el modal de nombres
  const cerrarModalNombres = () => {
    setModalNombres(false);
    setInputNombre('');
    setNombresGenerados([]);
  };

  return (
    <LinearGradient colors={['#0F0C20', '#05030A']} style={styles.container}>
        <StatusBar style="light" />
        
        {/* Header PRO */}
        <View style={styles.header}>
          <Text style={styles.tituloHeader}>SENSI<Text style={styles.textoRojo}>GAMER</Text></Text>
          <View style={styles.badgePro}>
            <Text style={styles.textoPro}>PRO</Text>
          </View>
          <Text style={styles.subtituloHeader}>Configuraciones de Sensibilidad Perfecta</Text>
        </View>
        
        <View style={styles.contenedorMedio}>
          {/* Tarjeta de Sensibilidad */}
          <TouchableOpacity 
            style={[styles.card, styles.cardSensi]} 
            onPress={() => navigation.navigate('Marcas')}
          >
            <Text style={styles.textoTarjeta}>🎯 Sensibilidad</Text>
          </TouchableOpacity>
          
          {/* Tarjeta de Optimización */}
          <TouchableOpacity 
            style={[styles.card, styles.cardOptimizacion]} 
            onPress={() => navigation.navigate('OptimizacionScreen')}
          >
            <Text style={styles.textoTarjeta}>🚀 Optimización</Text>
          </TouchableOpacity>

          {/* BOTONES DE IA ABAJO */}
          <View style={styles.rowButtonsContainer}>
            <TouchableOpacity style={[styles.iaButton, { borderColor: '#00ffff' }]} onPress={() => generarSensiIA('media')}>
              <Ionicons name="options-outline" size={18} color="#00ffff" />
              <Text style={[styles.iaButtonText, { color: '#00ffff' }]}>SENSI IA</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.iaButton, { borderColor: '#FF4500' }]} 
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setModalNombres(true);
              }}
            >
              <Ionicons name="text-outline" size={18} color="#FF4500" />
              <Text style={[styles.iaButtonText, { color: '#FF4500' }]}>NOMBRES IA</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <Text style={styles.textoAbajo}>DOMINA EL CAMPO DE BATALLA</Text>

        {/* MODAL SENSI IA */}
        <Modal visible={modalSensi} transparent={true} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>⚡ SENSI IA CALCULADA ⚡</Text>
              <Text style={styles.modalHardware}>{sensiResultado?.hardwareDetectado}</Text>
              
              {/* CONFIGURACIÓN DE LOS BOTONES: BAJA, MEDIA Y ALTA INTEGRADOS ACÁ */}
              <View style={{ flexDirection: 'row', backgroundColor: '#2A244D', borderRadius: 10, padding: 4, marginVertical: 12, width: '100%', borderWidth: 1, borderColor: '#3E3475' }}>
                <TouchableOpacity 
                  style={{ flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 8, backgroundColor: sensiResultado?.tipo === 'BAJA' ? '#00ffff' : 'transparent' }} 
                  onPress={() => generarSensiIA('baja')}
                >
                  <Text style={{ color: sensiResultado?.tipo === 'BAJA' ? '#000' : '#aaa', fontWeight: 'bold', fontSize: 12 }}>BAJA</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={{ flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 8, backgroundColor: sensiResultado?.tipo === 'MEDIA' ? '#00ffff' : 'transparent' }} 
                  onPress={() => generarSensiIA('media')}
                >
                  <Text style={{ color: sensiResultado?.tipo === 'MEDIA' ? '#000' : '#aaa', fontWeight: 'bold', fontSize: 12 }}>MEDIA</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={{ flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 8, backgroundColor: sensiResultado?.tipo === 'ALTA' ? '#00ffff' : 'transparent' }} 
                  onPress={() => generarSensiIA('alta')}
                >
                  <Text style={{ color: sensiResultado?.tipo === 'ALTA' ? '#000' : '#aaa', fontWeight: 'bold', fontSize: 12 }}>ALTA</Text>
                </TouchableOpacity>
              </View>

              {sensiResultado && (
                <View style={styles.sensiList}>
                  <Text style={styles.sensiItem}>General: <Text style={styles.sensiVal}>{sensiResultado.general}%</Text></Text>
                  <Text style={styles.sensiItem}>Punto Rojo: <Text style={styles.sensiVal}>{sensiResultado.puntoRojo}%</Text></Text>
                  <Text style={styles.sensiItem}>Mira x2: <Text style={styles.sensiVal}>{sensiResultado.mira2}%</Text></Text>
                  <Text style={styles.sensiItem}>Mira x4: <Text style={styles.sensiVal}>{sensiResultado.mira4}%</Text></Text>
                  <Text style={styles.sensiItem}>Mira AWM: <Text style={styles.sensiVal}>{sensiResultado.awm}%</Text></Text>
                  <Text style={styles.sensiItem}>Cámara 360°: <Text style={styles.sensiVal}>{sensiResultado.camara360}%</Text></Text>
                  <Text style={styles.sensiItem}>DPI Sugerido: <Text style={styles.sensiVal}>{sensiResultado.dpi}</Text></Text>
                  <Text style={styles.sensiItem}>Botón de Disparo: <Text style={[styles.sensiVal, {color: '#00ffff'}]}>{sensiResultado.botonDisparo}</Text></Text>
                </View>
              )}
              <View style={styles.modalActionsRow}>
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#00ffff' }]} onPress={copiarSensiCompleta}>
                  <Text style={[styles.actionBtnText, { color: '#000' }]}>COPIAR SENSI</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#333' }]} onPress={() => setModalSensi(false)}>
                  <Text style={[styles.actionBtnText, { color: '#fff' }]}>CERRAR</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* MODAL NOMBRES */}
        <Modal visible={modalNombres} transparent={true} animationType="fade" onRequestClose={cerrarModalNombres}>
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { maxHeight: '80%' }]}>
              <Text style={styles.modalTitle}>✨ CREADOR DE NOMBRES ✨</Text>
              
              <View style={styles.inputContainerModal}>
                <TextInput
                  style={styles.textInputModal}
                  placeholder="Tu nombre base..."
                  placeholderTextColor="#666"
                  value={inputNombre}
                  onChangeText={setInputNombre}
                />
                <TouchableOpacity 
                  style={[styles.btnGenerarInline, { opacity: inputNombre.trim() ? 1 : 0.5 }]} 
                  onPress={generarNombresIA}
                  disabled={!inputNombre.trim()}
                >
                  <Ionicons name="sparkles" size={16} color="#FFF" />
                  <Text style={styles.btnGenerarInlineText}>CREAR</Text>
                </TouchableOpacity>
              </View>

              <ScrollView style={{ width: '100%', marginVertical: 10 }} showsVerticalScrollIndicator={false}>
                {nombresGenerados.map((item, index) => (
                  <View key={index} style={styles.nombreCard}>
                    <Text style={styles.nombreText}>{item}</Text>
                    <TouchableOpacity style={styles.copyIconBtn} onPress={() => copiarAlPortapapeles(item)}>
                      <Ionicons name="copy-outline" size={18} color="#FF4500" />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>

              <View style={styles.modalActionsRow}>
                {nombresGenerados.length > 0 && (
                  <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#FF4500' }]} onPress={generarNombresIA}>
                    <Text style={[styles.actionBtnText, { color: '#fff' }]}>GENERAR</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#333' }]} onPress={cerrarModalNombres}>
                  <Text style={[styles.actionBtnText, { color: '#fff' }]}>CERRAR</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'space-around', paddingTop: 60 },
  header: { alignItems: 'center' },
  tituloHeader: { fontSize: 34, fontWeight: '900', color: '#FFF', letterSpacing: 2, textTransform: 'uppercase' },
  textoRojo: { color: '#FF4500' },
  badgePro: { backgroundColor: '#FF4500', paddingHorizontal: 10, paddingVertical: 2, borderRadius: 4, marginTop: 5 },
  textoPro: { color: '#FFF', fontSize: 11, fontWeight: 'bold', letterSpacing: 1 },
  subtituloHeader: { fontSize: 14, color: '#7E7A94', marginTop: 12, textAlign: 'center', paddingHorizontal: 20 },
  contenedorMedio: { width: '100%', alignItems: 'center', gap: 15 },
  card: { width: width * 0.85, height: 100, borderRadius: 20, alignItems: 'center', justifyContent: 'center', elevation: 8 },
  cardSensi: { backgroundColor: '#1E1A3A', borderWidth: 2, borderColor: '#FF4500' },
  cardOptimizacion: { backgroundColor: '#1E1A3A', borderWidth: 2, borderColor: '#00ffff' },
  textoTarjeta: { color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' },
  
  inputContainerModal: { 
    width: '100%', 
    marginTop: 15,
    marginBottom: 10,
    flexDirection: 'row',
    backgroundColor: '#2A244D',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#FF4500',
    alignItems: 'center',
    paddingRight: 6
  },
  textInputModal: { 
    flex: 1,
    color: '#fff', 
    paddingVertical: 10, 
    paddingHorizontal: 12, 
    fontSize: 14, 
    textAlign: 'left'
  },
  btnGenerarInline: {
    backgroundColor: '#FF4500',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 4
  },
  btnGenerarInlineText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 11
  },

  rowButtonsContainer: { flexDirection: 'row', justifyContent: 'space-between', width: width * 0.85, gap: 15 },
  iaButton: { flex: 1, backgroundColor: '#1E1A3A', borderRadius: 15, borderWidth: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, gap: 8 },
  iaButtonText: { fontSize: 14, fontWeight: 'bold' },
  textoAbajo: { color: '#555555', fontSize: 14, fontWeight: 'bold', letterSpacing: 1 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { backgroundColor: '#1E1A3A', borderRadius: 20, padding: 20, width: '90%', alignItems: 'center', borderWidth: 2, borderColor: '#2A244D' },
  modalTitle: { color: '#fff', fontSize: 18, fontWeight: '900', marginBottom: 2 },
  modalHardware: { color: '#00ffff', fontSize: 13, fontWeight: 'bold', marginBottom: 15, textTransform: 'uppercase' },
  sensiList: { width: '100%', marginBottom: 15 },
  sensiItem: { color: '#aaa', fontSize: 15, paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#2A244D' },
  sensiVal: { color: '#fff', fontWeight: 'bold' },
  modalActionsRow: { flexDirection: 'row', width: '100%', gap: 10, marginTop: 10 },
  actionBtn: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  actionBtnText: { fontWeight: 'bold', fontSize: 14 },
  nombreCard: { backgroundColor: '#2A244D', paddingVertical: 12, paddingHorizontal: 15, borderRadius: 10, marginVertical: 5, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  nombreText: { color: '#FF4500', fontWeight: 'bold', fontSize: 16, flex: 1 },
  copyIconBtn: { padding: 4 }
});