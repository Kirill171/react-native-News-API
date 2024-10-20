import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';


export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: styles.tabLabel,
      }}>
      <Tabs.Screen name='index' options={{
        title: 'News',
        tabBarIcon: ({ color }) => (
          <Ionicons name="newspaper-outline" size={24} color={color} />
        ),
      }} />
      <Tabs.Screen name='favorites' options={{
        title: 'Favorites',
        tabBarIcon: ({ color }) => (
          <Ionicons name="heart" size={24} color={color} />
        ),
      }} />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
