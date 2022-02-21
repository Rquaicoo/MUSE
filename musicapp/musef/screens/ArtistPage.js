import React, {Component, useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import memoji from '../assets/memoji.png';
import { Feather, AntDesign,Entypo, Ionicons,FontAwesome5, SimpleLineIcons,FontAwesome, MaterialCommunityIcons,MaterialIcons,  } from '@expo/vector-icons';

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

export default function ArtistPage ({route, navigation}) {

    const artiste = route.params.artist;
    console.log(artiste)
    const [artisteMusic, setArtisteMusic] = useState(null);
    const [artisteAlbums, setArtisteAlbums] = useState(null);

    useEffect(() => {
        fetch('https://musebeta.herokuapp.com/museb/artist_content/',{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(artiste)
        })
        .then(response => response.json())
        .then(jsonResponse => 
            {setArtisteMusic(jsonResponse.music);
            setArtisteAlbums(jsonResponse.album);}
        )
        .catch(error => console.log(error))
        
    }, [])


    return (
        <ScrollView style={{display: "flex", backgroundColor: "#141515"}}>
            
           
            <ImageBackground source={{
                      uri: "https://musebeta.herokuapp.com" + artiste.image
                    }} style={{height:500,width:"100%"}}
                    imageStyle={{borderRadius: 25,}} >
            <View  style={styles.headerContainer}>
                <View>
                    <Ionicons name="arrow-back-outline" size={30} color="white"  onPress={() => navigation.goBack()} style={{paddingTop:6,}}/>
                </View>
                
             </View>

            <View>
                <View style={{marginLeft: "5%", marginTop: "70%"}}>
                    <Text style={{fontSize:60,color:'#fff', fontWeight:'bold',}}>{artiste.name}</Text>
                    <Text style={{fontSize:12,color:'#fff', fontWeight:'bold',}}>120 songs</Text>
                </View>
             </View>
             </ImageBackground>
             



            {/* container for songs */}
            <ScrollView>
            
            
            <View>
            <Text style={{fontSize:20,color:'#fff', fontWeight:'bold',marginLeft: "4%", marginTop:10}}>Albums created by {artiste.name}</Text>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {artisteAlbums && (
                    <View style={{flexDirection:'row', marginBottom:20,}}>
                        
                        {artisteAlbums.map((album, index) => (
                    <TouchableOpacity style={styles.albums} key={index} onPress={() => navigation.navigate("Album", {album: album})}>
                    <Image source={{uri: "https://musebeta.herokuapp.com"+album.image}} style={styles.albumimage}/>
                    </TouchableOpacity>
                        ))}
                    </View>
                )}
                </ScrollView>
                </View>     
                    {artisteMusic &&(
                    <View style={{marginLeft: "4%", marginTop: 40}}>
                        <Text style={{fontSize:20,color:'#fff', fontWeight:'bold',marginBottom:10}}>{artiste.name}'s songs</Text>
                        
                        {artisteMusic.map((song, index) => (
                        <TouchableOpacity style={{display: "flex", flex:5, flexDirection: "row", borderColor: "#343547", borderBottomWidth:1, paddingBottom: "5%", marginBottom: "5%"}} key={index} onPress={() =>{updateStreams(song);navigation.navigate("Musicplayer", {artiste: song})}}>
                            <View style={{flex:4, flexDirection: "row"}}>
                                <Image source={{
                                        uri: "https://musebeta.herokuapp.com" + song.image
                                    }} style={{resizeMode: "cover", height: 60, width: 60, borderRadius:16,}} image/>
                                <View style={{marginLeft: "5%"}}>
                                    <Text style={{fontSize:16,color:'#fff', fontWeight:'bold',}}>{song.title}</Text>
                                    <Text style={{fontSize:14,color:'#fff', fontWeight:'200',}}>{song.collaborators}</Text>
                                    <View style={{display: "flex", flexDirection: "row",}} >
                                        <MaterialCommunityIcons name="play-box-multiple-outline" size={11} color="white" />
                                        <Text style={{fontSize:11,color:'#fff', fontWeight:'200',marginLeft: "4%"}}>{song.streams} streams</Text>
                                        <Ionicons name="ios-timer-outline" size={11} color="white" style={{marginLeft: "15%"}} />
                                        <Text style={{fontSize:11,color:'#fff', fontWeight:'200',marginLeft: "4%"}}>3.14</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{justifyContent: "center", flex:1}}>
                                <Feather name="play" size={24} color="white" />
                            </View>
                        </TouchableOpacity>))}
                            </View>)}
                    </ScrollView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        display: "flex",
        flexDirection: "row",
        marginTop: "10%",
        marginLeft: "5%",
    
      },
      headerText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "#fff",
        marginLeft:2,
      },
      image: {
        height: 45,
        width: 45,
        resizeMode: "contain",
        borderRadius: 500,
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
        borderColor: 'white',
       borderWidth: 5,
    },

});