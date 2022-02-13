import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground,ScrollView} from 'react-native';
import { Feather, SimpleLineIcons, Ionicons, MaterialIcons, MaterialCommunityIcons,  } from '@expo/vector-icons';
import doja2 from '../assets/doja2.jpg';
import doja from '../assets/doja.jpg';
import sark from '../assets/sark.jpg';
import arthur from '../assets/arthur.jpg';
import kanye from '../assets/kanye.jpeg';
import adele from '../assets/adele.jpg';

export default function artists({ navigation }) {

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
        setArtiste(jsonResponse.slice(0,4))
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
            
            <View style={{marginLeft: "43%", display: "flex", flexDirection: "row", alignItems: "center"}}>
                <TouchableOpacity   style={{borderColor: "#343547", borderWidth: 1, padding: 10,borderRadius: 20}}>
                    <Feather name="search" size={21} color="white" />
                  </TouchableOpacity  >
                  <TouchableOpacity onPress={() => navigation.navigate("myprofile")} >
                    <Image source={require('../assets/memoji.png')} style={styles.image} />
                    </TouchableOpacity>
            </View>
        </View>

        {/* Artist Image */}
        <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={styles.musiccontent}>
            <ImageBackground source={doja2} style={styles.mainimage}>
            <Text style={styles.imageText}>Doja Cat</Text>
            <View style={{flexDirection:'row'}}>
            <MaterialCommunityIcons name="account-check-outline" size={27} color="grey" style={{paddingTop:2, paddingLeft:20,}}/>
            <Text style={styles.imageText2}>734.1K</Text>
            <Ionicons name="ios-play-sharp" size={25} color="grey" style={{paddingTop:2,paddingLeft:10,}}/>
            <Text style={styles.imageText2}>1.3M</Text>
            </View>
            </ImageBackground>
            </TouchableOpacity>
                        {/* Small Music Disks */}
                        {artistes &&(
                     <View style={{height: 460}}>
                       <ScrollView>
                       {artistes.map((artist, index) => (
                    <TouchableOpacity style={styles.albums} key={index}>
                    <Image source={{
                      uri: "https://musebeta.herokuapp.com" + artist.image
                    }} style={styles.albumimage}/>
                    </TouchableOpacity>))}
                    </ScrollView>
                    </View>)}
        </View>
    {/* Popular Artists */}
        <View >
        <View style={{flexDirection:'row', marginTop:15,}} >
        <Text style={{color:'white',fontSize:25,paddingLeft:'5%', paddingTop:20,}}> 
                 <Text style={{color:'white',fontWeight:'bold'}} >
                Popular </Text> Artists </Text>
                <Text style={{fontSize:17,color:'pink', fontWeight:'bold',paddingLeft:140,paddingTop:25,}}>See all</Text>
                </View>

                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                 <View style={{flexDirection:'row'}} >
                    <View>
                    <TouchableOpacity style={styles.popularalbums}>
                    <Image source={arthur} style={styles.popularimage}/>
                    </TouchableOpacity>
                    <View>
                    <Text style={styles.artistname}> Kwesi Arthur</Text>
                    <Text style={styles.artistlikes}> 900K Followers</Text>
                    </View>
                    <TouchableOpacity style={styles.followbutton}>
                    <Text style={{color:'white', fontSize:20, fontWeight:'bold',alignSelf:'center',paddingTop:7,}}> Follow </Text>
                    </TouchableOpacity>
                    </View>

                    <View>
                    <TouchableOpacity style={styles.popularalbums}>
                    <Image source={doja} style={styles.popularimage3}/>
                    </TouchableOpacity>
                    <Text style={styles.artistname}> Doja Cat </Text>
                    <Text style={styles.artistlikes}> 1.2M Followers </Text>
                    <TouchableOpacity style={styles.followbutton}>
                    <Text style={{color:'white', fontSize:20, fontWeight:'bold',alignSelf:'center',paddingTop:7,}}> Follow </Text>
                    </TouchableOpacity>
                    </View>

                    <View>
                    <TouchableOpacity style={styles.popularalbums}>
                    <Image source={adele} style={styles.popularimage2}/>
                    </TouchableOpacity>
                    <Text style={styles.artistname}> Adele</Text>
                    <Text style={styles.artistlikes}> 10M Followers</Text>
                    <TouchableOpacity style={styles.followbutton}>
                    <Text style={{color:'white', fontSize:20, fontWeight:'bold',alignSelf:'center',paddingTop:7,}}> Follow </Text>
                    </TouchableOpacity>
                    </View>

                    <View>
                    <TouchableOpacity style={styles.popularalbums}>
                    <Image source={kanye} style={styles.popularimage1}/>
                    </TouchableOpacity>
                    <Text style={styles.artistname}> Kanye West </Text>
                    <Text style={styles.artistlikes}> 5M Followers</Text>
                    <TouchableOpacity style={styles.followbutton}>
                    <Text style={{color:'white', fontSize:20, fontWeight:'bold',alignSelf:'center',paddingTop:7,}}> Follow </Text>
                    </TouchableOpacity>
                    </View>

                 </View>
                </ScrollView>


        </View>

    
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#151723",
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
  imageText: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
    marginLeft:20,
    marginTop:360,
  },
  imageText2: {
    fontSize: 20,
    fontWeight:'bold',
    color: "grey",
    marginLeft:5,
    marginRight:15,
    marginTop:3,
  },

  mainimage: {
    height:460,
    width:265,
    borderRadius: 40,
    overflow: 'hidden',
},
musiccontent: {
    height:460,
    width:265,
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
    backgroundColor: '#1e202c',
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
