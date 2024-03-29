import {React, useState, useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Image,Modal, TouchableOpacity, Alert, ImageBackground,ScrollView} from 'react-native';
import { Feather, AntDesign,Entypo, Ionicons,FontAwesome5, SimpleLineIcons,FontAwesome, MaterialCommunityIcons,MaterialIcons,  } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import memoji from '../assets/memoji.png';
import UploadImage from './UploadImage';

const logout = (token, navigate) => {
    fetch('https://musebeta.herokuapp.com/museb/auth/logout/',{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({'token': token})
        })
        .then(() => {
            AsyncStorage.removeItem('token');
        })
        .then(() => {
           navigate('SignIn');
        })
        .catch(error => console.log(error))
}

const showAlert = () => {
    Alert.alert(
        'Not Available',
        'This feature will be available soon',
        [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
    );
}

export default function myprofile ({navigation}) {

    const [token, setToken] = useState(null);
    const [userImage, setUserImage] = useState(null);
    const [user, setUser] = useState([]);

    


    useEffect(() => {
        AsyncStorage.getItem('token')
        .then(token => {
            setToken(token);
            fetch('https://musebeta.herokuapp.com/museb/getuser/',{
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({'user_token': token})
            })
            .then(response => response.json())
            .then(jsonResponse => 
                setUser(jsonResponse))
            .catch(error => console.log(error));

            fetch('https://musebeta.herokuapp.com/museb/getuserimage/',{
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({'user_token': token})
            })
            .then(response => response.json())
            .then(jsonResponse => 
                setUserImage(jsonResponse[0].image))
            .catch(error => console.log(error));
            

           })
           
    }, [])
    return(
        <ScrollView>
        <View style={styles.container}>
            <View  style={styles.headerContainer}>
            <View>
            <Ionicons name="arrow-back-outline" size={30} color="white"  onPress={() => navigation.goBack()} style={{paddingTop:6,}}/>
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
             <TouchableOpacity style={styles.albums}  >
                 <View style={styles.border}>
                   {/*<UploadImage/>*/}
                   <Image source={{
                       uri: "https://musebeta.herokuapp.com" + userImage
                   }} style={styles.albumimage3}/> 
                </View>
            </TouchableOpacity>
            
            <Text style={styles.text}>{user.username}</Text>
            <Text style={styles.text1}>{user.email}</Text>

        {/* Details */}
        
        <View style={{marginTop: '15%',opacity:0.8}}>
            <TouchableOpacity style={styles.details} onPress={showAlert()}>
            <MaterialCommunityIcons name="account-edit-outline" size={30} color="white"  style={{paddingRight:'5%'}} />
            <Text style={{color:'white', fontSize:20,  paddingRight:'40%'}}> Edit Profile</Text>
            <Entypo name="chevron-right" size={30} color="white" />
            </TouchableOpacity>
            <View style={{backgroundColor: "#343547",width: "85%", height: 1, marginLeft: "7%", marginTop: 9, marginBottom:25,}}/>
               
            <TouchableOpacity style={styles.details} onPress={() => navigation.navigate("ListenLater")}>
            <AntDesign name="playcircleo" size={30} color="white"  style={{paddingRight:'5%'}} />
            <Text style={{color:'white', fontSize:20,  paddingRight:'37%'}}> Listen Later</Text>
            <Entypo name="chevron-right" size={30} color="white" />
            </TouchableOpacity>
            <View style={{backgroundColor: "#343547",width: "85%", height: 1, marginLeft: "7%", marginTop: 9, marginBottom:25,}} />

            <TouchableOpacity style={styles.details} onPress={() => navigation.navigate("LocalAudio")}>
            
            <MaterialCommunityIcons name="progress-download" size={30} color="white"  style={{paddingRight:'5%'}} />
            <Text style={{color:'white', fontSize:20,  paddingRight:'38%'}}> Downloads</Text>
            <Entypo name="chevron-right" size={30} color="white" />
            </TouchableOpacity>
            <View style={{backgroundColor: "#343547",width: "85%", height: 1, marginLeft: "7%", marginTop: 9, marginBottom:25,}}/>

            
            <TouchableOpacity style={styles.details} onPress={() => logout(token, navigation.navigate)} >
            <SimpleLineIcons name="logout"size={28} color="white"  style={{paddingRight:'5%'}} />
            <Text style={{color:'white', fontSize:20, paddingRight:'48%'}}> Logout</Text>
            <Entypo name="chevron-right" size={30} color="white" />
            </TouchableOpacity>
            <View style={{backgroundColor: "#343547",width: "85%", height: 1, marginLeft: "7%", marginTop: 9, marginBottom:25,}}/>

        </View>


        <Text style={{ color:'white', fontSize:17, textAlign:'center', paddingTop:10 ,paddingBottom:50, paddingRight:10,}}> Version 1.0.1</Text>










        </View>
            </ScrollView>
    );}


const styles = StyleSheet.create({

    container: {
        backgroundColor: "#141515",
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
        backgroundColor: '#141515',
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