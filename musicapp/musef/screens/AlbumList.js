import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator,ScrollView} from 'react-native';
import { Feather, SimpleLineIcons, Ionicons, MaterialIcons, MaterialCommunityIcons,  } from '@expo/vector-icons';


export default function AlbumList({ navigation }) {

  const [isLoading, setLoading] = useState(true);
  const [albums, setAlbums] = useState(null);
  const [artists, setArtists] = useState(null);


  useEffect(() => {
    //get request to get all the songs
    fetch('http://localhost:8000/museb/album/',{
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }})
    .then(response => response.json())
    .then(jsonResponse => 
        setAlbums(jsonResponse)
    )
    .catch(error => console.log(error))
    .finally(() => setLoading(false));

   
        fetch('http://localhost:8000/museb/artist/',{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(responseJson => {
           setArtists(responseJson)}
        )
        .catch(error => console.log(error))
    
    
  }, [])

  return (
    <ScrollView style={styles.container}>
    <View >
        <View  style={styles.headerContainer}>
            <View>
                <Text style={styles.headerText}>Albums</Text>
                <View style={{flexDirection:'row'}}>
                <MaterialCommunityIcons name="account-music-outline" size={20} color="white" />
                <Text style={{fontSize:15,color:'white', paddingLeft:10,paddingTop:1,}}>Albums</Text>
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
                {albums &&(
                <View style={{justifyContent: "center", alignItems: "center", flexDirection:'row'}}>
                    {albums.map((album, index) => (
                    <View key={index} onPress={() => navigation.navigate("Album", {album: album})}>
                    <TouchableOpacity style={styles.popularalbums} onPress={() => navigation.navigate("Album", {album: album})}>
                    <Image source={{
                      uri: "https://musebeta.herokuapp.com" + album.image
                    }} style={styles.popularimage}/>
                    </TouchableOpacity>
                    <View>
                    <Text style={styles.artistname}>{/*artists[(album.artiste)-1].name*/}</Text>
                    <Text style={styles.artistlikes}>{album.title}</Text>
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
