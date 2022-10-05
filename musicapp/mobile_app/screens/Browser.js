import {React, useEffect, useState} from 'react';
import { StyleSheet, Text, View,Image, ImageBackground, TouchableOpacity, ScrollView, StatusBar, ActivityIndicator} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import rad from '../assets/rad.jpg';
import { Octicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const updateStreams = (music) => {
    fetch('https://musebeta.herokuapp.com/museb/music/',{
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
    body: JSON.stringify(music)})
    .then(response => response.json())
    .then(jsonResponse => 
        console.log(jsonResponse))
    .catch(error => console.log(error))
}



export default function Browser ({navigation}) {

    const [isMusicLoading, setMusicLoading] = useState(true);
    const [isAlbumLoading, setAlbumLoading] = useState(true);

    const [albums, setAlbum] = useState(null);

    const [music, setMusic] = useState(null);

    

    useEffect(() => {
        //get request to get all the songs
        
        fetch('https://musebeta.herokuapp.com/museb/album/',{
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }})
        .then(response => response.json())
        .then(jsonResponse => 
            setAlbum(jsonResponse))
        .catch(error => console.log(error))
        .finally(() => setAlbumLoading(false));

        fetch('https://musebeta.herokuapp.com/museb/music/',{
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            }})
        .then(response => response.json())
        .then(jsonResponse => 
            setMusic(jsonResponse))
        .catch(error => console.log(error))
        .finally(() => setMusicLoading(false));
        
    }, [])

        return (
            <ScrollView style={styles.container}  showsVerticalScrollIndicator={false} > 
            <StatusBar barStyle="light-content" />
                <View >
                        <Text style={{fontWeight:'bold', fontSize:45, alignSelf:'center',color:'white',marginTop:35,}}> muse.</Text>
                    <TouchableOpacity style={styles.header}>
                    <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <TouchableOpacity style={styles.headercontent} onPress={() => {navigation.navigate("AllNewTrending", {musicType: "All", endpoint: 'music/'})}}>
                        <Text style={{color:'white', fontSize:20,fontWeight: 'bold', paddingTop:13, paddingLeft:37,}}> All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headercontent} onPress={() => {navigation.navigate("AllNewTrending", {musicType: "New", endpoint: 'new/'})}}>
                    <Text style={{color:'white', fontSize:20,fontWeight: 'bold', paddingTop:13, paddingLeft:30,}}> New</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headercontent} onPress={() => {navigation.navigate("AllNewTrending", {musicType: "Trending", endpoint: 'trending/'})}}>
                    <Text style={{color:'white', fontSize:20,fontWeight: 'bold', paddingTop:13, paddingLeft:10,}}> Trending</Text>
                    </TouchableOpacity>
                </View>
                    
                </TouchableOpacity>

                {/* Trending Music */}
            <Text style={{color:'white',fontSize:25,paddingLeft:'5%', paddingTop:'2%'}}> 
            <Text style={{color:'white',fontWeight:'bold'}} >
                Trending</Text> Music </Text>
                <View>
                {isMusicLoading ? (<ActivityIndicator color="#fff" size="large" />) :
                (<ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={{flexDirection:'row', flexWrap: "wrap"}}>
                    {music &&(

                    <View style={{flexDirection: "row", flexWrap: "wrap"}}>
                        {music.map((artiste, index) => (
                    <TouchableOpacity key={index} onPress={() => {updateStreams(artiste);navigation.navigate("Musicplayer", {artiste: artiste, playlist: music, index:index})}}  style={styles.musiccontent}>
                    <Image source={{uri: "https://musebeta.herokuapp.com"+artiste.image}} style={styles.smallimage}/>
                    </TouchableOpacity>))}
                    </View>
                    )}          
                      
                    </View>
                </ScrollView>)}
                </View>

                {/* Live Radio */}
                <View style={{flexDirection:'row', }}>
                <Text style={{color:'white',fontSize:25,paddingLeft:'5%', paddingTop:20,}}> 
                 <Text style={{color:'white',fontWeight:'bold'}} >
                Live</Text> Radio </Text>
                <Octicons name="radio-tower" size={24} color="white"  style={{paddingTop:23, paddingLeft:7,}}/>
                </View>
                
                <TouchableOpacity style={{width:'90%', backgroundColor:'#1e202c', height: '6%',
                 marginLeft:'5%', borderRadius:35, marginTop:20,}}>
                     
                     <ImageBackground source={rad} style={{width:'100%', height:'100%', marginRight:20,borderRadius:20, opacity:1,}}>
                     <View style={{flexDirection:'row'}}>
                     <Text style={{position:'absolute', fontSize:25, fontWeight: 'bold', color:'white', paddingTop:10, paddingLeft:120,color:'white', }}> 
                     Listen Now</Text>
                     
                     </View>
                     </ImageBackground>
                 </TouchableOpacity>

                {/* Latest albums */}
                 <Text style={{color:'white',fontSize:25,paddingLeft:'5%', paddingTop:20,}}> 
                 <Text style={{color:'white',fontWeight:'bold'}} >
                Latest </Text> Albums </Text>
                
                <View>
                    { isAlbumLoading ? (<ActivityIndicator color="#fff" size="large" style={{marginBottom: 100}} />) :
                    (
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {albums && (
                    <View style={{flexDirection:'row', marginBottom:200,}}>
                        
                        {albums.map((album, index) => (
                    <TouchableOpacity style={styles.albums} key={index} onPress={() => navigation.navigate("Album", {album: album})}>
                    <Image source={{uri: "https://musebeta.herokuapp.com"+album.image}} style={styles.albumimage}/>
                    </TouchableOpacity>
                        ))}
                    </View>
                )}
                </ScrollView>
                    )}
                </View>                
            </View>
            </ScrollView>
            
      
      
       
       
   );
}


const styles = StyleSheet.create({

    container: {
    backgroundColor: '#141515',
    height: "100%",
},

    header: {
        flexDirection: 'row',
        backgroundColor: '#141515',
        height: "7%",
        width: "90%",
        borderRadius:15,
        marginTop: "2%",
        alignSelf: "center",
    },
    headercontent: {
        height:'70%',
        width:'30%',
        backgroundColor: '#282A2A',
        marginLeft: '2%',
        borderRadius: 15,
        alignSelf: "center",
        
    },
    mainimage: {
        height:hp('30%'),
        width:wp('65%'),
        borderRadius: 25,

    },

    smallimage: {
        height:hp('30%'),
        width:wp('65%'),
        borderRadius: 25,
    },

    music: {
    flexDirection:'row', 
    },

    musiccontent: {
        height:hp('30%'),
        width:wp('65%'),
        backgroundColor: '#1e202c',
        marginLeft: 20,
        marginTop: 20,
        borderRadius: 25,
    },
    albums: {
        height:170,
        width:170,
        backgroundColor: '#1e202c',
        marginLeft: 20,
        marginTop: 20,
        borderRadius: 100,
       
    },
    albumimage: {
        height:170,
        width:170,
        borderRadius: 100,
        borderColor: '#3C3E3E',
       borderWidth: 5,
    },

    albumimage1: {
        height:170,
        width:170,
        borderRadius: 100,
        borderColor: 'white',
       borderWidth: 5,
    },
    albumimage2: {
        height:170,
        width:170,
        borderRadius: 100,
        borderColor: '#d9ab93',
       borderWidth: 5,
    },
    
    albumimage3: {
        height:170,
        width:170,
        borderRadius: 100,
        borderColor: '#ff4d99',
       borderWidth: 5,
    },
    musiccontentsmall:{
        height:125,
        width:125,
        borderRadius: 20,
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 5,
        backgroundColor: '#1e202c',
       
    },

});