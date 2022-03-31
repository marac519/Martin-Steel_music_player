import AppLoading from 'expo-app-loading';
import { StyleSheet, View, Text } from 'react-native';
import { useFonts, Poppins_500Medium, Poppins_400Regular } from '@expo-google-fonts/poppins';
import React from 'react';
import Home from './Screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from './Screens/Search';


const Stack = createNativeStackNavigator()



export default function App(){
  let [fontsLoaded] = useFonts({ Poppins_500Medium, Poppins_400Regular })

  if (!fontsLoaded) {
    return (
      <AppLoading />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        gestureEnabled:true,
        gestureDirection:'horizontal',
        headerShown: false,
        animation: 'none'
      }} 
      >
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Search' component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}