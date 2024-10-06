import { useLocalSearchParams } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { db } from '../../../config/firebase-config'; // Certifique-se de que o caminho para seu arquivo firebase está correto

const SinaisAlarmeFatoresRisco: React.FC = () => {
  const { sexo, neoplasia } = useLocalSearchParams(); // Pegando os parâmetros dinâmicos
  const [sinaisFatores, setSinaisFatores] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSinaisFatores = async () => {
      try {
        const combinacao = `${sexo}_${neoplasia}`.toLowerCase(); // Converter para minúsculas
        console.log(`Buscando dados para combinação: ${combinacao}`);

        const sintomasAgrupados: any[] = [];

        // 1. Buscar IDs dos administradores
        const adminSnapshot = await getDocs(collection(db, 'administradores'));
        const adminIds = adminSnapshot.docs.map(doc => doc.id); // Extrair os IDs dos administradores

        // 2. Para cada administrador, buscar os sinais de alarme e fatores de risco na subcoleção 'combinacoes'
        for (const adminId of adminIds) {
          console.log(`Verificando dados para administrador: ${adminId}`);
          const combinacoesRef = collection(db, `sinaisAlarmeFatoresRisco/${adminId}/combinacoes`);
          const querySnapshot = await getDocs(combinacoesRef);
          
          querySnapshot.forEach((doc) => {
            if (doc.id.toLowerCase() === combinacao) { // Verifica se a combinação é a correta
              console.log(`Dados encontrados para combinação: ${combinacao}`);
              const data = doc.data();
              sintomasAgrupados.push({
                adminId: adminId, // Adiciona o ID do administrador para referência
                id: doc.id,       // ID da combinação (ex: 'homem_pulmao')
                sinais: data.sintomas || [],  // Assumindo que o campo é 'sintomas'
              });
            }
          });
        }

        // 3. Atualizar o estado com todos os sinais de alarme e fatores de risco
        setSinaisFatores(sintomasAgrupados);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar sinais de alarme e fatores de risco:', error);
        setLoading(false);
      }
    };

    if (sexo && neoplasia) {
      fetchSinaisFatores();
    }
  }, [sexo, neoplasia]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />

      <Text style={styles.title}>Sinais de Alarme e Fatores de Risco</Text>
      <FlatList
        data={sinaisFatores}
        keyExtractor={(item) => item.adminId + item.id} // Usando o adminId + id da combinação como chave única
        renderItem={({ item }) => (
          <View>
            {item.sinais.map((sinal: any, index: number) => (
              <View key={index} style={styles.item}>
                <Image
                  source={{ uri: sinal.imagem }} // Assumindo que 'imagem' é o campo com o link para o Storage
                  style={styles.image}
                  resizeMode="cover"
                />
                <Text style={styles.description}>{sinal.descricao}</Text>
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#232d97',  // Mesma cor de fundo
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',  // Cor branca como no título anterior
    marginBottom: 20,
    fontFamily: 'Quicksand-Bold',  // Fonte personalizada
  },
  item: {
    backgroundColor: '#3949AB',  // Mesma cor dos botões
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',  // Centralizando o conteúdo
  },
  image: {
    width: '100%',
    height: 200,  // Ajuste de altura da imagem
    borderRadius: 10,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',  // Texto em branco para a descrição
    fontFamily: 'Quicksand-Medium',  // Fonte personalizada
    textAlign: 'center',
  },
});

export default SinaisAlarmeFatoresRisco;
