import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View,Image, ImageBackground, TouchableOpacity, ScrollView} from 'react-native';
import { Feather, AntDesign,Entypo, Ionicons,FontAwesome5, SimpleLineIcons,FontAwesome, MaterialCommunityIcons,MaterialIcons,  } from '@expo/vector-icons';




export default function Playlists({navigation}) {

    const [music, setMusic] = useState(null);

    useEffect(() => {
        fetch('https://musebeta.herokuapp.com/museb/' , {
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
                                <Text style={styles.headerText}>Playlists</Text>
                                <View style={{flexDirection: "row",}}>
                                    <Feather name="music" size={18} color="white" />
                                    <Text style={{fontSize:15,color:'white', paddingLeft:10,paddingTop:1,}}>Playlists</Text>
                                </View>
                            </View>
                    

                            <View style={{marginLeft: "45%", display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <TouchableOpacity style={{borderColor: "#343547", borderWidth: 1, alignContent: "center", justifyContent: "center", padding: 8, borderRadius: 20}}>
                                    <Feather name="search" size={21} color="white" />
                                </TouchableOpacity>
                                <Image source={require('../assets/memoji.png')} style={styles.image} />
                            </View>
                        </View>
                        
                         {/* container for playlists */}

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