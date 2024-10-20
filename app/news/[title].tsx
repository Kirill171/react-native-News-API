import { useLocalSearchParams, Stack, Link } from 'expo-router';
import { ScrollView, View, Image, Text, StyleSheet } from 'react-native';

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
        headerRight: () => (<View style={styles.titleIcons}>
          {/* <TitleFavorite filmId={author} /> */}
          <TitleLogout />
        </View>)
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
        <Text style={styles.text}>
          <Link
            href={url}
            target='_blank'
            style={styles.link}
          >
            Link
          </Link>
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
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  text: {
    marginHorizontal: 10,
    marginBottom: 20,
    alignSelf: 'flex-start',
    fontSize: 16,
    color: 'black',
  },
  link: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
