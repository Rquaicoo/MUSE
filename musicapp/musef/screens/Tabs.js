import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';

import Browser from './Browser';
import MyMusic from './mymusic';
import Genre from './Genre';
import Home from './Home';
import AllPopularArtists from './AllArtists';

import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import artists from './artists';
const Tab = createBottomTabNavigator();

function Tabs({navigation}) {
  return (
    <Tab.Navigator 
    
    screenOptions={{
        activeTintColor: '#343547',
        inactiveTintColor: '#bdbdbd',
        showLabel: false,
          tabBarStyle: {
              backgroundColor: '#141515',
              height:'11%',
              alignItems: "center",
              justifyContent: "center",
              
          },
          tabBarLabelStyle: {
            fontSize: 13,
            marginTop: -30
          },
          tabBarIconStyle: {
            marginTop: -25
          }
      }}

      tabBarOptions={{
      }}
     >
      <Tab.Screen name="Browser" component={Browser} 
      options={{ tabBarLabel:('Browser'), headerShown: false , tabBarIcon: ({color}) => 
      <MaterialIcons name="library-music" size={30} color="white" /> }} />

      <Tab.Screen name="Artists" component={artists} 
      options={{ tabBarLabel:('Artists'), headerShown: false , tabBarIcon: ({color}) => 
      <MaterialCommunityIcons name="account-music-outline" size={30} color="white" /> }}/>

      <Tab.Screen name="Home" component={Home} 
      options={{ tabBarLabel:() => {return null}, headerShown: false , tabBarIcon: ({color}) => 
        <TouchableOpacity  component={Home} style={{height:70, width:70, backgroundColor:'#282A2A', borderRadius:100, marginTop:33,}} onPress={() => navigation.navigate("Home")}>
        <Foundation name="home" size={34} color="white" style={{ paddingTop:17,paddingLeft:23,}} />
        </TouchableOpacity>
    }}/>

      <Tab.Screen name="Genres" component={Genre} 
      options={{ tabBarLabel:('Genres'), headerShown: false , tabBarIcon: ({color}) => 
      <Feather name="music" size={30} color="white" /> }}/>
      
      <Tab.Screen name="My Music" component={MyMusic} 
      options={{ tabBarLabel:('My Music'), headerShown: false , tabBarIcon: ({color}) => 
      <Ionicons name="headset-outline" size={30} color="white" /> }} />
    </Tab.Navigator>
  );
}

const styles= StyleSheet.create({
iconStyle1:{
  
  shadowColor: 'black',
  shadowOpacity: 0.5,
  shadowRadius: 5,
  
  shadowOffset: {
      width: 0,            
      height: 2,           
  },
  
},
});
export default Tabs;