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
                <TouchableOpacity style={{borderColor: "#343547", borderWidth: 1, alignContent: "center", justifyContent: "center", padding: 8, borderRadius: 20}}>
                    <Feather name="search" size={21} color="white" />
                  </TouchableOpacity>
                    <Image source={require('../assets/doja.jpg')} style={styles.image} />
            </View>
        </View>

        <View style={{marginLeft: "5%", marginTop: "10%"}}>
          <Text style={{color: "#3f3f4f"}}>Your downloads</Text>
            <View style={{marginTop: 30, flexDirection: "row"}}>
                <TouchableOpacity style={styles.downloadsContent}>
                  <View style={{backgroundColor: "#151723", padding: "7%", borderRadius: 20}}>
                    <SimpleLineIcons name="playlist" size={24} color="white" />
                  </View>
                  <Text style={{color: "white"}}>Playlists</Text>
                  <Text  style={{color: "white"}}>23 songs</Text>
               
                </TouchableOpacity>

                
                <TouchableOpacity style={styles.downloadsContent} >
                <View style={{backgroundColor: "#151723", padding: "7%", borderRadius: 20}}>
                <Ionicons name="md-musical-note" size={24} color="white" />
                </View>
                <Text style={{color: "white"}}>Music</Text>
                <Text  style={{color: "white"}}>23 songs</Text>
                </TouchableOpacity>
                
            </View>
            
            <View style={{marginTop: 30, flexDirection: "row"}}>
                <TouchableOpacity style={styles.downloadsContent}>
                  <View style={{backgroundColor: "#151723", padding: "7%", borderRadius: 20}}>
                  <MaterialIcons name="album" size={24} color="white" />
                  </View>
                  <Text style={{color: "white"}}>Albums</Text>
                  <Text  style={{color: "white"}}>5 Albums</Text>
               
                </TouchableOpacity>

                
                <TouchableOpacity style={styles.downloadsContent} >
                <View style={{backgroundColor: "#151723", padding: "7%", borderRadius: 20}}>
                <MaterialIcons name="favorite" size={24} color="white" />
                </View>
                <Text style={{color: "white"}}>Favourite</Text>
                <Text  style={{color: "white"}}>3 songs</Text>
                </TouchableOpacity>
                
            </View>
        </View>

        <View  style={{marginLeft: "5%", marginTop: "7%"}}>
          <Text style={{color: "#3f3f4f", marginBottom: 10}}>Your activities</Text>
          <TouchableOpacity  style={{display: "flex", flexDirection: "row", marginTop: 20 }}>
          <MaterialIcons name="playlist-add" size={30} color="#343547" />
          <Text style={{color: "white", fontWeight: "100", fontSize: 17, marginLeft: "5%", marginRight: "50%"}}>Your playlists</Text>
          <MaterialIcons name="navigate-next" size={30} color="#343547" />
          </TouchableOpacity>
          <View style={{
      backgroundColor: "#343547",
       width: "95%",
        height: 1, 
        marginLeft: "5%",
       marginTop: 9
    }}></View>

          <TouchableOpacity  style={{display: "flex", flexDirection: "row", marginTop: 20 }}>
          <MaterialCommunityIcons name="heart-plus-outline" size={30} color="#343547" />
          <Text style={{color: "white", fontWeight: "100", fontSize: 17, marginLeft: "5%", marginRight: "51%"}}>Liked songs</Text>
          <MaterialIcons name="navigate-next" size={30} color="#343547" />
          </TouchableOpacity>
          <View style={{
      backgroundColor: "#343547",
       width: "95%",
        height: 1,
        marginLeft: "5%",
       marginTop: 9
    }}  ></View>

          <TouchableOpacity  style={{display: "flex", flexDirection: "row", marginTop: 20 }}>
          <SimpleLineIcons name="user-following" size={30} color="#343547" />
          <Text style={{color: "white", fontWeight: "100", fontSize: 17, marginLeft: "5%", marginRight: "42%"}}>Followed Artistes</Text>
          <MaterialIcons name="navigate-next" size={30} color="#343547" />
          </TouchableOpacity>
        </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    height: "100%"
  },
  image: {
      height: "20%",
      width: "20%",
      resizeMode: "contain",
    
  }
  
});
