import { Stack } from 'expo-router'
import { Text, View } from 'react-native'

export default function NotFoundScreen() {
  return (
    <View>
      <Stack.Screen options={{ title: 'Страница не найдена', }} />
      <Text>Эта страница не найдена</Text>
    </View>
  )
}
