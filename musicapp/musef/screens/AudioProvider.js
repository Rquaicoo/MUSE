import React, { Component } from 'react';
import { StyleSheet, Text, View,Image, ImageBackground, TouchableOpacity, ScrollView, StatusBar, Alert} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { DataProvider } from 'recyclerlistview';


export const AudioContext = React.createContext();
export class AudioProvider extends Component {
    constructor(props){
        super(props);

        this.state = { 
            audioFiles: [],
            permissionError: false,
            dataProvider: new DataProvider((r1, r2) => r1 !== r2)
        }
    };

    permissionAlert = () => {
        Alert.alert("Permission Denied", "Please allow access to your device's media library in order to use this feature.",
        [{
            text: "I am ready",
            onPress: () => this.getPermission()
        }, {
            text: "Cancel",
            onPress: () =>this.permissionAlert(),
        }])
    }

    getAudioFiles = async () => {
        const {dataProvider, audioFiles} = this.state
        let media = await MediaLibrary.getAssetsAsync({
            mediaType: 'audio',
         });

         media = await MediaLibrary.getAssetsAsync({
             mediaType: 'audio',
             first: media.totalCount,
         })

         
         this.setState({...this.state, audioFiles:media.assets})
    }

    getPermission = async () => {
        try {
            const permission = await MediaLibrary.getPermissionsAsync();
            if (permission.granted) {
                //get audio files
                this.getAudioFiles();
            }

            if (!permission.canAskAgain) {
                //display alert that they need to allow permissions
                this.setState({...this.state, permissionError: true})
            }

            if (!permission.granted && permission.canAskAgain) {
                const {status, canAskAgain } = await MediaLibrary.requestPermissionsAsync();
                if (status === 'denied' && canAskAgain) {
                    //display alert that they need to allow permissions
                    this.permissionAlert();

                }

                if (status === 'granted') {
                    //get audio files
                    this.getAudioFiles();
                }

                if (status === 'denied' && !canAskAgain) {
                    //display alert that they need to allow permissions
                    this.setState({...this.state, permissionError: true})
                }
            } 
    } 
    catch (e) {
        console.log(e)
    }
    }


    componentDidMount() {
        this.getPermission();
    }

    render () {
        if(this.state.permissionError) {
            return <View style={{justifyContent: "center", alignItem: "center", alignContent: "center"}}>
                <Text style={{color: "white"}}>
                    You have not accepted the permissions
                    Please allow permissions in your settings
                </Text>
            </View>
        }
        return <AudioContext.Provider value={{audioFiles: this.state.audioFiles}}>
            {this.props.children}
        </AudioContext.Provider>
    }
}

const styles = StyleSheet.create({
    container: {
    },
});
