import React from 'react';
import { StyleSheet, Text, View,Image, ImageBackground, TouchableOpacity, ScrollView, StatusBar} from 'react-native';
import { AudioContext } from './AudioProvider';


export class LocalAudio extends React.Component {
    static contextType = AudioContext;
    
    
    render() {
        return (
        <ScrollView>
            {this.context.audioFiles.map(item => 
                <Text style={{padding: 10, borderBottomColor: "black", borderBottomWidth: 2}} key={item.id}> {item.filename}</Text>)}
        </ScrollView>
    );
}
}

const styles = StyleSheet.create({
    container: {
    },
});

export default LocalAudio;
