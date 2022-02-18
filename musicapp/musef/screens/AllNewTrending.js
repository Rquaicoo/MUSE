import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View,Image, ImageBackground, TouchableOpacity, ScrollView} from 'react-native';
import { Feather, AntDesign,Entypo, Ionicons,FontAwesome5, SimpleLineIcons,FontAwesome, MaterialCommunityIcons,MaterialIcons,  } from '@expo/vector-icons';


const updateStreams = (music) => {
    fetch('http://localhost:8000/museb/music/',{
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

export default function AllNewTrending({route, navigation}) {

    const {musicType, endpoint} = route.params;
    const [music, setMusic] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/museb/' + endpoint, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(jsonResponse => 
            setMusic(jsonResponse)
        )
        .catch(error => console.log(error))
    }, [])
   return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
                        <View  style={styles.headerContainer}>
                            <View>
                                <Text style={styles.headerText}>{musicType}</Text>
                                <View style={{flexDirection: "row",}}>
                                    <Feather name="music" size={18} color="white" />
                                    <Text style={{fontSize:15,color:'white', paddingLeft:10,paddingTop:1,}}>Songs</Text>
                                </View>
                            </View>
                    

                            <View style={{marginLeft: "45%", display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <TouchableOpacity style={{borderColor: "#343547", borderWidth: 1, alignContent: "center", justifyContent: "center", padding: 8, borderRadius: 20}}>
                                    <Feather name="search" size={21} color="white" />
                                </TouchableOpacity>
                                <Image source={require('../assets/memoji.png')} style={styles.image} />
                            </View>
                        </View>
                        
                         {/* container for songs */}
            {music &&(
            <View style={{marginLeft: "4%", marginTop: 40}}>
                {music.map((song, index) => (
                <TouchableOpacity style={{display: "flex", flexDirection: "row", borderColor: "#343547", borderBottomWidth:1, paddingBottom: "5%", marginBottom: "5%"}} key={index} onPress={() => {updateStreams(song);navigation.navigate("Musicplayer", {artiste: song})}}>
                    <Image source={{
                            uri: "https://musebeta.herokuapp.com" + song.image
                        }} style={{resizeMode: "cover", height: 60, width: 60, borderRadius:15}}/>
                        <View style={{flex:4, flexDirection: "row"}}>
                            <View style={{marginLeft: "5%",flex:3}}>
                                <Text style={{fontSize:16,color:'#fff', fontWeight:'bold',}}>{song.title}</Text>
                                <Text style={{fontSize:14,color:'#fff', fontWeight:'200',}}>{song.collaborators}</Text>
                                <View style={{display: "flex", flexDirection: "row",}} >
                                    <MaterialCommunityIcons name="play-box-multiple-outline" size={11} color="white" />
                                    <Text style={{fontSize:11,color:'#fff', fontWeight:'200',marginLeft: "4%"}}>{song.streams} streams</Text>
                                    <Ionicons name="ios-timer-outline" size={11} color="white" style={{marginLeft: "15%"}} />
                                    <Text style={{fontSize:11,color:'#fff', fontWeight:'200',marginLeft: "4%"}}>3.14</Text>
                                </View>
                            </View>
                            <View style={{justifyContent: "center", flex:1}}>
                                <Feather name="play" size={24} color="white" />
                            </View>
                    </View>
                </TouchableOpacity>))}
            </View>)}

            </ScrollView>
   );
}


const styles = StyleSheet.create({
    container: { backgroundColor: '#141515',
    height: "100%",
    paddingLeft: "1%",
    },
  image: {
      height: 35,
      width: 35,
      resizeMode: "contain",
      borderRadius: 500,
      marginLeft: "20%",
      marginTop: -2,
    },
    headerContainer: {
      display: "flex",
      flexDirection: "row",
      marginTop: "10%",
      marginLeft: "5%"
    },
    headerText: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#fff"
    },

});