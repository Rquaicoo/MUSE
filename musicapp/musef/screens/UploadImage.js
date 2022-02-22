import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function UploadImage() {
    const [selectedImage, setSelectedImage] = React.useState(null);
  
    let openImagePickerAsync = async () => {
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
      if (permissionResult.granted === false) {
        alert('Permission to access camera roll is required!');
        return;
      }
  
      let pickerResult = await ImagePicker.launchImageLibraryAsync();
  
      if (pickerResult.cancelled === true) {
        return;
      }
  
      setSelectedImage({ localUri: pickerResult.uri });
    };
  

 return (
            <View style={imageUploaderStyles.container}>
                        {
                            selectedImage  &&<Image source={{ uri: selectedImage.localUri }} style={{ width: 200, height: 200 }} />
                        }

            <View style={imageUploaderStyles.uploadBtnContainer}>
            <TouchableOpacity onPress={openImagePickerAsync} style={imageUploaderStyles.uploadBtn} >
            <Text>{selectedImage ? 'Edit' : 'Upload'} Image</Text>
            <AntDesign name="camera" size={20} color="black" />
            </TouchableOpacity>
            </View>


            </View>

 );
}

const imageUploaderStyles=StyleSheet.create({
   container:{
       elevation:2,
       height:200,
       width:200, 
       marginTop:5,
       marginLeft:5,
       backgroundColor:'#efefef',
       position:'relative',
       borderRadius:999,
       overflow:'hidden',
   },
   uploadBtnContainer:{
       opacity:0.5,
       position:'absolute',
       right:0,
       bottom:0,
       backgroundColor:'lightgrey',
       width:'100%',
       height:'25%',
   },
   uploadBtn:{
       display:'flex',
       alignItems:"center",
       justifyContent:'center'
   }
})