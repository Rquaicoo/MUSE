import React, {Component, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Image,Modal, TouchableOpacity, TouchableWithoutFeedback, ImageBackground,ScrollView} from 'react-native';
import { Feather, Octicons, Ionicons,FontAwesome5, FontAwesome, MaterialCommunityIcons,MaterialIcons,  } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import doja from '../assets/doja.jpg';
import { Audio } from 'expo-av'
import { useNavigation } from '@react-navigation/native';


const audioBookPlaylist = [
    
]
class Musicplayer extends Component {

    constructor(props) {
        super(props);
    
        const artiste = this.props.route.params.artiste;
        var imagePath = "https://musebeta.herokuapp.com" + artiste.image
        console.log(imagePath)
    }
    state = {
        isPlaying: false,
        playbackInstance: null,
        currentIndex: 0,
        volume: 1.0,
        isBuffering: false,
        liked: false,
        artiste: ""
    }

    async componentDidMount() {
        try {
            this.getArtiste()
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                interruptionModeIOS: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
                interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
                playsInSilentModeIOS: true,
                shouldDuckAndroid: true,
                staysActiveInBackground: true,
                playThroughEarpieceAndroid: true
            })
            this.loadAudio()
        }
        catch(error) {
            console.log(error)
        }
    }

    getArtiste (){
        const artiste_id = this.props.route.params.artiste;
        fetch('https://musebeta.herokuapp.com/museb/artist/',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(artiste_id)
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

            //source of audio file
            const source = {
                uri: "https://musebeta.herokuapp.com" + this.props.route.params.artiste.music_file
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

         {/*OnPlaybackStatusUpdate = status => {
            this.setState({
                isBuffering: status.isBuffering
            })
        }*/}
    }

    /*control handlers */

    handlePlayPause = async () => {
        const { isPlaying, playbackInstance} = this.state
        //check whether audio is playing or pausing
        isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()

        this.setState({
            isPlaying: !isPlaying
        })
    }

    handlePreviousTrack = async () => {
        let { playbackInstance, currentIndex } = this.state

        if (playbackInstance) {
            //clear curent track
            await playbackInstance.unloadAsync()
            currentIndex < audioBookPlaylist.length -1 ? (currentIndex -=1 ) : (currentIndex = 0)

            this.setState({
                currentIndex
            })

            this.loadAudio()
        }
    }

    handleNextTrack = async () => {
        let { playbackInstance, currentIndex } = this.state

        if (playbackInstance) {
            await playbackInstance.unloadAsync()
            currentIndex < audioBookPlaylist.length -1 ? (currentIndex+1 ) : (currentIndex = 0)

            this.setState({
                currentIndex
            })

            this.loadAudio()
        }
    }
    render() {
        const { navigation } = this.props;
            return(

                <View 
                style={styles.container}>
                    <LinearGradient
                colors={['#ffafd4', '#fd62ab', '#c34e85']}
                start={{x: 1, y: 0}}
                end={{x: 1, y: 0.5}}
            >
                <ScrollView showsVerticalScrollIndicator={false} >
                            <TouchableOpacity style={styles.albums}>
                            <Image source={{
                                uri: "https://musebeta.herokuapp.com" + this.props.route.params.artiste.image
                            }} style={styles.albumimage3}/>
                            </TouchableOpacity>


                {/* Header */}
                <View style={styles.main}>
                <Ionicons name="play" size={20} color="white" style={{ paddingLeft:19,}}/>
                <Text style={{fontSize:17,color:'white' , paddingTop:1, opacity:0.8}}> {this.props.route.params.artiste.title}</Text>
                </View>
                
                <View style={styles.main}>
                <Text style={styles.mainheader}>
                    {this.state.artiste}
                </Text>
                <MaterialCommunityIcons name="progress-download" size={32} color="white" style={{paddingLeft:'23%', paddingTop:2,}} />
                <MaterialCommunityIcons name="account-check-outline" size={32} color="white"  style={{paddingLeft:'8%', paddingTop:2,}} />
                <FontAwesome5 name="heart" size={25} color="white"  style={{paddingLeft:'8%', paddingTop:5,}} />
                </View>
                <Text style={{fontSize:20,color:'white' ,paddingLeft:20, fontWeight:'bold', opacity:0.8}}>{this.props.route.params.artiste.collaborators}</Text>

                {/* WaveForm */}
                
                <Image source={require('../assets/wave.png')} style={{width:390, height:50, marginLeft:10, marginTop:15, opacity:0.8}} />
                <View style={styles.main}>
                <Text style={{fontSize:15,color:'white' ,paddingLeft:10, paddingTop:10, fontWeight:'bold', opacity:0.7}}> 0:00</Text>
                <Text style={{fontSize:15,color:'white' ,paddingLeft:'73%', paddingTop:10, fontWeight:'bold', opacity:0.7}}> 3:45</Text>
                </View>

                {/* PLay */}
                <View style={styles.main1}>
                <Ionicons name="ios-play-back-outline" size={50} color="white" style={{ paddingTop:20, paddingRight:30}}/>
                <TouchableOpacity onPress={this.handlePlayPause}>
                {this.state.isPlaying ? (
                <Ionicons name="ios-pause" size={90} color="white"  style={{paddingTop:1,paddingLeft:20}} />) : (
                
                <FontAwesome name="play-circle" size={90} color="white"  style={{paddingTop:1,paddingLeft:20}} />)}
                </TouchableOpacity>

                <Ionicons name="ios-play-forward-outline" size={50} color="white" style={{ paddingTop:20,paddingLeft:40}}/>
                </View>

                <View style={styles.main1}>
                <MaterialCommunityIcons name="playlist-music" size={40} color="white"  style={{ paddingRight:60}}/>
                <Ionicons name="ios-repeat" size={40} color="white" style={{ paddingRight:60}} />
                <Ionicons name="md-shuffle" size={40} color="white"  style={{ paddingRight:60}}/>
                <MaterialIcons name="playlist-add" size={40} color="white" />
                </View>

                <View style={styles.main1}>
                <TouchableOpacity onPress={() => navigation.goBack()}  style={{height:50, width:50, backgroundColor:'#8f1145', borderRadius:15, marginBottom: 10,}}>
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
     height: "100%",
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
        marginTop: '30%',
        marginBottom: '10%',
        borderRadius: 200,
        alignSelf: 'center',
       
    },
    albumimage3: {
        height:300,
        width:300,
        borderRadius: 200,
        borderColor: '#ff4d99',
       borderWidth: 5,
    },



    
});

// Wrap and export
export default function(props) {
    const navigation = useNavigation();
  
    return <Musicplayer {...props} navigation={navigation} />;
  }