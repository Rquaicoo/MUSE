import React ,{ Component, useState } from 'react';
import { StyleSheet, Text, View,Image, TouchableOpacity, StatusBar, TextInput, ScrollView } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';



class SignIn extends Component {

    state = {
        username: '',
        password: '',
        denied: false,
    }

    onUnsernameChange = (text) => {
        this.setState({username: text})
    }

    onPasswordChange = (text) => {
        this.setState({password: text})
    }

    handleRequest = (props) => {
        const payload = {
            username: this.state.username,
            password: this.state.password,
        }

        axios 
            .post('http://localhost:8000/museb/auth/login/', payload)
            .then(response => {
                const { token, user } = response.data;
                console.log(token);
                
                axios.defaults.headers.common.Authorization = "Token ${token}"

                this.props.navigation.navigate("Tabs");
            }).
            catch(
            this.setState({denied: true}));
    };

    redirectToSignUp = () => {
        this.props.navigation.navigate('SignUp');
    };
    render () {
        const { navigation } = this.props;
        return (
                    <ScrollView style={{  backgroundColor: '#151723', height: "100%", }}>
                        <View style={styles.container}>
                            <TouchableOpacity style={{borderColor: "#ffffff", borderWidth: 1, padding: "4%", borderRadius: 10, marginRight: 20}} onPress={() => navigation.navigate("Intro3")}>
                                <Ionicons name="chevron-back-sharp" size={24} color="white" />
                            </TouchableOpacity>
                                <Text style={{fontWeight:'bold', fontSize:30, color: "#fdfdfd", marginTop: "2%"}}>Log In</Text>
                        </View>

                   {this.state.denied  ? (
                        <LinearGradient
                        colors={['#8a3f82', '#bb4575', '#f65e69', '#f96e69']}
                        start={{x: 0, y: 0.5}}
                        end={{x: 1, y: 1}}
                        style={{borderRadius: 15, width: "90%", alignSelf: "center", marginTop: 20}}> 
                            <Text style={{fontWeight:'bold', fontSize:13, alignSelf:'center',color:'white', padding: "1%",}} >Username or password is incorrect</Text>
                        
                            </LinearGradient>
                   ) : <View></View>}
                        <View style={{marginLeft: "5%", marginTop: "20%"}}>
                            <Text style={{color: "white", }}>
                                Login with one of the following options
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
                            <Text  style={{fontWeight:'bold', fontSize:15, color: "#fdfdfd", }}>Username</Text>
                            <View style={{flexDirection: "row",}}>
                                    <TextInput style={{height: 60, borderColor: "#ffffff", borderWidth: 1,borderRadius: 15, paddingLeft: 10, marginTop: 8, color: "#ffffff", width: "95%",textAlign: "center", fontSize: 17}}
                                    placeholder="Enter your username" 
                                    onChangeText={this.onUnsernameChange.bind(this)}
                                    placeholderTextColor="#ffffff"
                                    defaultValue={this.state.username}
                                    />
                            </View>
                            
                            <Text  style={{fontWeight:'bold', fontSize:15, color: "#fdfdfd",  marginTop: "6%"}}>Password</Text>
                            <View style={{flexDirection: "row", }}>
                                    <TextInput style={{height: 60, borderColor: "#ffffff", borderWidth: 1,borderRadius: 15, paddingLeft: 10, marginTop: 8, color: "#ffffff", width: "95%",textAlign: "center", fontSize: 17 }}
                                    placeholder="Enter your password" 
                                    onChangeText={this.onPasswordChange.bind(this)}
                                    placeholderTextColor="#ffffff"
                                    secureTextEntry={true}
                                    defaultValue={this.state.password}
                                    />
                                    <AntDesign name="eyeo" size={24} color="white" style={{right: "60%", top: "6%"}} />
                            </View>
                        </View>

                        <TouchableOpacity style={{ marginTop: "8%",  width: "90%", alignSelf: "center", }} onPress={this.handleRequest.bind(this)}>
                        <LinearGradient
                        colors={['#8a3f82', '#bb4575', '#f65e69', '#f96e69']}
                        start={{x: 0, y: 0.5}}
                        end={{x: 1, y: 1}}
                        style={{borderRadius: 15}}> 
                            <Text style={{fontWeight:'bold', fontSize:20, alignSelf:'center',color:'white', padding: "4%",}} >Sign In</Text>
                        
                            </LinearGradient>
                            </TouchableOpacity>

                            <Text style={{fontWeight:'bold', fontSize:15, alignSelf:'center',color:'white', marginTop: 13}}  onPress={() => navigation.navigate("SignUp")}> Don't have an account? Sign up</Text>
                    </ScrollView>       
        );
    }
  
}



const styles = StyleSheet.create({

    container: {
    display: "flex",
    flexDirection: "row",
    marginTop: "20%",
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

// Wrap and export
export default function(props) {
    const navigation = useNavigation();
  
    return <SignIn {...props} navigation={navigation} />;
  }