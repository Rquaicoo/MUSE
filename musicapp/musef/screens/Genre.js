import {React} from 'react';
import { StyleSheet, Text, View,Image, ImageBackground, TouchableOpacity, ScrollView} from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';
import pop from "../assets/pop.png";
import afro from '../assets/afro.jpg';
import hits from '../assets/activate.jpg';
import kpop from '../assets/blackpink.png';
import randb from '../assets/adele.jpg';
import orchestra from '../assets/ochestra.jpeg';


export default function Genre({navigation}) {
   return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false} >
                    <View >
                        <View  style={styles.headerContainer}>
                            <View>
                                <Text style={styles.headerText}>Genres</Text>
                                <View style={{flexDirection: "row",}}>
                                    <Feather name="music" size={18} color="white" />
                                    <Text style={{fontSize:15,color:'white', paddingLeft:10,paddingTop:1,}}>6 Genres</Text>
                                </View>
                            </View>
                    

                            <View style={{marginLeft: "45%", display: "flex", flexDirection: "row", alignItems: "center"}}>
                                <TouchableOpacity style={{borderColor: "#343547", borderWidth: 1, alignContent: "center", justifyContent: "center", padding: 8, borderRadius: 20}}>
                                    <Feather name="search" size={21} color="white" />
                                </TouchableOpacity>
                                <Image source={require('../assets/memoji.png')} style={styles.image} />
                            </View>
                        </View>
                        
                        <TouchableOpacity style={{ marginBottom: "3%"}} onPress={() => navigation.navigate("MusicList", {genre: "Pop", image:pop})}>
                            <ImageBackground source={pop} style={styles.contentImages} imageStyle={{ borderRadius: 20}}>
                                <View style={{}}>
                                    <Text style={styles.insideImageText}>Pop</Text>
                                    <Text style={styles.insideImageText2}>300 Music</Text>
                                </View>
                                
                                <TouchableOpacity style={styles.insideImageCircle} >
                                    <AntDesign name="down" size={24} color="white" style={{padding: "10%"}} />
                                </TouchableOpacity> 
                            </ImageBackground>
                        </TouchableOpacity>

                        <View>
                            <View style={{marginLeft: -10, flexDirection: "row", }}>
                                <TouchableOpacity style={styles.tags}>
                                    <Text style={styles.tagText}>Happy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.tags}>
                                    <Text style={styles.tagText}>Sad</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.tagslong}>
                                    <Text style={styles.tagText}>Love</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{marginLeft: -10, flexDirection: "row", marginTop: "3%"}}>
                                <TouchableOpacity style={styles.tagslong}>
                                    <Text style={styles.tagText}>Film Movie</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.tags}>
                                    <Text style={styles.tagText}>Relax</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.tags}>
                                    <Text style={styles.tagText}>Dance</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection: "row", marginTop: "3%"}}>
                                <TouchableOpacity style={styles.tags}>
                                    <Text style={styles.tagText}>Cool</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.tagslong}>
                                    <Text style={styles.tagText}>Orchestra</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity style={{ marginBottom: "3%"}} onPress={() => navigation.navigate("MusicList", {genre: "Afro", image: afro})}>
                            <ImageBackground source={afro} style={styles.contentImages} imageStyle={{ borderRadius: 20}}>
                                <View style={{}}>
                                    <Text style={styles.insideImageText}>Afro</Text>
                                    <Text style={styles.insideImageText2}>300 Music</Text>
                                </View>
                                
                                <TouchableOpacity style={styles.insideImageCircle} >
                                    <AntDesign name="down" size={24} color="white" style={{padding: "10%"}} />
                                </TouchableOpacity> 
                            </ImageBackground>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginBottom: "3%",}} onPress={() => navigation.navigate("MusicList", {genre: "Hits", image: hits})}>
                            <ImageBackground source={hits} style={styles.contentImages} imageStyle={{ borderRadius: 20}} >
                                <View style={{}}>
                                    <Text style={styles.insideImageText}>Hits</Text>
                                    <Text style={styles.insideImageText2}>300 Music</Text>
                                </View>
                                
                                <TouchableOpacity style={styles.insideImageCircle} >
                                    <AntDesign name="down" size={24} color="white" style={{padding: "10%"}} />
                                </TouchableOpacity> 
                            </ImageBackground>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginBottom: "3%",}} onPress={() => navigation.navigate("MusicList", {genre: "Kpop", image: kpop})}>
                            <ImageBackground source={kpop} style={styles.contentImages} imageStyle={{ borderRadius: 20}}  >
                                <View style={{}}>
                                    <Text style={styles.insideImageText}>KPop</Text>
                                    <Text style={styles.insideImageText2}>300 Music</Text>
                                </View>
                                
                                <TouchableOpacity style={styles.insideImageCircle} >
                                    <AntDesign name="down" size={24} color="white" style={{padding: "10%"}} />
                                </TouchableOpacity> 
                            </ImageBackground>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginBottom: "3%",}} onPress={() => navigation.navigate("MusicList", {genre: "Rhythm", image: randb})}>
                            <ImageBackground source={randb} style={styles.contentImages} imageStyle={{ borderRadius: 20}} >
                                <View style={{}}>
                                    <Text style={styles.insideImageText}>Rhythm</Text>
                                    <Text style={styles.insideImageText2}>300 Music</Text>
                                </View>
                                
                                <TouchableOpacity style={{backgroundColor: "rgba(0,0,0,0.5)", height: "35%", width: "10%", marginLeft: "49%", marginTop: "10%", alignItems: "center", justifyContent: "center", borderRadius: 100,}} >
                                    <AntDesign name="down" size={24} color="white" style={{padding: "10%",}} />
                                </TouchableOpacity> 
                            </ImageBackground>
                        </TouchableOpacity>


                        <TouchableOpacity style={{ marginBottom: "3%",}} onPress={() => navigation.navigate("MusicList", {genre: "Orchestra", image: orchestra})}>
                            <ImageBackground source={orchestra} style={styles.contentImages} imageStyle={{ borderRadius: 20}}>
                                <View style={{}}>
                                    <Text style={styles.insideImageText}>Orc-{"\n"}hestra</Text>
                                    <Text style={styles.insideImageText2}>300 Music</Text>
                                </View>
                                
                                <TouchableOpacity style={{backgroundColor: "rgba(0,0,0,0.5)", height: "35%", width: "10%", marginLeft: "53%", marginTop: "10%", alignItems: "center", justifyContent: "center", borderRadius: 100,}} >
                                    <AntDesign name="down" size={24} color="white" style={{padding: "10%"}} />
                                </TouchableOpacity> 
                            </ImageBackground>
                        </TouchableOpacity>
                </View>
            </ScrollView>
   );
}


const styles = StyleSheet.create({
    container: { backgroundColor: '#141515',
    height: "100%",
    paddingLeft: "1%",
    },
  image: {
      height: 35,
      width: 35,
      resizeMode: "contain",
      borderRadius: 500,
      marginLeft: "20%",
      marginTop: -2,
    },
    headerContainer: {
      display: "flex",
      flexDirection: "row",
      marginTop: "10%",
      marginLeft: "5%"
    },
    headerText: {
      fontSize: 30,
      fontWeight: "bold",
      color: "#fff"
    },
    contentImages: {
        display: "flex",
        height: 100,
        width: "97%",
        resizeMode: "cover",
        alignSelf: "center",
        marginTop: 20,
        borderRadius: 20,
        flexDirection: "row"
        
    },

    insideImageText: {
        fontSize:15,
        color:'white', 
        fontWeight: "bold", 
        fontSize: 30, 
        marginLeft: 30, 
        marginTop: "10%"
    },

    insideImageText2: {
        fontSize:15,
        color:'white', 
        fontWeight: "100", 
        fontSize: 15,
         marginLeft: 30
    },

    insideImageCircle: {
        backgroundColor: "rgba(0,0,0,0.5)", 
        height: "35%", 
        width: "10%", 
        marginLeft: "60%", 
        marginTop: "10%", 
        alignItems: "center", 
        justifyContent: "center", 
        borderRadius: 100,
         
       
    },
    tags: {
        backgroundColor: "#323434", 
        height: 45, 
        width: 100, 
        borderRadius: 20, 
        justifyContent: "center", 
        alignContent: "center", 
        marginLeft: "5%",

    },
    tagslong: {
        backgroundColor: "#323434", 
        height: 45, 
        width: 145, 
        borderRadius: 20, 
        justifyContent: "center", 
        alignContent: "center", 
        marginLeft: "5%",
    },

    tagText: {
        fontSize:20,
        color:'white', 
        fontWeight: "bold", 
        fontSize: 17, 
        alignSelf: "center" 

    },

});