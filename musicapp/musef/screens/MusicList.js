import React, {Component, useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import memoji from '../assets/memoji.png';
import { Feather, AntDesign,Entypo, Ionicons,FontAwesome5, SimpleLineIcons,FontAwesome, MaterialCommunityIcons,MaterialIcons,  } from '@expo/vector-icons';

export default function MusicList ({route, navigation}) {

    const {genre, image} = route.params;
    const [music, setMusic] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/museb/genre/',{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({genre:genre})
        })
        .then(response => response.json())
        .then(jsonResponse => 
            setMusic(jsonResponse)
        )
        .catch(error => console.log(error))
        .finally();
    }, [])


    return (
        <ScrollView style={{display: "flex", backgroundColor: "#151723"}}>
            
            <ImageBackground source={image} style={{height:400,width:"100%",borderRadius: 40,}}>
            <View  style={styles.headerContainer}>
                <View>
                    <Ionicons name="arrow-back-outline" size={30} color="white"  onPress={() => navigation.navigate("Home")} style={{paddingTop:6,}}/>
                </View>
                
                <View style={{marginLeft: "67%", display: "flex", }}>
                    <TouchableOpacity style={{borderColor: "#fff", borderWidth: 1, alignContent: "center", justifyContent: "center", padding: 4, borderRadius: 1000}} onPress={() => navigation.navigate("myprofile")}>
                        <Image source={require('../assets/memoji.png')} style={styles.image} />
                    </TouchableOpacity>
                </View>
             </View>

            <View>
                <View style={{marginLeft: "5%", marginTop: "40%"}}>
                    <Text style={{fontSize:60,color:'#fff', fontWeight:'bold',}}>Pop</Text>
                    <Text style={{fontSize:12,color:'#fff', fontWeight:'bold',}}>120 songs</Text>
                </View>
             </View>
             </ImageBackground>



            {/* container for songs */}
            {music &&(
            <View style={{marginLeft: "4%", marginTop: 40}}>
                {music.map((song, index) => (
                <TouchableOpacity style={{display: "flex", flexDirection: "row", borderColor: "#343547", borderBottomWidth:1, paddingBottom: "5%", marginBottom: "5%"}} key={index}>
                    <Image source={{
                            uri: "http://localhost:8000" + song.image
                        }} style={{resizeMode: "cover", height: 55, width: 45}}/>
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
                    <View style={{justifyContent: "center", marginLeft: "18%"}}>
                        <Feather name="play" size={24} color="white" />
                    </View>
                </TouchableOpacity>))}
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
        height: 45,
        width: 45,
        resizeMode: "contain",
        borderRadius: 500,
      },

});