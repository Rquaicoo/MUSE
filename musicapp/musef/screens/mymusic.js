import {React} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import { Feather, SimpleLineIcons, Ionicons, MaterialIcons, MaterialCommunityIcons,  } from '@expo/vector-icons';


export default function MyMusic({ navigation }) {
  return (
    <ScrollView style={styles.container}>
    <View >
        <View  style={styles.headerContainer}>
            <View>
                <Text style={styles.headerText}>My Music</Text>
            </View>
            

            <View style={{marginLeft: "34%", display: "flex", flexDirection: "row", alignItems: "center"}}>
                <TouchableOpacity style={{borderColor: "#282A2A", borderWidth: 1, alignContent: "center", justifyContent: "center", padding: 8, borderRadius: 20}}>
                    <Feather name="search" size={21} color="white" />
                  </TouchableOpacity>
                    <Image source={require('../assets/memoji.png')} style={styles.image} />
            </View>
        </View>

        <View style={{marginLeft: "6%", marginTop: "10%"}}>
          <Text style={{color: "#3f3f4f"}}>Your downloads</Text>
            <View style={{marginTop: 30, flexDirection: "row"}}>


                <TouchableOpacity style={styles.downloadsContent} onPress={() => navigation.navigate("Playlists")}>
                  <View style={{backgroundColor: "#151723", padding: "7%", borderRadius: 20}}>
                    <SimpleLineIcons name="playlist" size={24} color="white" />
                  </View>
                  <Text style={{color: "white", marginTop:6}}>Playlists</Text>
                </TouchableOpacity>

                
                <TouchableOpacity style={styles.downloadsContent} onPress={() => navigation.navigate("LocalAudio")} >
                <View style={{backgroundColor: "#151723", padding: "7%", borderRadius: 20}}>
                <Ionicons name="md-musical-note" size={24} color="white" />
                </View>
                <Text style={{color: "white", marginTop:6}}>My Music</Text>
                </TouchableOpacity>
                
            </View>
            
            <View style={{marginTop: 30, flexDirection: "row"}} >
                <TouchableOpacity style={styles.downloadsContent} onPress={() => navigation.navigate("AlbumList")}>
                  <View style={{backgroundColor: "#151723", padding: "7%", borderRadius: 20}}>
                  <MaterialIcons name="album" size={24} color="white" />
                  </View>
                  <Text style={{color: "white", marginTop:6}}>Albums</Text>
               
                </TouchableOpacity>

                
                <TouchableOpacity style={styles.downloadsContent} onPress={() => navigation.navigate("Favourites")}>
                <View style={{backgroundColor: "#151723", padding: "7%", borderRadius: 20}} >
                <MaterialIcons name="favorite" size={24} color="white" />
                </View>
                <Text style={{color: "white", marginTop:6}}>Favourite</Text>
                </TouchableOpacity>
                
            </View>
        </View>

        <View  style={{marginLeft: "5%", marginTop: "15%"}}>
          <Text style={{color: "#3f3f4f", marginBottom: 10}}>Your activities</Text>
          <TouchableOpacity  style={{display: "flex", flexDirection: "row", marginTop: 20 }} onPress={() => navigation.navigate("ListenLater")}>
          <MaterialIcons name="playlist-add" size={30} color="#282A2A" />
          <Text style={{color: "white", fontWeight: "100", fontSize: 17, marginLeft: "5%", marginRight: "50%"}}>Listen later</Text>
          <MaterialIcons name="navigate-next" size={30} color="#282A2A" />
          </TouchableOpacity>
          <View style={{
      backgroundColor: "#282A2A",
       width: "90%",
        height: 1, 
        marginLeft: "1%",
       marginTop: 9
    }}></View>

          <TouchableOpacity  style={{display: "flex", flexDirection: "row", marginTop: 20 }} onPress={() => navigation.navigate("Favourites")}>
          <MaterialCommunityIcons name="heart-plus-outline" size={30} color="#282A2A" />
          <Text style={{color: "white", fontWeight: "100", fontSize: 17, marginLeft: "5%", marginRight: "48%"}} >Liked songs</Text>
          <MaterialIcons name="navigate-next" size={30} color="#282A2A" />
          </TouchableOpacity>
          <View style={{
      backgroundColor: "#282A2A",
       width: "90%",
        height: 1,
        marginLeft: "1%",
       marginTop: 9
    }}  ></View>

          <TouchableOpacity  style={{display: "flex", flexDirection: "row", marginTop: 20 }} onPress={() => navigation.navigate("FollowedArtists")}>
          <SimpleLineIcons name="user-following" size={30} color="#282A2A" />
          <Text style={{color: "white", fontWeight: "100", fontSize: 17, marginLeft: "5%", marginRight: "39%"}}>Followed Artistes</Text>
          <MaterialIcons name="navigate-next" size={30} color="#282A2A" />
          </TouchableOpacity>
        </View>
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
    downloadsContent: {
      borderRadius: 20,
      borderColor: "#282A2A", 
      borderWidth: 1, 
      width: "40%", 
      height: 130, 
      alignItems: "center", 
      justifyContent: "center",
      backgroundColor: "#282A2A",
      marginRight: "10%"
      
    },
    line: {
      backgroundColor: "white",
       width: "95%",
        height: 0.6, 
        marginLeft: "5%",
       marginTop: 9
    }
  
});
