import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View,Image, ActivityIndicator, TouchableOpacity, ScrollView} from 'react-native';
import { Feather, AntDesign,Entypo, Ionicons,FontAwesome5, SimpleLineIcons,FontAwesome, MaterialCommunityIcons,MaterialIcons,  } from '@expo/vector-icons';




export default function FollowedArtists({route, navigation}) {

    const {token} = route.params
    const [isLoading, setLoading] = useState(true);
    const [artistes, setArtiste] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/museb/getfollowedartists/' , {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({'user_token': token})
        })
        .then(response => response.json())
        .then(jsonResponse => 
            setArtiste(jsonResponse)
        )
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }, [])
   return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
                        <View  style={styles.headerContainer}>
                            <View>
                                <Text style={styles.headerText}>Your Artists</Text>
                                <View style={{flexDirection: "row",}}>
                                    <Feather name="music" size={18} color="white" />
                                    <Text style={{fontSize:15,color:'white', paddingLeft:10,paddingTop:1,}}>Your Artists</Text>
                                </View>
                            </View>
                    

                            <View style={{marginLeft: "45%", display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <TouchableOpacity style={{borderColor: "#343547", borderWidth: 1, alignContent: "center", justifyContent: "center", padding: 8, borderRadius: 20}}>
                                    <Feather name="search" size={21} color="white" />
                                </TouchableOpacity>
                                <Image source={require('../assets/memoji.png')} style={styles.image} />
                            </View>
                        </View>
                        
                         {/* container for albums */}
                         {isLoading? (
                             <View style={{justifyContent: "center", alignItems: "center"}}>
                         <ActivityIndicator color="#fff" size="large"  style={{alignSelf: "center"}}/>
                         </View>) :
                         (<ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
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
                                </View>
                                </View>))}
                                </View>)}

                </ScrollView>)}

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