import {React, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Image,Modal, TouchableOpacity, TouchableWithoutFeedback, ImageBackground,ScrollView} from 'react-native';
import { Feather, AntDesign,Entypo, Ionicons,FontAwesome5, SimpleLineIcons,FontAwesome, MaterialCommunityIcons,MaterialIcons,  } from '@expo/vector-icons';
import memoji from '../assets/memoji.png';

export default function myprofile ({navigation}) {

    return(
        <ScrollView>
        <View style={styles.container}>
            <View  style={styles.headerContainer}>
            <View>
            <Ionicons name="arrow-back-outline" size={30} color="white"  onPress={() => navigation.navigate("Home")} style={{paddingTop:6,}}/>
             <View style={{flexDirection:'row'}}>
                </View>
            </View>
            
            <View style={{marginLeft: "67%", display: "flex", flexDirection: "row", alignItems: "center"}}>
                <TouchableOpacity style={{borderColor: "#343547", borderWidth: 1, alignContent: "center", justifyContent: "center", padding: 8, borderRadius: 20}}>
                <Entypo name="light-up" size={21} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity style={{borderColor: "#343547", borderWidth: 1, padding: 8,marginLeft:10, borderRadius: 20}}>
                  <SimpleLineIcons name="settings"  size={21} color="white"/>
                  </TouchableOpacity>
                 
            </View>
             </View>
                {/* Artist Image */}
             <TouchableOpacity style={styles.albums}>
                 <View style={styles.border}>
                    <Image source={memoji} style={styles.albumimage3}/>
                </View>
            </TouchableOpacity>
            <Text style={styles.text}>James Sakai</Text>
            <Text style={styles.text1}>0203 000 0000</Text>

        {/* Details */}
        
        <View style={{marginTop: '15%',opacity:0.8}}>
            <TouchableOpacity style={styles.details}>
            <MaterialCommunityIcons name="account-edit-outline" size={30} color="white"  style={{paddingRight:'5%'}} />
            <Text style={{color:'white', fontSize:25, fontWeight:'bold', paddingRight:'40%'}}> Edit Profile</Text>
            <Entypo name="chevron-right" size={30} color="white" />
            </TouchableOpacity>
            <View style={{backgroundColor: "#343547",width: "85%", height: 1, marginLeft: "7%", marginTop: 9, marginBottom:25,}}/>
               
            <TouchableOpacity style={styles.details}>
            <AntDesign name="playcircleo" size={30} color="white"  style={{paddingRight:'5%'}} />
            <Text style={{color:'white', fontSize:25, fontWeight:'bold', paddingRight:'37%'}}> Listen Later</Text>
            <Entypo name="chevron-right" size={30} color="white" />
            </TouchableOpacity>
            <View style={{backgroundColor: "#343547",width: "85%", height: 1, marginLeft: "7%", marginTop: 9, marginBottom:25,}}/>

            <TouchableOpacity style={styles.details}>
            <Ionicons name="videocam-outline"size={28} color="white"  style={{paddingRight:'5%'}} />
            <Text style={{color:'white', fontSize:25, fontWeight:'bold', paddingRight:'37%'}}> Watch Later</Text>
            <Entypo name="chevron-right" size={30} color="white" />
            </TouchableOpacity>
            <View style={{backgroundColor: "#343547",width: "85%", height: 1, marginLeft: "7%", marginTop: 9, marginBottom:25,}}/>

            <TouchableOpacity style={styles.details}>
            <MaterialIcons name="history" size={30} color="white"  style={{paddingRight:'5%'}} />
            <Text style={{color:'white', fontSize:25, fontWeight:'bold', paddingRight:'50%'}}> History</Text>
            <Entypo name="chevron-right" size={30} color="white" />
            </TouchableOpacity>
            <View style={{backgroundColor: "#343547",width: "85%", height: 1, marginLeft: "7%", marginTop: 9, marginBottom:25,}}/>

            <TouchableOpacity style={styles.details}>
            
            <MaterialCommunityIcons name="progress-download" size={30} color="white"  style={{paddingRight:'5%'}} />
            <Text style={{color:'white', fontSize:25, fontWeight:'bold', paddingRight:'38%'}}> Downloads</Text>
            <Entypo name="chevron-right" size={30} color="white" />
            </TouchableOpacity>
            <View style={{backgroundColor: "#343547",width: "85%", height: 1, marginLeft: "7%", marginTop: 9, marginBottom:25,}}/>
        </View>


        <Text style={{ color:'white', fontSize:17, textAlign:'center', paddingTop:10 ,paddingBottom:50, paddingRight:10,}}> Version 1.0.0.1</Text>










        </View>
            </ScrollView>
    );}


const styles = StyleSheet.create({

    container: {
        backgroundColor: "#151723",
        height: "100%",
        
    },

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

      albums: {
        height:220,
        width:220,
        backgroundColor: '#1e202c',
        marginTop: '10%',
        marginBottom: '10%',
        borderRadius: 200,
        alignSelf: 'center',
        
       
    },
    albumimage3: {
        height:200,
        width:200,
        borderRadius: 200,
        marginLeft:5,
        marginTop:5,
       
    },
    border:{
        height:220,
        width:220,
        borderRadius: 200,
        borderColor: 'white',
        borderWidth: 5,
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "white",
        alignSelf: "center",
    },
    text1: {
        fontSize: 22,
        color: "white",
        alignSelf: "center",
    },

    details: {
        
        flexDirection: 'row',
        padding: 10,
        alignSelf: 'center',
    },
});