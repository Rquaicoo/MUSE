import {React} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';
import { Feather, SimpleLineIcons  } from '@expo/vector-icons';


export default function Intro3({ navigation }) {
  return (
    <View style={styles.container}>
        <View>
            <View>
                <Text>My Music</Text>
            </View>
            
            <View>
                <Feather name="search" size={24} color="black" />
                <Image source={require('../assets/sexylady.jpg')} style={styles.image} />
            </View>
        </View>

        <View>
            <View>
                <TouchableOpacity>
                <SimpleLineIcons name="playlist" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity>
                    
                </TouchableOpacity>
            </View>
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
      height: "20%",
      width: "20%",
      resizeMode: "contain",
    
  }
  
});
