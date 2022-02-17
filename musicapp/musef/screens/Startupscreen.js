import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet,Alert,Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';





export default function Startupscreen({ navigation }) {

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
  
  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1000,
       
        duration: 6000000,
        useNativeDriver: true, 
      }
    ).start()
      
    navigation.navigate('Tabs') 
  }, [fadeAnim])

  
  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim,         // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
    }


// You can then use your `FadeInView` in place of a `View` in your components:

  return (
    <View style={styles.container} >
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}  >
      <FadeInView > 
        <Text style={{fontSize: 60, textAlign: 'center',fontWeight:'bold',color:'white', margin: 10}}>muse.</Text>
      </FadeInView>
    </View>

    <TouchableOpacity/>
    <Text style={{fontSize:13,color:'white',marginBottom:20, textAlign:'center',  }}>Get Started</Text>
    
    </View>


  )

}

const styles = StyleSheet.create({

  container: {
  backgroundColor: '#151723',
  height: "100%",
},
});