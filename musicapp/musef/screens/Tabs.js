import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView} from 'react-native';

import Home from './Home';
import MyMusic from './mymusic';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator 
    
    screenOptions={{
        activeTintColor: '#ffc107',
        inactiveTintColor: '#bdbdbd',
        showLabel: false,
          tabBarStyle: {
              backgroundColor: '#151723',
              
          },
      }}
     >
      <Tab.Screen name="Browser" component={Home} 
      options={{ tabBarLabel:('Home'), headerShown: false , tabBarIcon: ({color}) => 
      <MaterialIcons name="library-music" size={24} color="white" /> }} />
      <Tab.Screen name="Artists" component={Home} 
      options={{ tabBarLabel:('Artists'), headerShown: false , tabBarIcon: ({color}) => 
      <MaterialCommunityIcons name="account-music-outline" size={24} color="white" /> }}/>
      <Tab.Screen name="Home" component={Home} 
      options={{ tabBarLabel:() => {return null}, headerShown: false , tabBarIcon: ({color}) => 
      <View style={{backgroundColor: "#151723"}}>
      <MaterialCommunityIcons name="home-circle" size={60} color="white" />
      </View>
    }}/>
      <Tab.Screen name="Genres" component={Home} 
      options={{ tabBarLabel:('Genres'), headerShown: false , tabBarIcon: ({color}) => 
      <Feather name="music" size={24} color="white" /> }}/>
      <Tab.Screen name="My Music" component={MyMusic} 
      options={{ tabBarLabel:('My Music'), headerShown: false , tabBarIcon: ({color}) => 
      <Ionicons name="headset-outline" size={24} color="white" /> }} />
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