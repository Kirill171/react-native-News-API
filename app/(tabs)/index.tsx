import { useEffect, useLayoutEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View, Image } from "react-native";
import { Link, useNavigation } from 'expo-router';
import 'react-native-get-random-values';

import getNews from '@/api';
import Result from '@/interface/ApiResponseInterfaces';
import { useAuth } from '@/app/auth/AuthProvider';
import AuthScreen from '@/app/auth/AuthScreen';
import TitleLogout from '@/components/title-logout';

export default function Index() {
  const { user } = useAuth();
  const [keyword, setKeyword] = useState<string>('');
  const [results, setResults] = useState<Result | null>(null);

  const handleSearch = async () => {
    const fetchedResults = await getNews(keyword);
    setResults(fetchedResults);
  }

  const navigation = useNavigation();
  useLayoutEffect(() => {
    if (user) {
      navigation.setOptions({
        title: 'News',
        headerLeft: () => <></>,
        headerRight: () => <TitleLogout />,
      });
    }
  }, [user, navigation]);

  useEffect(() => {
    if (!user) {
      setResults(null);
      setKeyword('');
    }
  }, [user]);

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <TextInput
            style={styles.textInput}
            placeholder="Search news!"
            onChangeText={setKeyword}
            onSubmitEditing={handleSearch}
          />
          {results ?
            <ScrollView>
              {results.articles.map(article =>
                article.content !== '[Removed]' ? (
                  <View key={article.url} style={styles.cards}>
                    <Image source={{ uri: article.urlToImage }} style={styles.imageFilm} />
                    <Link
                      href={{
                        pathname: '/news/[title]',
                        params: {
                          author: article.author,
                          content: article.content,
                          description: article.description,
                          publishedAt: article.publishedAt,
                          title: article.title,
                          url: article.url,
                          urlToImage: article.urlToImage
                        }
                      }}
                      key={article.url}
                      style={[styles.title, styles.link]}
                    >
                      <Text>{article.title}</Text>
                    </Link>
                    <Text style={styles.text}>Author: {article.author}</Text>
                    <Text style={styles.text}>Description: {article.description}</Text>
                    <Text style={styles.text}>Date of published: {article.publishedAt}</Text>
                  </View>
                ) : null
              )}
            </ScrollView>
            :
            <></>
          }
        </>
      ) : (
        <AuthScreen />
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: '100%',
    backgroundColor: '#fff',
    height: 50,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  cards: {
    margin: 25,
    paddingVertical: 25,
    backgroundColor: '#fff',
    borderRadius: 10,
    // Для iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    // Для Android
    elevation: 6,
  },
  imageFilm: {
    alignSelf: 'center',
    width: 200,
    height: 300
  },
  title: {
    margin: 15,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    marginHorizontal: 20,
    alignSelf: 'flex-start',
    fontSize: 16,
  },
  link: {
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});