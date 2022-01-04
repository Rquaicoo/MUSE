import {React} from 'react';
import { StyleSheet, Text, View,Image, ImageBackground, TouchableOpacity, ScrollView, StatusBar} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import rad from '../assets/rad.jpg';
import sark from '../assets/sark.jpg';
import arthur from '../assets/arthur.jpg';
import kanye from '../assets/kanye.jpeg';
import adele from '../assets/adele.jpg';
import doja from '../assets/doja.jpg';
import { Octicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';



export default function Home ({navigation}) {
   return (
       
   
            <ScrollView style={styles.container}  showsVerticalScrollIndicator={false} > 
                <View >
                        <Text style={{fontWeight:'bold', fontSize:35, alignSelf:'center',color:'white',marginTop:35,}}> muse.</Text>
                    <TouchableOpacity style={styles.header}>
                    <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <TouchableOpacity style={styles.headercontent} onPress={() => {(navigation.navigate("Tabs"))}}>
                        <Text style={{color:'white', fontSize:20,fontWeight: 'bold', paddingTop:13, paddingLeft:37,}}> All</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headercontent}>
                    <Text style={{color:'white', fontSize:20,fontWeight: 'bold', paddingTop:13, paddingLeft:30,}}> New</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headercontent}>
                    <Text style={{color:'white', fontSize:20,fontWeight: 'bold', paddingTop:13, paddingLeft:10,}}> Trending</Text>
                    </TouchableOpacity>
                </View>
                    
                </TouchableOpacity>

                {/* Trending Music */}
            <Text style={{color:'white',fontSize:25,paddingLeft:'5%', paddingTop:'2%'}}> 
            <Text style={{color:'white',fontWeight:'bold'}} >
                Trending</Text> Music </Text>
                <View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={{flexDirection:'row'}}>
                    <TouchableOpacity style={styles.musiccontent}>
                    <Image source={sark} style={styles.mainimage}/>
                    </TouchableOpacity>
                    <View>
                    <TouchableOpacity style={styles.musiccontentsmall}>
                    <Image source={adele} style={styles.smallimage}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.musiccontentsmall}>
                    <Image source={doja} style={styles.smallimage}/>
                    </TouchableOpacity>
                    </View>
                    <View>
                    <TouchableOpacity style={styles.musiccontentsmall}>
                    <Image source={arthur} style={styles.smallimage}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.musiccontentsmall}>
                    <Image source={kanye} style={styles.smallimage}/>
                    </TouchableOpacity>
                    </View>
                    
                    </View>
                </ScrollView>
                </View>

                {/* Live Radio */}
                <View style={{flexDirection:'row', }}>
                <Text style={{color:'white',fontSize:25,paddingLeft:'5%', paddingTop:20,}}> 
                 <Text style={{color:'white',fontWeight:'bold'}} >
                Live</Text> Radio </Text>
                <Octicons name="radio-tower" size={24} color="white"  style={{paddingTop:23, paddingLeft:7,}}/>
                </View>
                
                <TouchableOpacity style={{width:'90%', backgroundColor:'#1e202c', height: '6%',
                 marginLeft:'5%', borderRadius:35, marginTop:20,}}>
                     
                     <ImageBackground source={rad} style={{width:'100%', height:'100%', marginRight:20,borderRadius:20, opacity:1,}}>
                     <View style={{flexDirection:'row'}}>
                     <Text style={{position:'absolute', fontSize:25, fontWeight: 'bold', color:'white', paddingTop:10, paddingLeft:120,color:'white', }}> 
                     Listen Now</Text>
                     
                     </View>
                     </ImageBackground>
                 </TouchableOpacity>

                {/* Latest albums */}
                 <Text style={{color:'white',fontSize:25,paddingLeft:'5%', paddingTop:20,}}> 
                 <Text style={{color:'white',fontWeight:'bold'}} >
                Latest </Text> Albums </Text>
                
                <View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={{flexDirection:'row', marginBottom:200,}}>
                    <TouchableOpacity style={styles.albums}>
                    <Image source={arthur} style={styles.albumimage}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.albums}>
                    <Image source={doja} style={styles.albumimage3}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.albums}>
                    <Image source={adele} style={styles.albumimage2}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.albums}>
                    <Image source={kanye} style={styles.albumimage1}/>
                    </TouchableOpacity>
                    </View>
                </ScrollView>
                </View>





                
            </View>
            </ScrollView>
            
      
      
       
       
   );
}


const styles = StyleSheet.create({

    container: {
    backgroundColor: '#151723',
    height: "100%",
},

    header: {
        flexDirection: 'row',
        backgroundColor: '#1e202c',
        height: "7%",
        width: "90%",
        borderRadius:15,
        marginTop: "2%",
        alignSelf: "center",
    },
    headercontent: {
        height:'70%',
        width:'30%',
        backgroundColor: '#313341',
        marginLeft: '2%',
        borderRadius: 15,
        alignSelf: "center",
    },
    mainimage: {
        height:280,
        width:280,
        borderRadius: 25,
    },

    smallimage: {
        height:125,
        width:125,
        borderRadius: 20,
    },

    music: {
    flexDirection:'row', 
    },

    musiccontent: {
        height:280,
        width:280,
        backgroundColor: '#1e202c',
        marginLeft: 20,
        marginTop: 20,
        borderRadius: 15,
    },
    albums: {
        height:170,
        width:170,
        backgroundColor: '#1e202c',
        marginLeft: 20,
        marginTop: 20,
        borderRadius: 100,
       
    },
    albumimage: {
        height:170,
        width:170,
        borderRadius: 100,
        borderColor: 'orange',
       borderWidth: 5,
    },

    albumimage1: {
        height:170,
        width:170,
        borderRadius: 100,
        borderColor: 'white',
       borderWidth: 5,
    },
    albumimage2: {
        height:170,
        width:170,
        borderRadius: 100,
        borderColor: '#d9ab93',
       borderWidth: 5,
    },
    
    albumimage3: {
        height:170,
        width:170,
        borderRadius: 100,
        borderColor: '#ff4d99',
       borderWidth: 5,
    },
    musiccontentsmall:{
        height:125,
        width:125,
        borderRadius: 20,
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 5,
        backgroundColor: '#1e202c',
       
    },

});