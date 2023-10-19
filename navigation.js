import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native'
import React from 'react'
import Home from './screens/Home';
import Movie from './screens/MovieScreen';
import PersonScreen from './screens/PersonScreen';
import Search from './screens/Search';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home"   options={{headerShown: false}} component={Home} />
        <Stack.Screen name="Movie"  options={{headerShown: false}} component={Movie} />
        <Stack.Screen name="Person" options={{headerShown: false}} component={PersonScreen} />
        <Stack.Screen name="Search" options={{headerShown: false}} component={Search} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation