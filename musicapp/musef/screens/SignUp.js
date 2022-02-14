import {React, useState } from 'react';
import { StyleSheet, Text, View,Image, TouchableOpacity, StatusBar, TextInput, ScrollView, ActionSheetIOS } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';



export default function SignUp ({navigation}) {

    function handleRequest() {
        const payload = {
            username: {username},
            email: {email},
            password: {password}
        }
        console.log(payload)

        axios
            .post('http://127.0.0.1:8000/museb/auth/register/', payload)
            .then(response => {
                const { token, user} = response.data;
                
                console.log(token);
                //set returned token as default authorization header
                axios.defaults.headers.common.Authorization = 'Token ${token}';

                //navigate to home screen
                navigation.navigate("Tabs");
            })
            .catch(error => console.log(error));
    }

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [secure, setSecure] = useState(true)

   return (
        <ScrollView style={{  backgroundColor: '#151723', height: "100%", }}>
        <View style={styles.container}>
            <TouchableOpacity style={{borderColor: "#ffffff", borderWidth: 1, padding: "4%", borderRadius: 10, marginRight: 20}} onPress={() => navigation.navigate("SignIn")}>
                <Ionicons name="chevron-back-sharp" size={24} color="white" />
            </TouchableOpacity>
                <Text style={{fontWeight:'bold', fontSize:30, color: "#fdfdfd", marginTop: "2%"}}>Sign Up</Text>
        </View>

        <View style={{marginLeft: "5%", marginTop: "20%"}}>
            <Text style={{color: "white", }}>
                Sign up with one of the following options
            </Text>

            <View style={{display: "flex", flexDirection: "row"}}>
                <TouchableOpacity style={styles.iconContainer}>
                <AntDesign name="google" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconContainer}>
                <AntDesign name="apple-o" size={24} color="white" />
                </TouchableOpacity>
            </View>
        </View>
        
        
        <View style={{marginLeft: "5%", marginTop: "6%"}}>
                <Text  style={{fontWeight:'bold', fontSize:15, color: "#fdfdfd", }}>Name</Text>
                <View style={{flexDirection: "row",}}>
                        <TextInput style={{height: 60, borderColor: "#ffffff", borderWidth: 1,borderRadius: 15, paddingLeft: 10, marginTop: 8, color: "#ffffff", width: "95%",textAlign: "center", fontSize: 17}}
                        placeholder="Enter your name" 
                        onChangeText={username => setUsername(username)}
                        placeholderTextColor="#ffffff"
                        defaultValue={username}
                        />
                </View>
            <Text  style={{fontWeight:'bold', fontSize:15, color: "#fdfdfd", marginTop: "6%" }}>Email</Text>
            <View style={{flexDirection: "row",}}>
                    <TextInput style={{height: 60, borderColor: "#ffffff", borderWidth: 1,borderRadius: 15, paddingLeft: 10, marginTop: 8, color: "#ffffff", width: "95%",textAlign: "center", fontSize: 17}}
                    placeholder="Enter your email" 
                    onChangeText={email => setEmail(email)}
                    placeholderTextColor="#ffffff"
                    defaultValue={email}
                    />
            </View>
            
            <Text  style={{fontWeight:'bold', fontSize:15, color: "#fdfdfd",  marginTop: "6%"}}>Password</Text>
            <View style={{flexDirection: "row", }}>
                    <TextInput style={{height: 60, borderColor: "#ffffff", borderWidth: 1,borderRadius: 15, paddingLeft: 10, marginTop: 8, color: "#ffffff", width: "95%",textAlign: "center", fontSize: 17 }}
                    placeholder="Enter your password" 
                    onChangeText={password => setPassword(password)}
                    placeholderTextColor="#ffffff"
                    secureTextEntry={secure}
                    defaultValue={password}
                    />
                    <AntDesign name="eyeo" size={24} color="white" style={{right: "60%", top: "6%"}} onPress ={() => setSecure(!secure)} />
            </View>
        </View>

        <TouchableOpacity style={{ marginTop: "8%",  width: "90%", alignSelf: "center", }} onPress={this.handleRequest}>
        <LinearGradient
        colors={['#8a3f82', '#bb4575', '#f65e69', '#f96e69']}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 1}}
        style={{borderRadius: 15}}> 
            <Text style={{fontWeight:'bold', fontSize:20, alignSelf:'center',color:'white', padding: "4%",}} >Sign Up</Text>
           
            </LinearGradient>
            </TouchableOpacity>

            <Text style={{fontWeight:'bold', fontSize:15, alignSelf:'center',color:'white', marginTop: 13}} onPress={() => navigation.navigate("SignIn")}> Already have an account? Sign in</Text>
    </ScrollView>       
);
}


const styles = StyleSheet.create({

container: {
display: "flex",
flexDirection: "row",
marginTop: "12%",
marginLeft: "5%"
},

iconContainer: {
borderColor: "#1f1f1f",
borderWidth: 2,
borderRadius: 10,
paddingLeft: "20%",
paddingRight: "20%",
paddingTop: "4%",
paddingBottom: "4%",
marginTop: "5%",
marginRight: "3%",
backgroundColor: "#151723",
}
});