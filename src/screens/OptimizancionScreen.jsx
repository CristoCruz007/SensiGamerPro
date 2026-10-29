import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated, Easing, Platform, Vibration, AppState } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import * as Device from 'expo-device'; 

// Importar componentes de anuncios de Google AdMob
import { 
  BannerAd, 
  BannerAdSize, 
  InterstitialAd, 
  AdEventType, 
  TestIds 
} from 'react-native-google-mobile-ads';

// IDs de anuncios (Usa TestIds para pruebas sin riesgo)
const bannerAdUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-tu-id-real/tu-banner-id';
const interstitialAdUnitId = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-tu-id-real/tu-interstitial-id';

// Crear la instancia del anuncio de pantalla completa (intersticial)
const interstitial = InterstitialAd.createForAdRequest(interstitialAdUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

export default function OptimizacionScreen() {
  const ramBytes = Device.totalMemory;
  const totalRam = ramBytes ? Math.round(ramBytes / (1024 * 1024 * 1024)) : 6.0;

  const totalStorage = totalRam > 4 ? 128 : 64; 
  const freeStorage = totalRam > 4 ? 45.2 : 21.8;
  
  const [sistemaLimpio, setSistemaLimpio] = useState(false);
  const [progress] = useState(new Animated.Value(0)); 
  const [rocketAnim] = useState(new Animated.Value(0)); 
  const [percent, setPercent] = useState(0); 
  const [filesDeleted, setFilesDeleted] = useState(0);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('PELIGRO: SISTEMA LENTO');
  const [interstitialLoaded, setInterstitialLoaded] = useState(false);

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    // Escuchar cuando el anuncio de pantalla completa termina de cargar
    const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setInterstitialLoaded(true);
    });

    // Escuchar cuando el usuario cierra el anuncio de pantalla completa
    const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      setInterstitialLoaded(false);
      interstitial.load(); // Precargar el siguiente anuncio automáticamente
    });

    // Cargar el anuncio al iniciar la pantalla
    interstitial.load();

    const subscription = AppState.addEventListener('change', nextAppState => {
      appState.current = nextAppState;
    });

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
      subscription.remove();
    };
  }, []);

  const ramUsada = sistemaLimpio ? totalRam * 0.35 : totalRam * 0.78;
  const storageUsado = sistemaLimpio ? totalStorage - freeStorage - 2.4 : totalStorage - freeStorage;

  const startOptimization = () => {
    if (sistemaLimpio || loading) return; 

    setLoading(true);
    setStatus('ELIMINANDO BASURA ESPACIAL...');
    
    progress.setValue(0);
    rocketAnim.setValue(0);
    setPercent(0);
    setFilesDeleted(0);

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);

    Animated.timing(progress, {
      toValue: 100,
      duration: 6000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      setSistemaLimpio(true); 
      setLoading(false);
      setStatus('¡OPTIMIZADO CON ÉXITO! 🎯');
      
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Animated.spring(rocketAnim, { toValue: -20, friction: 2, useNativeDriver: true }).start();

      // MOSTRAR ANUNCIO DE PANTALLA COMPLETA AL LLEGAR AL 100%
      if (interstitialLoaded) {
        interstitial.show();
      } else {
        interstitial.load();
      }
    });

    let count = 0;
    let files = 0;
    const interval = setInterval(() => {
      count++;
      files += Math.floor(Math.random() * 100) + 20; 
      
      setPercent(count);
      setFilesDeleted(files);

      if (Platform.OS === 'android' && count % 10 === 0) {
        Vibration.vibrate(50);
      }

      if (count >= 100) {
        clearInterval(interval);
      }
    }, 60);

    const rocketLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(rocketAnim, { toValue: -5, duration: 100, easing: Easing.ease, useNativeDriver: true }),
        Animated.timing(rocketAnim, { toValue: 5, duration: 100, easing: Easing.ease, useNativeDriver: true })
      ])
    );
    
    rocketLoop.start();

    setTimeout(() => {
      rocketLoop.stop();
    }, 6000);
  };

  const mainColor = sistemaLimpio ? '#2ed573' : '#ff4500'; 
  const iconName = sistemaLimpio ? 'rocket' : 'warning';

  return (
    <LinearGradient colors={['#0f0f0f', '#1c1c1c']} style={styles.container}>
      <Text style={styles.header}>GAME BOOSTER X</Text>

      <View style={styles.mainCard}>
        <Animated.View style={{ transform: [{ translateY: rocketAnim }] }}>
          <Ionicons name={iconName} size={90} color={mainColor} />
        </Animated.View>

        <Text style={[styles.statusText, { color: mainColor }]}>{status}</Text>

        {loading && (
          <Text style={styles.filesText}>Borrando: {filesDeleted.toLocaleString()} archivos...</Text>
        )}

        {/* FRASE MOTIVADORA CUANDO ESTÁ OPTIMIZADO */}
        {sistemaLimpio ? (
          <Text style={styles.motivationText}>🔥 "El dolor es temporal, dar todo rojo en escuadra es para siempre. ¡A ganar la partida!"</Text>
        ) : (
          <Text style={styles.percentText}>{percent}%</Text>
        )}
      </View>

      <View style={styles.barBackground}>
        <Animated.View
          style={[
            styles.barFill,
            {
              width: progress.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }),
              backgroundColor: mainColor,
            },
          ]}
        />
        <LinearGradient colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0)']} style={styles.barShine} />
      </View>

      <View style={styles.infoContainer}>
        <InfoBox icon="hardware-chip-outline" label="Memoria RAM" value={`${ramUsada.toFixed(1)} / ${totalRam.toFixed(1)} GB`} color="#00d2d3" />
        <InfoBox icon="folder-open-outline" label="Almacenamiento" value={`${storageUsado.toFixed(1)} / ${totalStorage.toFixed(0)} GB`} color="#ff9f43" />
        <InfoBox icon="speedometer-outline" label="Estado CPU" value={sistemaLimpio ? "Frío (Listo)" : "Caliente"} color="#ee5253" />
      </View>

      <TouchableOpacity
        style={[styles.mainButton, { backgroundColor: loading || sistemaLimpio ? '#222' : mainColor }]}
        onPress={startOptimization}
        disabled={loading || sistemaLimpio} 
      >
        <Text style={[styles.buttonText, { color: loading || sistemaLimpio ? '#666' : '#000' }]}>
          {loading ? 'LIMPIEZA EN PROCESO...' : sistemaLimpio ? 'SISTEMA AL 100% (OPTIMIZADO)' : 'INICIAR MISIL DE LIMPIEZA'}
        </Text>
      </TouchableOpacity>

      {/* ANUNCIO BANNER INFERIOR (Estático) */}
      <View style={styles.bannerContainer}>
        <BannerAd
          unitId={bannerAdUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{ requestNonPersonalizedAdsOnly: true }}
        />
      </View>
    </LinearGradient>
  );
}

const InfoBox = ({ icon, label, value, color }) => (
  <View style={styles.infoBox}>
    <Ionicons name={icon} size={24} color={color} />
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  header: { fontSize: 26, fontWeight: '900', color: '#fff', letterSpacing: 1, marginBottom: 15, marginTop: Platform.OS === 'ios' ? 40 : 20 },
  mainCard: { alignItems: 'center', justifyContent: 'center', width: '100%', height: 220, backgroundColor: '#1a1a1a', borderRadius: 20, marginBottom: 20, padding: 15, elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.5, shadowRadius: 10 },
  statusText: { fontSize: 16, fontWeight: 'bold', marginTop: 10, textAlign: 'center' },
  filesText: { color: '#aaa', fontSize: 12, marginTop: 5, fontStyle: 'italic' },
  percentText: { fontSize: 45, fontWeight: '900', color: '#fff', marginTop: 5 },
  motivationText: { color: '#2ed573', fontSize: 12, textAlign: 'center', marginTop: 10, paddingHorizontal: 10, fontWeight: '600', fontStyle: 'italic' },
  barBackground: { width: '100%', height: 15, backgroundColor: '#333', borderRadius: 10, overflow: 'hidden', marginBottom: 25, position: 'relative' },
  barFill: { height: '100%', borderRadius: 10 },
  barShine: { position: 'absolute', top: 0, left: 0, right: 0, height: '50%' },
  infoContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%', marginBottom: 20 },
  infoBox: { backgroundColor: '#1a1a1a', paddingVertical: 15, paddingHorizontal: 10, borderRadius: 15, width: '48%', alignItems: 'center', marginBottom: 15, borderWidth: 1, borderColor: '#333' },
  infoLabel: { color: '#888', fontSize: 11, marginTop: 5, textTransform: 'uppercase' },
  infoValue: { color: '#fff', fontWeight: 'bold', marginTop: 3, fontSize: 13 },
  mainButton: { width: '100%', paddingVertical: 18, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  buttonText: { fontSize: 15, fontWeight: 'bold', letterSpacing: 0.5 },
  bannerContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 15, width: '100%' }
});