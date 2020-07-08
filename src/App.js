import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';

import Repository from './components/Repository';
import api from './services/api';

export default function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleLikeRepository(id) {
    const { data } = await api.post(`repositories/${id}/like`);

    setRepositories(
      repositories.map((repository) => {
        if (repository.id === id) {
          return data;
        }

        return repository;
      })
    );
  }

  useEffect(() => {
    async function loadRepositories() {
      const { data } = await api.get('repositories');

      setRepositories(data);
    }

    loadRepositories();
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Repositories</Text>
        <FlatList
          data={repositories}
          keyExtractor={(repository) => repository.id}
          renderItem={({ item: repository }) => (
            <Repository repository={repository} onLike={handleLikeRepository} />
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1',
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
