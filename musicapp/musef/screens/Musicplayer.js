import React, {Component, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Image,Modal, TouchableOpacity, BackHandler, Animated,ScrollView} from 'react-native';
import { Feather, Entypo, Ionicons,FontAwesome5, FontAwesome, MaterialCommunityIcons,MaterialIcons,  } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '@react-native-community/slider';
import doja from '../assets/doja.jpg';
import { SharedElement } from 'react-navigation-shared-element';
import {
    SharedElementTransition,
    nodeFromRef
  } from 'react-native-shared-element';
  

import { Audio } from 'expo-av'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { throwIfAudioIsDisabled } from 'expo-av/build/Audio/AudioAvailability';


class Musicplayer extends Component {

    constructor(props) {
        super(props);
    
        const artiste = this.props.route.params.artiste;
        var imagePath = "https://musebeta.herokuapp.com" + artiste.image
    }
    state = {
        isPlaying: false,
        playbackInstance: null,
        currentIndex: 0,
        volume: 1.0,
        isBuffering: false,
        liked: false,
        artiste: "",
        token: "",
        playlist: this.props.route.params.playlist,
        index: this.props.route.params.index,
        rotateValueHolder: new Animated.Value(0)
    }

    changeLikedState = () => {
        this.setState({liked: !this.state.liked})
    }

    like (id){
        let token = this.getToken()
        console.log(token)
        fetch('http://localhost:8000/museb/liked/',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'user_token': this.state.token, 'music_id':this.props.route.params.artiste.id })
        })
        .then(response => response.json())
        .then(responseJson => {
            console.log(responseJson)}
    )
        .catch(error => console.log(error))
    }

    getToken = async () => {
        try {
            var token =  await AsyncStorage.getItem('token')
            this.setState({token: token})
          if(token !== null) {
            // value previously stored
            
          }
        } catch(e) {
          // error reading value
        }
      }

    async componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
          );

        try {
            
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                interruptionModeIOS: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
                interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
                playsInSilentModeIOS: true,
                shouldDuckAndroid: true,
                staysActiveInBackground: true,
                playThroughEarpieceAndroid: false
            })
            this.loadAudio()
            
        }
        catch(error) {
            console.log(error)
        }
    }

    componentWillUnmount() {
        this.backHandler.remove();
       
    }


    getArtiste (){
        //const artiste_id = this.props.route.params.artiste;
        fetch('https://musebeta.herokuapp.com/museb/artist/',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.playlist[this.state.index].main_artiste)
        })
        .then(response => response.json())
        .then(responseJson => {
            this.setState({artiste: responseJson["artiste"]})}
    )
        .catch(error => console.log(error))
    }

    async loadAudio () {
        const {currentIndex, isPlaying, volume} = this.state
    
        if (isPlaying) {
            this.handlePlayPause()
        }

        try {

            //new audio instance
            const playbackInstance = new Audio.Sound()
            await playbackInstance.unloadAsync()

            //source of audio file
            const source = {
                uri: "https://musebeta.herokuapp.com" + this.state.playlist[this.state.index].music_file
            }

            const status = {
                shouldPlay: isPlaying,
                volume
            }
            
            
            //playbackInstance.setOnPlaybackStatusUpdate(this.OnPlaybackStatusUpdate)
            await playbackInstance.loadAsync(source, status, false) //prevents audio from downloadning before playing
            this.setState({playbackInstance})

            this.handlePlayPause()
            
        }
        catch (error) {
            console.log(error)
        }

        /*{ OnPlaybackStatusUpdate = status => {
            this.setState({
                isBuffering: status.isBuffering
            })}
        }*/
    }

    /*control handlers */

    handlePlayPause = async () => {
        this.getArtiste()
        const { isPlaying, playbackInstance} = this.state
        //check whether audio is playing or pausing
        isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()

        this.setState({
            isPlaying: !isPlaying
        })
    }

    handlePreviousTrack = async () => {
        let { playbackInstance, index } = this.state

        if (playbackInstance) {
            //clear curent track
            index != 0 ? (index -=1 ) : (index = 0)

            this.setState({
                index
            })

            this.loadAudio()
            
        }
    }

    handleNextTrack = async () => {
        let { playbackInstance, index } = this.state

        if (playbackInstance) {
            
            try {
            index != 0 ? (index+=1 ) : (index = 0)
            }
            catch {
                index = 1
            }
            this.setState({
                index
            })

            this.loadAudio()
        }
    }

    goBack() {
        try {
            this.playbackInstance.unloadAsync()
        }
        catch(error) {
            //do nothing
        }
    }

    backAction = () => {
        if (this.state.isPlaying) {
            this.state.playbackInstance.unloadAsync()
            this.props.navigation.goBack()
        }
        return true;
      };
    
    startImageRotateFunction = () => {
        Animated.loop(Animated.timing(this.state.rotateValueHolder, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: false,
        })).start();
      };
    
    render() {
        const { navigation } = this.props;
        
            return(

                <View 
                style={styles.container}>
                    <LinearGradient
                            colors={['#2b2b2b','#111212']}
                            start={{x: 0, y: 0.1}}
                            end={{x: 0, y: 1}}
                            style={{height: "100%"}}> 
                <ScrollView showsVerticalScrollIndicator={false} >
                            <TouchableOpacity style={styles.albums}>
                            <Image source={{
                                uri: "https://musebeta.herokuapp.com" + this.state.playlist[this.state.index].image
                            }} style={styles.albumimage3}/>
                            </TouchableOpacity>


                {/* Header */}
                <View style={styles.main}>
                <Ionicons name="play" size={20} color="white" style={{ paddingLeft:19,}}/>
                <Text style={{fontSize:17,color:'white' , paddingTop:1, opacity:0.8}}>{this.state.playlist[this.state.index].title}</Text>
                </View>
                
                <View style={styles.main}>
                <Text style={styles.mainheader}>
                    {this.state.artiste}
                </Text>
                <MaterialCommunityIcons name="progress-download" size={32} color="white" style={{paddingLeft:'8%', paddingTop:2,}} />
                <MaterialCommunityIcons name="account-check-outline" size={32} color="white"  style={{paddingLeft:'8%', paddingTop:2,}} />
                {this.state.liked ?
                (<Entypo name="heart" size={25} color="white" style={{paddingLeft:'8%', paddingTop:5,}} onPress={() => {this.changeLikedState();this.like(this.props.route.params.artiste.id)}} />):
                (<FontAwesome5 name="heart" size={25} color="white"  style={{paddingLeft:'8%', paddingTop:5,}} onPress={()=> {this.changeLikedState();this.like(this.props.route.params.artiste.id)}} />)}
                </View>
                <Text style={{fontSize:20,color:'white' ,paddingLeft:20, fontWeight:'bold', opacity:0.8}}>{this.props.route.params.artiste.collaborators}</Text>

                {/* WaveForm */}
                
                    <Slider
                    style={{width: '90%', height: 40, marginLeft:15,marginTop:10,}}
                    minimumValue={0}
                    maximumValue={10}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="grey"
                    />

                <View style={styles.main}>
                <Text style={{fontSize:15,color:'white' ,paddingLeft:16, paddingTop:10, fontWeight:'bold', opacity:0.7}}> 0:00</Text>
                <Text style={{fontSize:15,color:'white' ,paddingLeft:'73%', paddingTop:10, fontWeight:'bold', opacity:0.7}}> 3:45</Text>
                </View>

                {/* PLay */}
                <View style={styles.main1}>
                <Ionicons name="ios-play-back-outline" size={50} color="white" style={{ paddingTop:20, paddingRight:30}} onPress={() => {this.handlePreviousTrack()}}/>
                <TouchableOpacity onPress={this.handlePlayPause}>
                {this.state.isPlaying ? (
                <Ionicons name="ios-pause" size={90} color="white"  style={{paddingTop:1,paddingLeft:20}} />) : (
                
                <FontAwesome name="play-circle" size={90} color="white"  style={{paddingTop:1,paddingLeft:20}} />)}
                </TouchableOpacity>

                <Ionicons name="ios-play-forward-outline" size={50} color="white" style={{ paddingTop:20,paddingLeft:40}} onPress={() => {this.handleNextTrack()}}/>
                </View>

                <View style={styles.main1}>
                <MaterialCommunityIcons name="playlist-music" size={40} color="grey"  style={{ paddingRight:60}}/>
                <Ionicons name="ios-repeat" size={40} color="grey" style={{ paddingRight:60}} />
                <Ionicons name="md-shuffle" size={40} color="grey"  style={{ paddingRight:60}}/>
                <MaterialIcons name="playlist-add" size={40} color="grey" />
                </View>

                <View style={styles.main1}>
                <TouchableOpacity onPress={() => {this.state.playbackInstance.unloadAsync();navigation.goBack()}}  style={{height:50, width:50, backgroundColor:'#282A2A', borderRadius:15, marginBottom: 10,}}>
                <Feather name="chevrons-up" size={40} color="white"  style={{ paddingLeft:5, paddingTop:5}}/>
                </TouchableOpacity>
            
                </View>
                </ScrollView>
                      </LinearGradient>
                </View>
            );
        }
} 

const styles = StyleSheet.create({
    container: {    
        backgroundColor: '#151723',
     height: "100%",
    },

    waveform:{
    height:5,
    width:'90%',
    backgroundColor:'white',
    marginLeft:'5%',
    marginTop:10,
    marginBottom:10,
    },
    main: {
        flexDirection: "row",
    },

    main1: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: "7%",
        marginRight: "2%",
    },

    mainheader: {
    fontSize: 30,
    color: "white",
    paddingLeft: "5%",
    fontWeight: "bold",
    
    },

    albums: {
        height:300,
        width:300,
        backgroundColor: '#1e202c',
        marginTop: '20%',
        marginBottom: '20%',
        borderRadius: 200,
        alignSelf: 'center',
       
    },
    albumimage3: {
        height:300,
        width:300,
        borderRadius: 200,
        borderColor: 'white',
       borderWidth: 5,

    },



    
});

// Wrap and export
export default function(props) {
    const navigation = useNavigation();
  
    return <Musicplayer {...props} navigation={navigation} />;
  }