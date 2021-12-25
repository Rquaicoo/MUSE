import {React} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function Intro2({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/people.jpg')} style={styles.image} />

      <View style={{marginLeft: "10%", marginTop: 10}}>
          <Text style={styles.mainText}>
          Share your{"\n"} playlist
          </Text>
          <Text style={styles.subText}>
          Share playlists you've created with your friends using the app.
          </Text>
      </View>

      <View style={{display: "flex", flexDirection: "row"}}>
        <View style={{display: "flex", flexDirection: "row", marginLeft: "10%", marginTop: "5%"}}>
          <View style={{backgroundColor: "#cdcfd1", height: 12, width: 12, borderRadius: 20}}></View>
          <View style={{backgroundColor: "#65686e", height: 12, width: 12, borderRadius: 20, marginLeft: 10}}></View>
          <View style={{backgroundColor: "#cdcfd1", height: 12, width: 12, borderRadius: 20, marginLeft: 10}}></View>
        </View>

        <TouchableOpacity style={styles.next} onPress={() => {(navigation.navigate("Intro3"))}} >
        <AntDesign name="right" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    height: "100%"
  },
  image: {
    width: '100%',
    height: "75%",
    resizeMode: "cover",
    borderBottomRightRadius: 70

  },
  mainText: {
    fontSize: 30,
    fontWeight: "bold", 
  },
  subText: {
    fontSize: 17,
    marginTop: 7,
  },
  next: {
    marginLeft: "60%",
    backgroundColor: "#96234d",
    padding: "4%",
    borderRadius: 30,
  }
});
