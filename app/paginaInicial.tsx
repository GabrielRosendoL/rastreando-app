import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useEffect } from 'react';
import { BackHandler, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PaginaInicial() {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    'Quicksand-Medium': require('../assets/fonts/Quicksand-Medium.ttf'),
    'Quicksand-Bold': require('../assets/fonts/Quicksand-Bold.ttf'),
    'Helvetica': require('../assets/fonts/Helvetica.ttf'),
    'Helvetica-Bold': require('../assets/fonts/Helvetica-Bold.ttf'),
    'Helvetica-Light': require('../assets/fonts/Helvetica-Light.ttf'),
  });

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />

      <View style={styles.titleContainer}>
        <Image
          source={require('../assets/images/RastreandoNewLogo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.subcontainer}>
        <LottieView
          source={require('../assets/lottie/logo.json')}
          autoPlay
          loop={true}
          speed={0.6}
          style={styles.lottie}
        />
        <Text style={styles.title}>Bem-vindo(a)!</Text>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/Login/TelaLogin')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push('/Cadastro/TelaCadastro')}>
          <Text style={styles.buttonText}>Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 24,
  },
  subcontainer: {
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#ffffff', // corrigido
  borderRadius: 10,
  // Sombra para iOS
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 12 },
  shadowOpacity: 0.25,
  shadowRadius: 16,
  // Sombra para Android
  elevation: 24,
  borderWidth: 2,
  borderColor: '#3949AB',
},
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 30,
    fontFamily: 'Helvetica-Bold',
  },
  button: {
    backgroundColor: '#ff5721',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
  },
  lottie: {
    width: 300,
    height: 300,
    marginBottom: -100,
    marginTop: -60,
  },
  logoImage: {
    width: 310,
    height: 210,
    alignSelf: 'center',
    marginBottom: -40,
  },
  titleRastreando: {
  fontSize: 35,
  color: '#FFFFFF',
  fontFamily: 'Helvetica-Light',
  backgroundColor: '#ff5721',
  borderRadius: 10,
  paddingHorizontal: 25,
  paddingVertical: 5,
  textAlign: 'center',
  lineHeight: 70,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 1,
  shadowRadius: 30,
  elevation: 10,
  },
  subtitle: {
    fontSize: 25,
    color: '#f9dd0bff',
    fontFamily: 'Helvetica',
    marginBottom: 10,
    marginTop: 10,
  },
});
