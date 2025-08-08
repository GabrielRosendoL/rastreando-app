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
          <Text style={styles.buttonText}>Ir para Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonCad} onPress={() => router.push('/Cadastro/TelaCadastro')}>
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
    backgroundColor: 'white',
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
  backgroundColor: 'white', // corrigido
  borderRadius: 10,
  // Sombra para iOS
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 12 },
  shadowOpacity: 0.25,
  shadowRadius: 16,
  // Sombra para Android
  elevation: 24,
  borderWidth: 2,
  borderColor: '#a4a4a4ff',
  paddingBottom: 20
},
  title: {
    fontSize: 18,
    color: '#3949AB',
    marginBottom: 30,
    fontFamily: 'Quicksand-Bold',
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
  buttonCad: {
    backgroundColor: '#3949AB',
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
    fontSize: 16,
    fontFamily: 'Quicksand-Bold',
  },
  lottie: {
    width: 300,
    height: 300,
    marginBottom: -90,
    marginTop: -60,
  },
  logoImage: {
    width: 410,
    height: 310,
    alignSelf: 'center',
    marginBottom: -80,
    marginTop: -100,
  },
  titleRastreando: {
  fontSize: 35,
  color: '#FFFFFF',
  fontFamily: 'Quicksand-Bold',
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
    fontFamily: 'Quicksand-Bold',
    marginBottom: 10,
    marginTop: 10,
  },
});
