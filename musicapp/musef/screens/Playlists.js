import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View,Image, ActivityIndicator, TouchableOpacity, ScrollView} from 'react-native';
import { Feather, AntDesign,Entypo, Ionicons,FontAwesome5, SimpleLineIcons,FontAwesome, MaterialCommunityIcons,MaterialIcons,  } from '@expo/vector-icons';




export default function Playlists({navigation}) {
    const [isLoading, setLoading] = useState(true);
    const [playlists, setPlaylists] = useState(null);
    
  
  
    useEffect(() => {
      //get request to get all the songs
      fetch('http://localhost:8000/museb/playlist/',{
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }})
      .then(response => response.json())
      .then(jsonResponse => 
          setPlaylists(jsonResponse)
      )
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
      
      
    }, [])
  
    return (
      <ScrollView style={styles.container}>
      <View >
          <View  style={styles.headerContainer}>
              <View>
                  <Text style={styles.headerText}>Playlists</Text>
                  <View style={{flexDirection:'row'}}>
                  <MaterialCommunityIcons name="account-music-outline" size={20} color="white" />
                  <Text style={{fontSize:15,color:'white', paddingLeft:10,paddingTop:1,}}>Playlists</Text>
                  </View>
              </View>
              
              <View style={{marginLeft: "53%", display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <TouchableOpacity onPress={() => navigation.navigate("myprofile")} >
                      <Image source={require('../assets/memoji.png')} style={styles.image} />
                      </TouchableOpacity>
              </View>
          </View>
                          
                  {isLoading ? (<ActivityIndicator color="#fff" size="large" />) :
                  (<ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
                  {playlists &&(
                  <View style={{justifyContent: "center", alignItems: "center", flexDirection:'row'}}>
                      {playlists.map((playlist, index) => (
                      <View key={index} onPress={() => navigation.navigate("PlaylistContent", {playlist: playlist})}>
                      <TouchableOpacity style={styles.popularalbums} onPress={() => navigation.navigate("PlaylistContent", {playlist: playlist})}>
                      <Image source={{
                        uri: "http://localhost:8000" + playlist.image
                      }} style={styles.popularimage}/>
                      </TouchableOpacity>
                      <View>
                      <Text style={styles.artistlikes}>{playlist.title}</Text>
                      </View>
                      </View>))}
                      </View>)}
  
                  </ScrollView>)}
                  
  
          </View>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#141515",
      height: "100%",
  
    },
    image: {
      height: 60,
      width: 60,
      resizeMode: "contain",
      borderRadius: 500,
      marginLeft: "10%",
      marginTop: -2,
    },
    
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
  
  
  popularalbums: {
      height:300,
      width:200,
      backgroundColor: '#1e202c',
      marginLeft: 20,
      marginTop: 20,
      borderRadius: 50,
     
  },
  
  followbutton: {
      height:40,
      width:150,
      backgroundColor: '#1E1F1F',
      marginLeft: 20,
      marginTop: 10,
      borderRadius: 50,
      marginBottom:50,
      alignSelf: "center"
     
  },
  popularimage: {
      height:300,
      width:200,
      borderRadius: 25,
  },
  
  
  artistname:{
      fontSize:20,
      paddingLeft:20,
      alignSelf:'center',
      color:'#dbdbdb',
      fontWeight:'bold',
      paddingTop:10,
  
  },
  
  artistlikes:{
      fontSize:17,
      paddingLeft:20,
      alignSelf:'center',
      color:'#949293',
      paddingTop:5,
      
  
  },
    
  });
  