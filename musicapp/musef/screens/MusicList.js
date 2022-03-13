import React, {Component, useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground, ActivityIndicator} from 'react-native';
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


export default function MusicList ({route, navigation}) {

    const {genre, image} = route.params;
    const [isLoading, setLoading] = useState(true);
    const [music, setMusic] = useState(null);
    const [length, setLength] = useState(0);

    useEffect(() => {
        fetch('https://musebeta.herokuapp.com/museb/genre/',{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({genre:genre})
        })
        .then(response => response.json())
        .then(jsonResponse => 
            {setMusic(jsonResponse);setLength(Object.keys(jsonResponse).length);}
        )
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }, [])


    return (
        <ScrollView style={{display: "flex", backgroundColor: "#141515"}}>
            
            <ImageBackground source={image} style={{height:450,width:"100%",}} imageStyle={{borderRadius: 40,}}>
            <View  style={styles.headerContainer}>
                <View>
                    <Ionicons name="arrow-back-outline" size={30} color="white"  onPress={() => navigation.goBack()} style={{paddingTop:6,}}/>
                </View>
             </View>

            <View>
                <View style={{marginLeft: "5%", marginTop: "60%"}}>
                    <Text style={{fontSize:60,color:'#fff', fontWeight:'bold',}}>{genre}</Text>
                    <Text style={{fontSize:12,color:'#fff', fontWeight:'bold',}}>{length} songs</Text>
                </View>
             </View>
             </ImageBackground>



            {/* container for songs */}
            {isLoading ? (<ActivityIndicator color="#fff" size="large" />) :
            (<View>
                {music &&(
                <View style={{marginLeft: "4%", marginTop: 40}}>
                    {music.map((song, index) => (
                    <TouchableOpacity style={{display: "flex", flexDirection: "row", borderColor: "#343547", borderBottomWidth:1, paddingBottom: "5%", marginBottom: "5%"}} key={index} onPress={() => {updateStreams(song);navigation.navigate("Musicplayer", {artiste: song, playlist: music, index:index})}}>
                        <Image source={{
                                uri: "https://musebeta.herokuapp.com" + song.image
                            }} style={{resizeMode: "cover", height: 60, width: 60, borderRadius:15}}/>
                        <View style={{marginLeft: "5%"}}>
                            <Text style={{fontSize:16,color:'#fff', fontWeight:'bold',}}>{song.title}</Text>
                            <Text style={{fontSize:14,color:'#fff', fontWeight:'200',}}>{song.collaborators}</Text>
                            <View style={{display: "flex", flexDirection: "row",}} >
                                <MaterialCommunityIcons name="play-box-multiple-outline" size={11} color="white" />
                                <Text style={{fontSize:11,color:'#fff', fontWeight:'200',marginLeft: "4%"}}>{song.streams} streams</Text>
                                
                            </View>
                        </View>
                        <View style={{justifyContent: "center", marginLeft: "18%"}}>
                            <Feather name="play" size={24} color="white" />
                        </View>
                    </TouchableOpacity>))}
                </View>)}
            </View>)}
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
        height: 30,
        width: 30,
        resizeMode: "contain",
        borderRadius: 500,
      },

});