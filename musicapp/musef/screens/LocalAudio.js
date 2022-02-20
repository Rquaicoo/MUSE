import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View,Image, ImageBackground, TouchableOpacity, ScrollView} from 'react-native';
import { Feather, AntDesign,Entypo, Ionicons,FontAwesome5, SimpleLineIcons,FontAwesome, MaterialCommunityIcons,MaterialIcons,  } from '@expo/vector-icons';
import { AudioContext } from './AudioProvider';
import { useNavigation } from '@react-navigation/native';


export class LocalAudio extends React.Component {
    static contextType = AudioContext;
    
    
    render() {
        const { navigation } = this.props;
        return (
        <ScrollView style={styles.container}>
            <View  style={styles.headerContainer}>
                            <View>
                                <Text style={styles.headerText}>Your Music</Text>
                                <View style={{flexDirection: "row",}}>
                                    <Feather name="music" size={18} color="white" />
                                    <Text style={{fontSize:15,color:'white', paddingLeft:10,paddingTop:1,}}>Your Local Music</Text>
                                </View>
                            </View>
                    

                            <View style={{marginLeft: "45%", display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <TouchableOpacity style={{borderColor: "#343547", borderWidth: 1, alignContent: "center", justifyContent: "center", padding: 8, borderRadius: 20}}>
                                    <Feather name="search" size={21} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* container for songs */}
                        <View style={{marginLeft: "4%", marginTop: 40}}>
                            {this.context.audioFiles.map((item, index) => 
                <TouchableOpacity style={{display: "flex", flexDirection: "row", borderColor: "#343547", borderBottomWidth:1, paddingBottom: "5%", marginBottom: "5%"}} key={index} onPress={() =>{navigation.navigate("LocalMusicPlayer", {playlist: this.context.audioFiles, index:index})}}>
                <Image source={require('../assets/song.jpg')} style={{resizeMode: "cover", height: 60, width: 60, borderRadius:15}}/>
                    <View style={{flex:4, flexDirection: "row"}}>
                        <View style={{marginLeft: "5%",flex:3}}>
                            <Text style={{fontSize:16,color:'#fff', fontWeight:'bold',}}>{item.filename}</Text>
                            <View style={{display: "flex", flexDirection: "row",}} >
                            </View>
                        </View>
                        <View style={{justifyContent: "center", flex:1}}>
                            <Feather name="play" size={24} color="white" />
                        </View>
                </View>
            </TouchableOpacity>)}
        </View>
        </ScrollView>
    );
}
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

// Wrap and export
export default function(props) {
    const navigation = useNavigation();
  
    return <LocalAudio {...props} navigation={navigation} />;
  }