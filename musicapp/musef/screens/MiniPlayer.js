import {React} from 'react';
import { StyleSheet, Text, View,Image, ImageBackground, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { Feather, AntDesign,Entypo, Ionicons,FontAwesome5, SimpleLineIcons,FontAwesome, MaterialCommunityIcons,MaterialIcons,  } from '@expo/vector-icons';


export default function MiniPlayer() {
   return (
    <View>
            <TouchableWithoutFeedback  >
            <View style={{flexDirection:'row',padding:20,}}>
                <Feather name="x" size={24} color="white"  style={{ paddingTop:15,}}/>
                    <View>
                        <TouchableOpacity>
                        <Image source={require('../assets/doja.jpg')} style={styles.modalimage}  />
                        </TouchableOpacity>
                    </View>
            <View>
            
            <Text style={styles.modaltext}> Woman </Text>
            <Text style={{fontSize:18, color:'white', paddingLeft:10, }}> Doja Cat</Text>
            </View>
        
            <Ionicons name="ios-play-skip-back-outline" size={30} color="white" style={{ paddingTop:10,paddingLeft:40}}/>
            <FontAwesome name="play-circle" size={50} color="white"  style={{paddingTop:1,paddingLeft:20}} />
            <Ionicons name="ios-play-skip-forward-outline" size={30} color="white" style={{ paddingTop:10,paddingLeft:20}}/>
            </View>
            </TouchableWithoutFeedback>
   </View>
   );
}


const styles = StyleSheet.create({
    container: { backgroundColor: '#141515',
    height: "100%",
    paddingLeft: "1%",
    },
    modalimage: {
        height: 55,
        width: 55,
        borderRadius: 500,
        marginLeft:10,
      },
    
      modal: {
        position: "absolute",
        height: "11%",
        backgroundColor:'#282A2A',
       borderTopLeftRadius:30,
       borderTopRightRadius:30,
        marginBottom:'5%',
        top: "90%",
        width: "100%",
        
      },
      modaltext: {
         fontSize:23,
         fontWeight: 'bold', 
         color:'white',
         paddingLeft:9,
      },
    

});