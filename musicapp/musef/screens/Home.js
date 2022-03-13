import React, {useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Image,Modal, TouchableOpacity, TouchableWithoutFeedback, ImageBackground,ScrollView} from 'react-native';
import { Feather, Octicons, Ionicons, FontAwesome, MaterialCommunityIcons,  } from '@expo/vector-icons';
import doja2 from '../assets/doja2.jpg';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MiniPlayer from './MiniPlayer';
import { SharedElement } from 'react-navigation-shared-element';
import {
  SharedElementTransition,
  nodeFromRef
} from 'react-native-shared-element';

export default function Home({ navigation }) {
 
  const [isLoading, setLoading] = useState(true);
  const [artistes, setArtiste] = useState(null);
  const [popularArtistes, setPopularArtistes] = useState(null);

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
        setArtiste(jsonResponse.slice(3,7))
    )
    .catch(error => console.log(error))
    

    fetch('https://musebeta.herokuapp.com/museb/popular_artists/',{
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }})
    .then(response => response.json())
    .then(jsonResponse => 
        setPopularArtistes(jsonResponse)
    )
    .catch(error => console.log(error))
  }, [])


  return (
    <View style={styles.container}>
    <View style={{flex: 1}}>
      {/* Title */}
        <View  style={styles.headerContainer}>
            <View>
              <TouchableOpacity  onPress={() => navigation.push("Tabs")} >
              <Text style={styles.headerText}>muse.</Text>
              </TouchableOpacity>
            </View>
            
            {/* Profile */}
            <View style={{marginLeft: "50%", display: "flex", flexDirection: "row", alignItems: "center"}}>
                <TouchableOpacity style={{borderColor: "#343547", borderWidth: 1, alignContent: "center", justifyContent: "center", padding: 8, borderRadius: 20}}>
                    <Octicons name="radio-tower" size={15} color="white" />
                  </TouchableOpacity >
                  <TouchableOpacity onPress={() => navigation.navigate("myprofile")} >
                    <Image source={require('../assets/memoji.png')} style={styles.image} />
                    </TouchableOpacity>
            </View>
        </View>

        {/* Search bar */}
            <TouchableOpacity style={styles.headercontent} >
                  <View style={{flexDirection: "row"}}> 
                   {/*<Feather name="search" size={26} color="white" style={{paddingTop:17,paddingLeft:20,}}/>
                    <TextInput placeholder='Search Music'
                    placeholderTextColor="#ffffff"
                    style={{paddingTop:18, paddingLeft:10, width:'73%',color:'white',}}

               />  */}
                    <Octicons name="settings" size={26} color="white" style={{paddingTop:17, paddingLeft:10,}}/>
                   </View>  
             </TouchableOpacity>

        <ScrollView >
        {/* Artist Image */}
        <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={styles.musiccontent}>
            <ImageBackground source={doja2} style={styles.mainimage}>
            <Text style={styles.imageText}>Doja Cat</Text>
            <View style={{flexDirection:'row', alignSelf:'center'}}>
           
            <Text style={styles.imageText2}>734.1K</Text>
            </View>
            </ImageBackground>
            </TouchableOpacity>
        </View>

    {/* Popular Artists */}
        <View >
        <View style={{flexDirection:'row', marginTop:15,}} >
        <Text style={{color:'white',fontSize:25,paddingLeft:'5%', paddingTop:20,}}> 
                 <Text style={{color:'white',fontWeight:'bold'}} >
                Hot </Text> Music </Text>
                <Text style={{fontSize:17,color:'pink', fontWeight:'bold',paddingLeft:210,paddingTop:25,}} onPress={() => navigation.navigate("AllArtists")}>See all</Text>
                </View>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                {popularArtistes &&(
                 <View style={{flexDirection:'row'}} >
                   {popularArtistes.map((artist, index) => (
                    <View key={index}>
                    <TouchableOpacity style={styles.popularalbums} onPress={() => navigation.navigate("ArtistPage", {artist: artist})}>
                    <Image source={{
                      uri: "https://musebeta.herokuapp.com" + artist.image
                    }} style={styles.popularimage}/>
                    </TouchableOpacity>
                    <View>
                    <Text style={styles.artistname}>{artist.name}</Text>
                    </View>
                    <TouchableOpacity style={styles.followbutton}>
                    <Text style={{color:'white', fontSize:20, fontWeight:'bold',alignSelf:'center',paddingTop:7,}}> Follow </Text>
                    </TouchableOpacity>
                    </View>))}

                 </View>)}
                </ScrollView>


        </View>
    </ScrollView>
      
    {/* Music Player */}
    {/*<View style={{height: "12%", borderTopLeftRadius: 10,  borderTopRightRadius: 10}}>
      <MiniPlayer style={{borderTopLeftRadius: 10,  borderTopRightRadius: 10}} />
   </View>*/}
    </View>
    </View>
  )};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#141515",
    height: "100%",
    flex: 1,


  },
  image: {
    height: 35,
    width: 35,
    resizeMode: "contain",
    borderRadius: 500,
    marginLeft: "17%",
    marginTop: -2,
  },
  
  modalimage: {
    height: 55,
    width: 55,
    borderRadius: 500,
    marginLeft:10,
  },

  modal: {
    position: "absolute",
    height: "11%",
    backgroundColor:'#282A2A',
   borderTopLeftRadius:30,
   borderTopRightRadius:30,
    marginBottom:'5%',
    top: "90%",
    width: "100%",
    
  },
  modaltext: {
     fontSize:23,
     fontWeight: 'bold', 
     color:'white',
     paddingLeft:9,
  },

  headercontent: {
    height:60,
    width:'90%',
    backgroundColor: '#282A2A',
    marginTop:20,
    borderRadius: 25,
    alignSelf: "center",
},

  headerContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: "10%",
    marginLeft: "5%",
  },
  headerText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
    marginLeft:2,
  },
  imageText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    marginTop:360,
    alignSelf: "center",
  },
  imageText2: {
    fontSize: 40,
    fontWeight:'bold',
    color: "grey",
    marginTop:3,
    paddingLeft:10,
    alignSelf: "center",
  },

  mainimage: {
    height:450,
    width:'100%',
    borderRadius: 40,
    overflow: 'hidden',
},
musiccontent: {
    height:450,
    width:wp('90%'),
    backgroundColor: '#1e202c',
    marginLeft: 20,
    marginTop: 20,
    borderRadius: 40,
},
  
albums: {
    height:100,
    width:100,
    backgroundColor: '#1e202c',
    marginLeft: 20,
    marginTop: 20,
    borderRadius: 100,
   
},
albumimage: {
    height:100,
    width:100,
    borderRadius: 100,
    borderColor: '#343547',
   borderWidth: 5,
},

albumimage1: {
    height:100,
    width:100,
    borderRadius: 100,
    borderColor: '#343547',
   borderWidth: 5,
},
albumimage2: {
    height:100,
    width:100,
    borderRadius: 100,
    borderColor: '#343547',
   borderWidth: 5,
},

albumimage3: {
    height:100,
    width:100,
    borderRadius: 100,
    borderColor: '#ff4d99',
   borderWidth: 5,
},

popularalbums: {
    height:150,
    width:150,
    backgroundColor: '#1e202c',
    marginLeft: 20,
    marginTop: 20,
    borderRadius: 100,
   
},

followbutton: {
    height:40,
    width:150,
    backgroundColor: '#1E1F1F',
    marginLeft: 20,
    marginTop: 10,
    borderRadius: 50,
    marginBottom:50,
   
},
popularimage: {
    height:150,
    width:150,
    borderRadius: 30,
},

popularimage1: {
    height:150,
    width:150,
    borderRadius: 30,
  
},
popularimage2: {
    height:150,
    width:150,
    borderRadius: 30,
    
},

popularimage3: {
    height:150,
    width:150,
    borderRadius: 30,
   
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
