import { useLocalSearchParams, Stack } from 'expo-router';
import { ScrollView, View, Image, Text, StyleSheet, Linking } from 'react-native';

import TitleFavorite from '@/components/title-favorite';
import TitleLogout from '@/components/title-logout';

export default function FilmsScreen() {
  const { author, content, description, publishedAt, title, url, urlToImage } = useLocalSearchParams<{
    author: string;
    content: string,
    description: string,
    publishedAt: string,
    title: string,
    url: string,
    urlToImage: string
  }>();

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{
        title: author || 'News',
        headerRight: () => (
          <View style={styles.titleIcons}>
            <TitleFavorite newsObj={{ author, content, description, publishedAt, title, url, urlToImage }} />
            <TitleLogout />
          </View>
        ),
      }} />
      <ScrollView>
        <View style={styles.center}>
          <Image source={{ uri: urlToImage }} style={styles.imageNews} />
        </View>
        <Text style={styles.title}>Title: {title}</Text>
        <Text style={styles.text}><Text style={styles.boldText}>Author:</Text> {author}</Text>
        <Text style={styles.text}><Text style={styles.boldText}>Content:</Text> {content}</Text>
        <Text style={styles.text}><Text style={styles.boldText}>Description:</Text> {description}</Text>
        <Text style={styles.text}><Text style={styles.boldText}>Published at:</Text> {publishedAt}</Text>
        <Text
          style={styles.link}
          onPress={() => Linking.openURL(url)}
        >
          more details...
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f9f9f9',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageNews: {
    resizeMode: "cover",
    width: 200,
    height: 300,
  },
  title: {
    fontWeight: 'bold',
    margin: 15,
    fontSize: 24,
    textAlign: 'center',
    color: '#333',
  },
  titleIcons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 0,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  text: {
    marginHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
    color: 'black',
  },
  link: {
    marginBottom: 30,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
