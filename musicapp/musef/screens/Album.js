import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import memoji from '../assets/memoji.png';
import { Feather, AntDesign,Entypo, Ionicons,FontAwesome5, SimpleLineIcons,FontAwesome, MaterialCommunityIcons,MaterialIcons,  } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';





class Album extends Component {
    constructor(props) {
        super(props);
    
        const album = this.props.route.params.album;
        console.log(album)
    }
    

    componentDidMount() {
        this.getArtiste()
        this.getAlbum()
    }

    getArtiste (){
        const artiste_id = this.props.route.params.album.artiste;
        fetch('http://localhost:8000/museb/artist/',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(artiste_id)
        })
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson)}
    )
        .catch(error => console.log(error))
    }

    getAlbum (){
        const album = this.props.route.params.album;
        fetch('http://localhost:8000/museb/album/',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(album)
        })
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson)}
    )
        .catch(error => console.log(error))
    }

    render () {
        return (
            <View style={{display: "flex", backgroundColor: "#151723"}}>
                <LinearGradient
                            colors={['#2b2b2b','#111212']}
                            start={{x: 0, y: 0.1}}
                            end={{x: 0, y: 1}}
                            style={{height: "100%"}}> 
                <View  style={styles.headerContainer}>
                    <View>
                        <Ionicons name="arrow-back-outline" size={30} color="white"  onPress={() => navigation.navigate("Home")} style={{paddingTop:6,}}/>
                    </View>
                    
                    <View style={{marginLeft: "67%", display: "flex", }}>
                        <TouchableOpacity style={{borderColor: "#fff", borderWidth: 1, alignContent: "center", justifyContent: "center", padding: 4, borderRadius: 1000}} onPress={() => navigation.navigate("myprofile")}>
                            <Image source={require('../assets/memoji.png')} style={styles.image} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View>
                    <View style={{height: "60%", width: "80%", marginLeft: "10%", marginTop: "5%"}}>
                        <Image source={require("../assets/doja.jpg")} style={{resizeMode: "cover", height: "80%", width: "90%", alignSelf: "center"}} />
                    </View>
                    <View style={{marginLeft: "5%", marginTop: -40}}>
                        <Text style={{fontSize:19,color:'#fff', fontWeight:'bold',}}>Doja Cat : Album name</Text>
                        <Text style={{fontSize:12,color:'#fff', fontWeight:'bold',}}>Album . 2022</Text>
                    </View>
                </View>
                {/* container for songs */}
                <ScrollView style={{marginLeft: "4%", marginTop: -150}}>
                    <TouchableOpacity style={{display: "flex", flexDirection: "row", borderColor: "#343547", borderBottomWidth:1, paddingBottom: "5%", marginBottom: "5%"}}>
                        <Image source={require("../assets/doja.jpg")} style={{resizeMode: "cover", height: 55, width: 45}}/>
                        <View style={{marginLeft: "5%"}}>
                            <Text style={{fontSize:16,color:'#fff', fontWeight:'bold',}}>Strenth of a woman</Text>
                            <Text style={{fontSize:14,color:'#fff', fontWeight:'200',}}>Katy Perry</Text>
                            <View style={{display: "flex", flexDirection: "row",}} >
                                <MaterialCommunityIcons name="play-box-multiple-outline" size={11} color="white" />
                                <Text style={{fontSize:11,color:'#fff', fontWeight:'200',marginLeft: "4%"}}>50 streams</Text>
                                <Ionicons name="ios-timer-outline" size={11} color="white" style={{marginLeft: "15%"}} />
                                <Text style={{fontSize:11,color:'#fff', fontWeight:'200',marginLeft: "4%"}}>3.14</Text>
                            </View>
                        </View>
                        <View style={{justifyContent: "center", marginLeft: "18%"}}>
                            <Feather name="play" size={24} color="white" />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{display: "flex", flexDirection: "row", borderColor: "#343547", borderBottomWidth:1, paddingBottom: "5%", marginBottom: "5%"}}>
                        <Image source={require("../assets/doja.jpg")} style={{resizeMode: "cover", height: 55, width: 45}}/>
                        <View style={{marginLeft: "5%"}}>
                            <Text style={{fontSize:16,color:'#fff', fontWeight:'bold',}}>Strenth of a woman</Text>
                            <Text style={{fontSize:14,color:'#fff', fontWeight:'200',}}>Katy Perry</Text>
                            <View style={{display: "flex", flexDirection: "row",}} >
                                <MaterialCommunityIcons name="play-box-multiple-outline" size={11} color="white" />
                                <Text style={{fontSize:11,color:'#fff', fontWeight:'200',marginLeft: "4%"}}>50 streams</Text>
                                <Ionicons name="ios-timer-outline" size={11} color="white" style={{marginLeft: "15%"}} />
                                <Text style={{fontSize:11,color:'#fff', fontWeight:'200',marginLeft: "4%"}}>3.14</Text>
                            </View>
                        </View>
                        <View style={{justifyContent: "center", marginLeft: "18%"}}>
                            <Feather name="play" size={24} color="white" />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{display: "flex", flexDirection: "row", borderColor: "#343547", borderBottomWidth:1, paddingBottom: "5%", marginBottom: "5%"}}>
                        <Image source={require("../assets/doja.jpg")} style={{resizeMode: "cover", height: 55, width: 45}}/>
                        <View style={{marginLeft: "5%"}}>
                            <Text style={{fontSize:16,color:'#fff', fontWeight:'bold',}}>Strenth of a woman</Text>
                            <Text style={{fontSize:14,color:'#fff', fontWeight:'200',}}>Katy Perry</Text>
                            <View style={{display: "flex", flexDirection: "row",}} >
                                <MaterialCommunityIcons name="play-box-multiple-outline" size={11} color="white" />
                                <Text style={{fontSize:11,color:'#fff', fontWeight:'200',marginLeft: "4%"}}>50 streams</Text>
                                <Ionicons name="ios-timer-outline" size={11} color="white" style={{marginLeft: "15%"}} />
                                <Text style={{fontSize:11,color:'#fff', fontWeight:'200',marginLeft: "4%"}}>3.14</Text>
                            </View>
                        </View>
                        <View style={{justifyContent: "center", marginLeft: "18%"}}>
                            <Feather name="play" size={24} color="white" />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{display: "flex", flexDirection: "row", borderColor: "#343547", borderBottomWidth:1, paddingBottom: "5%", marginBottom: "5%"}}>
                        <Image source={require("../assets/doja.jpg")} style={{resizeMode: "cover", height: 55, width: 45}}/>
                        <View style={{marginLeft: "5%"}}>
                            <Text style={{fontSize:16,color:'#fff', fontWeight:'bold',}}>Strenth of a woman</Text>
                            <Text style={{fontSize:14,color:'#fff', fontWeight:'200',}}>Katy Perry</Text>
                            <View style={{display: "flex", flexDirection: "row",}} >
                                <MaterialCommunityIcons name="play-box-multiple-outline" size={11} color="white" />
                                <Text style={{fontSize:11,color:'#fff', fontWeight:'200',marginLeft: "4%"}}>50 streams</Text>
                                <Ionicons name="ios-timer-outline" size={11} color="white" style={{marginLeft: "15%"}} />
                                <Text style={{fontSize:11,color:'#fff', fontWeight:'200',marginLeft: "4%"}}>3.14</Text>
                            </View>
                        </View>
                        <View style={{justifyContent: "center", marginLeft: "18%"}}>
                            <Feather name="play" size={24} color="white" />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{display: "flex", flexDirection: "row", borderColor: "#343547", borderBottomWidth:1, paddingBottom: "5%", marginBottom: "5%"}}>
                        <Image source={require("../assets/doja.jpg")} style={{resizeMode: "cover", height: 55, width: 45}}/>
                        <View style={{marginLeft: "5%"}}>
                            <Text style={{fontSize:16,color:'#fff', fontWeight:'bold',}}>Strenth of a woman</Text>
                            <Text style={{fontSize:14,color:'#fff', fontWeight:'200',}}>Katy Perry</Text>
                            <View style={{display: "flex", flexDirection: "row",}} >
                                <MaterialCommunityIcons name="play-box-multiple-outline" size={11} color="white" />
                                <Text style={{fontSize:11,color:'#fff', fontWeight:'200',marginLeft: "4%"}}>50 streams</Text>
                                <Ionicons name="ios-timer-outline" size={11} color="white" style={{marginLeft: "15%"}} />
                                <Text style={{fontSize:11,color:'#fff', fontWeight:'200',marginLeft: "4%"}}>3.14</Text>
                            </View>
                        </View>
                        <View style={{justifyContent: "center", marginLeft: "18%"}}>
                            <Feather name="play" size={24} color="white" />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{display: "flex", flexDirection: "row", borderColor: "#343547", borderBottomWidth:1, paddingBottom: "5%", marginBottom: "5%"}}>
                        <Image source={require("../assets/doja.jpg")} style={{resizeMode: "cover", height: 55, width: 45}}/>
                        <View style={{marginLeft: "5%"}}>
                            <Text style={{fontSize:16,color:'#fff', fontWeight:'bold',}}>Strenth of a woman</Text>
                            <Text style={{fontSize:14,color:'#fff', fontWeight:'200',}}>Katy Perry</Text>
                            <View style={{display: "flex", flexDirection: "row",}} >
                                <MaterialCommunityIcons name="play-box-multiple-outline" size={11} color="white" />
                                <Text style={{fontSize:11,color:'#fff', fontWeight:'200',marginLeft: "4%"}}>50 streams</Text>
                                <Ionicons name="ios-timer-outline" size={11} color="white" style={{marginLeft: "15%"}} />
                                <Text style={{fontSize:11,color:'#fff', fontWeight:'200',marginLeft: "4%"}}>3.14</Text>
                            </View>
                        </View>
                        <View style={{justifyContent: "center", marginLeft: "18%"}}>
                            <Feather name="play" size={24} color="white" />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={{display: "flex", flexDirection: "row", borderColor: "#343547", borderBottomWidth:1, paddingBottom: "5%", marginBottom: "5%"}}>
                        <Image source={require("../assets/doja.jpg")} style={{resizeMode: "cover", height: 55, width: 45}}/>
                        <View style={{marginLeft: "5%"}}>
                            <Text style={{fontSize:16,color:'#fff', fontWeight:'bold',}}>Strenth of a woman</Text>
                            <Text style={{fontSize:14,color:'#fff', fontWeight:'200',}}>Katy Perry</Text>
                            <View style={{display: "flex", flexDirection: "row",}} >
                                <MaterialCommunityIcons name="play-box-multiple-outline" size={11} color="white" />
                                <Text style={{fontSize:11,color:'#fff', fontWeight:'200',marginLeft: "4%"}}>50 streams</Text>
                                <Ionicons name="ios-timer-outline" size={11} color="white" style={{marginLeft: "15%"}} />
                                <Text style={{fontSize:11,color:'#fff', fontWeight:'200',marginLeft: "4%"}}>3.14</Text>
                            </View>
                        </View>
                        <View style={{justifyContent: "center", marginLeft: "18%"}}>
                            <Feather name="play" size={24} color="white" />
                        </View>
                    </TouchableOpacity>
                </ScrollView>
                </LinearGradient>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
      image: {
        height: 45,
        width: 45,
        resizeMode: "contain",
        borderRadius: 500,
      },

});

// Wrap and export
export default function(props) {
    const navigation = useNavigation();
  
    return <Album {...props} navigation={navigation} />;
  }