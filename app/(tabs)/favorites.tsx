import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity, Alert } from 'react-native';
import { Link } from 'expo-router';

import Parse from '@/config/parseConfig';
import { useAuth } from '@/app/auth/AuthProvider';
import { useFocusEffect } from '@react-navigation/native';

export default function Favorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchFavorites = async () => {
        setLoading(true);
        if (!user) {
          setLoading(false);
          return;
        }

        const query = new Parse.Query('Favorites');
        query.equalTo('userId', user.id);

        try {
          const results = await query.find();

          const favoritesWithDetails = results.map((favorite) => ({
            author: favorite.get('author'),
            content: favorite.get('content'),
            description: favorite.get('description'),
            publishedAt: favorite.get('publishedAt'),
            title: favorite.get('title'),
            url: favorite.get('url'),
            urlToImage: favorite.get('urlToImage'),
            status: favorite.get('status'),
          }));

          setFavorites(favoritesWithDetails);
        } catch (error) {
          console.error('Ошибка при загрузке избранного:', error);
          Alert.alert('Ошибка', 'Не удалось загрузить избранные фильмы.');
        } finally {
          setLoading(false);
        }
      };

      fetchFavorites();
    }, [user])
  );

  const removeFromFavorites = async (url: string) => {
    if (!user) return;

    const query = new Parse.Query('Favorites');
    query.equalTo('userId', user.id);
    query.equalTo('url', url);

    try {
      const results = await query.find();
      if (results.length === 0) {
        Alert.alert('Ошибка', 'Фильм не найден в избранном.');
        return;
      }

      await Parse.Object.destroyAll(results);
      setFavorites((prev) => prev.filter((film) => film.url !== url));
      Alert.alert('Success', 'Movie removed from favorites');
    } catch (error) {
      console.error('Ошибка при удалении из избранного:', error);
      Alert.alert('Ошибка', 'Не удалось удалить фильм из избранного.');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="black" style={styles.loading} />;
  }

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>Your favorites list is empty.</Text>
      ) : (
        favorites.map((news) => (
          <View key={news.url} style={styles.card}>
            <Image source={{ uri: news.urlToImage }} style={styles.image} />
            <View style={styles.details}>
              <TouchableOpacity style={styles.link}>
                <Link
                  href={{
                    pathname: '/news/[title]',
                    params: {
                      author: news.author,
                      content: news.content,
                      description: news.description,
                      publishedAt: news.publishedAt,
                      title: news.title,
                      url: news.url,
                      urlToImage: news.urlToImage,
                    }
                  }}
                  style={[styles.title, styles.link]}
                >
                  <Text style={styles.title}>{news.title}</Text>
                </Link>
              </TouchableOpacity>
              <View style={styles.statusContainer}>
                <Text style={styles.status}>Status: {news.status}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => removeFromFavorites(news.url)} style={styles.removeButton}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f9f9f9',
    padding: 10,
  },
  loading: {
    margin: 50,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'black',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    width: '100%',
    height: 150,
  },
  image: {
    width: 80,
    height: 120,
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  details: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  statusContainer: {
    flex: 1,
    width: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  removeButton: {
    height: 50,
    alignSelf: 'center',
    padding: 25,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff4444',
    borderRadius: 5,
    paddingVertical: 4,
  },
  removeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  link: {
    justifyContent: 'flex-start',
    textAlign: 'center',
  },
});
