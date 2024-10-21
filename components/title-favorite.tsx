import { useAuth } from '@/app/auth/AuthProvider';
import { TouchableOpacity, Image, ActivityIndicator, Modal, View, Text, StyleSheet } from 'react-native';
import { ImageSourcePropType } from 'react-native';
import Parse from '@/config/parseConfig';
import { useEffect, useState, useCallback } from 'react';

const favoriteIcon: ImageSourcePropType = require('@/assets/images/favorite.png');
const favoriteActiveIcon: ImageSourcePropType = require('@/assets/images/favorite-active.png');

interface NewsObjProps {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  title: string;
  url: string;
  urlToImage: string;
}

interface TitleFavoriteProps {
  newsObj: NewsObjProps;
}

export default function TitleFavorite({ newsObj }: TitleFavoriteProps) {
  const { author, content, description, publishedAt, title, url, urlToImage } = newsObj;
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const checkIfFavorite = useCallback(async () => {
    if (!user) return;

    const query = new Parse.Query("Favorites");
    query.equalTo("userId", user.id);
    query.equalTo("title", title);

    try {
      const results = await query.find();
      setIsFavorite(results.length > 0);
    } catch (error) {
      console.error('Ошибка при проверке избранного:', error);
    }
  }, [user, title]);

  useEffect(() => {
    if (user) {
      checkIfFavorite();
    }
  }, [user, checkIfFavorite]);

  const toggleFavorite = async (isAdding: boolean, selectedStatus: string | null) => {
    if (!user) {
      return;
    }

    setLoading(true);
    const Favorite = new Parse.Object("Favorites");

    if (isAdding) {
      Favorite.set("userId", user.id);
      Favorite.set("title", title);
      Favorite.set("author", author);
      Favorite.set("content", content);
      Favorite.set("description", description);
      Favorite.set("publishedAt", publishedAt);
      Favorite.set("url", url);
      Favorite.set("urlToImage", urlToImage);
      Favorite.set("status", selectedStatus);

      try {
        const existingQuery = new Parse.Query("Favorites");
        existingQuery.equalTo("userId", user.id);
        existingQuery.equalTo("title", title);
        const existingResults = await existingQuery.find();

        if (existingResults.length === 0) {
          await Favorite.save();
          setIsFavorite(true);
        }
      } catch (error) {
        console.error('Ошибка при добавлении в избранное:', error);
      }
    } else {
      const query = new Parse.Query("Favorites");
      query.equalTo("userId", user.id);
      query.equalTo("title", title);

      try {
        const results = await query.find();

        if (results.length > 0) {
          await Parse.Object.destroyAll(results);
          setIsFavorite(false);
        }
      } catch (error) {
        console.error('Ошибка при удалении из избранного:', error);
      }
    }

    setLoading(false);
  };

  const handleFavoriteToggle = () => {
    if (loading) return;

    if (isFavorite) {
      toggleFavorite(false, null);
    } else {
      setModalVisible(true);
    }
  };

  const handleStatusSelect = (selectedStatus: string) => {
    setModalVisible(false);
    toggleFavorite(true, selectedStatus);
  };

  return (
    <TouchableOpacity onPress={handleFavoriteToggle} style={{ marginRight: 15 }}>
      {loading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <Image
          style={{ marginRight: 10, width: 24, height: 24 }}
          source={isFavorite ? favoriteActiveIcon : favoriteIcon}
        />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select status</Text>
            <TouchableOpacity style={styles.button} onPress={() => handleStatusSelect('I read')}>
              <Text style={styles.buttonText}>I read</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleStatusSelect('I am reading')}>
              <Text style={styles.buttonText}>I am reading</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleStatusSelect('I want to read')}>
              <Text style={styles.buttonText}>I want to read</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#dc3545',
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
