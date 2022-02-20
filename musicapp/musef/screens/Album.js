import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import memoji from '../assets/memoji.png';
import { Feather, AntDesign,Entypo, Ionicons,FontAwesome5, SimpleLineIcons,FontAwesome, MaterialCommunityIcons,MaterialIcons,  } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


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


export default function Album ({route, navigation}) {
    const {album} =  route.params

    const [music, setMusic] = useState(null);
    const [artiste, setArtiste] = useState(null);

    useEffect(() => {

            fetch('https://musebeta.herokuapp.com/museb/artist/',{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(album.artiste)
            })
            .then(response => response.json())
            .then(responseJson => {
                setArtiste(responseJson["artiste"])})
            .catch(error => console.log(error))
    

            fetch('https://musebeta.herokuapp.com/museb/album/',{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(album)
            })
            .then(response => response.json())
            .then((responseJson) => 
                setMusic(responseJson)
            )
            .catch(error => console.log(error))
    },[])
        return (
            <View style={{display: "flex", backgroundColor: "#151723"}}>
                <LinearGradient
                            colors={['#2b2b2b','#111212']}
                            start={{x: 0, y: 0.1}}
                            end={{x: 0, y: 1}}
                            style={{height: "100%"}}> 
                <View  style={styles.headerContainer}>
                    <View>
                        <Ionicons name="arrow-back-outline" size={30} color="white"  onPress={() => navigation.navigate("Tabs")} style={{paddingTop:6,}}/>
                    </View>
                    
                </View>

                <View>
                    <View style={{height: "60%", width: "90%", marginLeft: "5%", marginTop: "5%"}}>
                        <Image source={{
                            uri: "https://musebeta.herokuapp.com" + album.image
                        }} style={{resizeMode: "cover", height: "90%", width: "90%", alignSelf: "center", borderRadius:20,}} />
                    </View>
                    <View style={{marginLeft: "5%", marginTop: -20}}>
                        <Text style={{fontSize:20,color:'#fff', fontWeight:'bold',}}>{artiste} - {album.title}</Text>
                        <Text style={{fontSize:12,color:'#fff', fontWeight:'bold',}}>Album . 2022</Text>
                    </View>
                </View>
                {/* container for songs */}
                <ScrollView style={{marginLeft: "4%", marginTop: -150}}>
                    {music &&(
                        <View>
                        {music.map((song, index) => (
                    <TouchableOpacity style={{display: "flex", flexDirection: "row", borderColor: "#343547", borderBottomWidth:1, paddingBottom: "5%", marginBottom: "5%"}} key={index} onPress={() =>{updateStreams(song);navigation.navigate("Musicplayer", {artiste: song, playlist: music, index:index})}}>
                        <Image source={{
                            uri: "https://musebeta.herokuapp.com" + song.image
                        }} style={{resizeMode: "cover", height: 60, width: 60, borderRadius:15}}/>
                        <View style={{display: "flex", flex:5, flexDirection: "row"}}>
                            <View style={{marginLeft: "5%", flex:4 }}>
                                <Text style={{fontSize:16,color:'#fff', fontWeight:'bold',}}>{song.title}</Text>
                                <Text style={{fontSize:14,color:'#fff', fontWeight:'200',}}>{song.collaborators}</Text>
                                <View style={{display: "flex", flexDirection: "row",}} >
                                    <MaterialCommunityIcons name="play-box-multiple-outline" size={11} color="white" />
                                    <Text style={{fontSize:11,color:'#fff', fontWeight:'200',marginLeft: "4%"}}>{song.streams} streams</Text>
                                    <Ionicons name="ios-timer-outline" size={11} color="white" style={{marginLeft: "15%"}}/>
                                    <Text style={{fontSize:11,color:'#fff', fontWeight:'200',marginLeft: "4%"}}>3.14</Text>
                                </View>
                            </View>
                            <View style={{justifyContent: "center", flex:1}}>
                                <Feather name="play" size={24} color="white" />
                            </View>
                        </View>
                    </TouchableOpacity>
                        ))}
                    </View>
                    )}
                </ScrollView>
                </LinearGradient>
                
            </View>
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

        borderColor: "#3C3E3E",
      },

});

