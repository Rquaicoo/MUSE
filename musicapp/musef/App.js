import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, } from 'react-native';
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

import Startupscreen from './screens/Startupscreen';

import Album from './screens/Album';
import Home from './screens/Home';

import AllPopularArtists from './screens/AllArtists';
import MusicList from './screens/MusicList';
import ArtistPage from './screens/ArtistPage';
import AllNewTrending from './screens/AllNewTrending';


import { AudioProvider } from './screens/AudioProvider';
import  LocalAudio  from './screens/LocalAudio';
import  LocalMusicPlayer  from './screens/LocalMusicPlayer';

import AlbumList from './screens/AlbumList';
import Favourites from './screens/Favourites';
import Playlists from './screens/Playlists';
import FollowedArtists from './screens/FollowedArtists';
import ListenLater from './screens/ListenLater';

import UploadImage from './screens/UploadImage';


import PlaylistContent from './screens/PlaylistContent';


const Stack = createNativeStackNavigator();

/*
<><View>
      <StatusBar barStyle="light-content" />
    </View>
*/

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
             <Stack.Screen name="Startupscreen" component={Startupscreen} options={{
              headerShown: false
            }} />
          
          
            <Stack.Screen name="AllArtists" component={AllPopularArtists} options={{
              headerShown: false
            }} />
            <Stack.Screen name="AllNewTrending" component={AllNewTrending} options={{
              headerShown: false
            }} />
            <Stack.Screen name="ArtistPage" component={ArtistPage} options={{
              headerShown: false
            }} />
            <Stack.Screen name="MusicList" component={MusicList} options={{
              headerShown: false
            }} />
            <Stack.Screen name="Album" component={Album} options={{
              headerShown: false
            }} />


            <Stack.Screen name="Musicplayer" component={Musicplayer} options={{
              headerShown: false
            }} />

            <Stack.Screen name="myprofile" component={myprofile} options={{
              headerShown: false
            }} />

            <Stack.Screen name="LocalAudio" component={LocalAudio} options={{
              headerShown: false
            }} />
            <Stack.Screen name="LocalMusicPlayer" component={LocalMusicPlayer} options={{
              headerShown: false
            }} />
            <Stack.Screen name="AlbumList" component={AlbumList} options={{
              headerShown: false
            }} />
            <Stack.Screen name="Favourites" component={Favourites} options={{
              headerShown: false
            }} />
            <Stack.Screen name="FollowedArtists" component={FollowedArtists} options={{
              headerShown: false
            }} />
            <Stack.Screen name="ListenLater" component={ListenLater} options={{
              headerShown: false
            }} />
            <Stack.Screen name="Playlists" component={Playlists} options={{
              headerShown: false
            }} />

            <Stack.Screen name="UploadImage" component={UploadImage} options={{
                headerShown: false
            }} />

            <Stack.Screen name="PlaylistContent" component={PlaylistContent} options={{

              headerShown: false
            }} />
          </Stack.Navigator>
        </NavigationContainer>
      </AudioProvider>
  );
}

