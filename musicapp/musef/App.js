import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {  createNativeStackNavigator } from '@react-navigation/native-stack';
import Intro1 from './screens/intro1';
import Intro2 from './screens/intro2';
import Intro3 from './screens/intro3';

import Tabs from './screens/Tabs';

import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import Musicplayer from './screens/Musicplayer';
import myprofile from './screens/myprofile';

import { AudioProvider } from './screens/AudioProvider';
import { LocalAudio } from './screens/LocalAudio';




const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AudioProvider>
    <NavigationContainer>
      <Stack.Navigator>
      
      <Stack.Screen name="Intro1" component={Intro1} options={{
        headerShown: false
      }} />
      <Stack.Screen name="Intro2" component={Intro2} options={{
        headerShown: false
      }} />
      <Stack.Screen name="Intro3" component={Intro3} options={{
        headerShown: false
      }} />
      <Stack.Screen name="SignIn" component={SignIn} options={{
        headerShown: false
      }} />
      <Stack.Screen name="SignUp" component={SignUp} options={{
        headerShown: false
      }} />
      <Stack.Screen name="Tabs" component={Tabs} options={{
        headerShown: false
      }} />
      <Stack.Screen name="Musicplayer" component={Musicplayer} options={{
        headerShown: false
      }} 
      />

      <Stack.Screen name="myprofile" component={myprofile} options={{
        headerShown: false
      }} />
      
      <Stack.Screen name="LocalAudio" component={LocalAudio} options={{
        headerShown: false
      }} />
      </Stack.Navigator>
    </NavigationContainer>
    </AudioProvider>
  );
}

