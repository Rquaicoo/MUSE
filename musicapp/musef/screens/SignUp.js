import {React, useState } from 'react';
import { StyleSheet, Text, View,Image, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';



export default function SignUp ({navigation}) {

    const [name, setText] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

   return (
            <View style={{  backgroundColor: '#151723', height: "100%", justifyContent: "center", }}>
                <View style={styles.container}>
                        <Text style={{fontWeight:'bold', fontSize:35, alignSelf:'center',color:'white', marginBottom: 50,marginTop: "60%"}}> muse.</Text>
                </View>


                <View>
                <View style={{flexDirection: "row",alignItems: "center", justifyContent: "center",}}>
                    <Ionicons name="person-outline" size={24} color="white" style={{position: "absolute", left: "13%", bottom: "25%"}}/>
                        <TextInput style={{height: 50, borderColor: "#ffffff", borderWidth: 1,borderRadius: 15, paddingLeft: 10, marginTop: 10, color: "#ffffff", width: "80%",textAlign: "center"}}
                        placeholder="Enter your name" 
                        onChangeText={name => setText(name)}
                        placeholderTextColor="#ffffff"
                        maxLength={30}
                        defaultValue={name}
                        />
                        
                </View>

                <View style={{flexDirection: "row",alignItems: "center", justifyContent: "center",}}>
                <MaterialIcons name="email" size={24} color="white" style={{position: "absolute", left: "13%", bottom: "25%"}}/>
                        <TextInput style={{height: 50, borderColor: "#ffffff", borderWidth: 1,borderRadius: 15, paddingLeft: 10, marginTop: 20, color: "#ffffff", width: "80%",textAlign: "center"}}
                        placeholder="Enter your email" 
                        onChangeText={email => setEmail(email)}
                        placeholderTextColor="#ffffff"
                        defaultValue={email}
                        />
                        
                </View>

                <View style={{flexDirection: "row",alignItems: "center", justifyContent: "center", alignContent: "center"}}>
                <AntDesign name="lock1" size={24} color="white" style={{position: "absolute", left: "13%", bottom: "25%"}}/>
                        <TextInput style={{height: 50, borderColor: "#ffffff", borderWidth: 1,borderRadius: 15, paddingLeft: 10, marginTop: 20, color: "#ffffff", width: "80%",textAlign: "center", marginLeft: "7%"}}
                        placeholder="Set password" 
                        onChangeText={password => setPassword(password)}
                        placeholderTextColor="#ffffff"
                        secureTextEntry={true}
                        defaultValue={password}
                        />
                        <AntDesign name="eyeo" size={24} color="white" style={{right: "60%", top: "2%"}} />
                </View>
                </View>

                <TouchableOpacity style={{ marginTop: "30%",  width: "75%", alignSelf: "center", }} onPress={() => navigation.navigate("Tabs")}>
                <LinearGradient
                colors={['#8a3f82', '#bb4575', '#f65e69', '#f96e69']}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 1}}
                style={{borderRadius: 5}}> 
                    <Text style={{fontWeight:'bold', fontSize:20, alignSelf:'center',color:'white', padding: "3%",}} >Sign Up</Text>
                   
                    </LinearGradient>
                    </TouchableOpacity>
            </View>       
   );
}


const styles = StyleSheet.create({

    container: {
    alignContent: "center",
    marginTop: -40,
},
});
