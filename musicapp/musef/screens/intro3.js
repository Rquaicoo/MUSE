import {React} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';

import { AntDesign } from '@expo/vector-icons';


export default function Intro3({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/lady.jpg')} style={styles.image} />

      <View style={{marginLeft: "10%", marginTop: 10}}>
          <Text style={styles.mainText}>
          No{"\n"} advertisement
          </Text>
          <Text style={styles.subText}>
          Stream your music with no ads in{"\n"} the background.
          </Text>
      </View>

      <View style={{display: "flex", flexDirection: "row"}}>
        <View style={{display: "flex", flexDirection: "row", marginLeft: "10%", marginTop: "5%"}}>
          <View style={{backgroundColor: "#cdcfd1", height: 12, width: 12, borderRadius: 20}}></View>
          <View style={{backgroundColor: "#cdcfd1", height: 12, width: 12, borderRadius: 20, marginLeft: 10}}></View>
          <View style={{backgroundColor: "#65686e", height: 12, width: 12, borderRadius: 20, marginLeft: 10}}></View>
        </View>

        <AntDesign name="right" size={24} color="white" />

        <TouchableOpacity style={styles.next} onPress={() => {(navigation.navigate("Tabs"))}}>
        <Text style={{color: "#ffffff", fontWeight: "bold"}}>Get Started</Text>
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

    marginLeft: "35%",
    backgroundColor: "#494a47",
    padding: "4%",
    borderRadius: 30,
    paddingLeft: "7%",
    paddingRight: "7%",



  }
});
