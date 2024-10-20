import React, { useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Register from '@/app/auth/register';
import Login from '@/app/auth/login';
import { useNavigation } from 'expo-router';

export default function AuthScreen() {
  const [showLogin, setShowLogin] = useState(true);

  const navigation = useNavigation();
  useLayoutEffect(() => {
    {
      showLogin ?
        navigation.setOptions({
          title: "Sign in",
          headerRight: () => <></>,
        })
        :
        navigation.setOptions({
          title: 'Sign up',
          headerRight: () => <></>,
        })
    }
  }, [showLogin, navigation]);

  return (
    <View style={styles.container}>
      {showLogin ? <Login /> : <Register />}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowLogin(!showLogin)}
      >
        <Text style={styles.buttonText}>
          {showLogin ? "Go to sign up" : "Go to sign in"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  button: {
    width: '90%',
    height: 60,
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    backgroundColor: '#007BFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
