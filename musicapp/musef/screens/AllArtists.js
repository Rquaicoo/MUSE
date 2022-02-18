import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList,ScrollView} from 'react-native';
import { Feather, SimpleLineIcons, Ionicons, MaterialIcons, MaterialCommunityIcons,  } from '@expo/vector-icons';
import doja2 from '../assets/doja2.jpg';
import doja from '../assets/doja.jpg';
import sark from '../assets/sark.jpg';
import arthur from '../assets/arthur.jpg';
import kanye from '../assets/kanye.jpeg';
import adele from '../assets/adele.jpg';

export default function AllPopularArtists({ navigation }) {

  const [isLoading, setLoading] = useState(true);
  const [artistes, setArtiste] = useState(null);


  useEffect(() => {
    //get request to get all the songs
    fetch('https://musebeta.herokuapp.com/museb/artist/',{
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }})
    .then(response => response.json())
    .then(jsonResponse => 
        setArtiste(jsonResponse)
    )
    .catch(error => console.log(error))
    .finally(setLoading(false));
    
  }, [])

  return (
    <ScrollView style={styles.container}>
    <View >
        <View  style={styles.headerContainer}>
            <View>
                <Text style={styles.headerText}>Artists</Text>
                <View style={{flexDirection:'row'}}>
                <MaterialCommunityIcons name="account-music-outline" size={20} color="white" />
                <Text style={{fontSize:15,color:'white', paddingLeft:10,paddingTop:1,}}>783 Artists</Text>
                </View>
            </View>
            
            <View style={{marginLeft: "53%", display: "flex", flexDirection: "row", alignItems: "center"}}>
                  <TouchableOpacity onPress={() => navigation.navigate("myprofile")} >
                    <Image source={require('../assets/memoji.png')} style={styles.image} />
                    </TouchableOpacity>
            </View>
        </View>
                        

                <ScrollView horizontal={true}>
                {artistes &&(
                <View style={{justifyContent: "center", alignItems: "center", flexDirection:'row'}}>
                    {artistes.map((artist, index) => (
                    <View key={index} onPress={() => navigation.navigate("ArtistPage", {artist: artist})}>
                    <TouchableOpacity style={styles.popularalbums} onPress={() => navigation.navigate("ArtistPage", {artist: artist})}>
                    <Image source={{
                      uri: "https://musebeta.herokuapp.com" + artist.image
                    }} style={styles.popularimage}/>
                    </TouchableOpacity>
                    <View>
                    <Text style={styles.artistname}>{artist.name}</Text>
                    <Text style={styles.artistlikes}> 900K Followers</Text>
                    </View>
                    <TouchableOpacity style={styles.followbutton}>
                    <Text style={{color:'white', fontSize:20, fontWeight:'bold',alignSelf:'center',paddingTop:7,}}> Follow </Text>
                    </TouchableOpacity>
                    </View>))}
                    </View>)}

                </ScrollView>

                <ScrollView horizontal={true}>
                {artistes &&(
                <View style={{justifyContent: "center", alignItems: "center", flexDirection:'row'}}>
                    {artistes.map((artist, index) => (
                    <View key={index} onPress={() => navigation.navigate("ArtistPage", {artist: artist})}>
                    <TouchableOpacity style={styles.popularalbums} onPress={() => navigation.navigate("ArtistPage", {artist: artist})}>
                    <Image source={{
                      uri: "https://musebeta.herokuapp.com" + artist.image
                    }} style={styles.popularimage}/>
                    </TouchableOpacity>
                    <View>
                    <Text style={styles.artistname}>{artist.name}</Text>
                    <Text style={styles.artistlikes}> 900K Followers</Text>
                    </View>
                    <TouchableOpacity style={styles.followbutton}>
                    <Text style={{color:'white', fontSize:20, fontWeight:'bold',alignSelf:'center',paddingTop:7,}}> Follow </Text>
                    </TouchableOpacity>
                    </View>))}
                    </View>)}

                </ScrollView>
                

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
