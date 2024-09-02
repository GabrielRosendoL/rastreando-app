import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../config/firebase-config'; // Corrigido para importar `db`

export default function TelaLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false); // Estado para o spinner
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true); // Iniciar o spinner

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      // Obtendo o documento do usuário
      const userRef = doc(db, 'usuarios', user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const tipoUsuario = userData.tipoUsuario;

        if (tipoUsuario === 'populacao') {
          router.push('/TelaDeHomeUsuario'); // Redirecionar para a tela de home do usuário
        } else if (tipoUsuario === 'saude') {
          router.push('/TelaDeHomeProfissional' as any); // Redirecionar para a tela de home do profissional
        } else {
          Alert.alert('Erro', 'Tipo de usuário desconhecido.');
        }
      } else {
        Alert.alert('Erro', 'Documento do usuário não encontrado.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Falha ao realizar login. Verifique suas credenciais e tente novamente.');
    } finally {
      setLoading(false); // Parar o spinner
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#AAA"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#AAA"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color="#FF5722" /> // Spinner de carregamento
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1A237E', // Azul escuro
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 30,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 18,
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#3949AB',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
