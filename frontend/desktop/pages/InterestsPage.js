import React, { useState } from 'react'
import axios from 'axios';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import {
  useFonts,
  Comfortaa_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_300Light,
} from '@expo-google-fonts/dev';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {HelperText} from 'react-native-paper';
import MultipleSelectChips from '../components/MultipleSelectChips';
import '../../../models/user';





const InterestsPage = ({route}) =>{
  let [fontsLoaded] = useFonts({
    Comfortaa_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_300Light
  });

  

  
  const navigation = useNavigation();
  function navigateBack() {
    navigation.goBack();
  }

  const [interests, setInterests] = useState([])
  const [registerMessage,setRegisterMessage] = React.useState('');
	const [error, setError] = useState("")
	const options = [
  {value: "Animals", isSelected: false},
  {value: "Beauty", isSelected: false},
  {value: "Cars", isSelected: false},
  {value: "Fine Arts", isSelected: false},
  {value: "Food", isSelected: false},
  {value: "DIY", isSelected: false},
  {value: "Gaming", isSelected: false},
  {value: "Lifestyle", isSelected: false},
  {value: "Movies", isSelected: false},
  {value: "Music", isSelected: false},
  {value: "Outdoors", isSelected: false},
  {value: "Performing Arts", isSelected: false},
  {value: "Photography", isSelected: false},
  {value: "Shopping", isSelected: false},
  {value: "Sight Seeing", isSelected: false},
  {value: "Sports", isSelected: false},
  {value: "Technology", isSelected: false},
  {value: "Travel", isSelected: false},
  ]
//check email formatting --listen to existing email response
//unique username? --listen for existing username response
//password formats? pw length > 7, parse + check for isdig()


//copy to mobile
  const tags = (interests) => {
    if (interests.length === 0){
      alert('Please select at least one interest');
    }
    else{
      alert(JSON.stringify(interests));
      };
    };


  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
      
    <TouchableOpacity onPress={() => navigateBack()}>
      <Ionicons name="arrow-back"  size={30} color="back" />
    </TouchableOpacity>
    <View style={styles.center}>
        <Text h1 style={styles.title}>Register</Text>

        <MultipleSelectChips
          label="Your Interests"
          value={interests}
          setValue={setInterests}
          options={options}
          error={error}
          setError={setError}
        />
         <HelperText type="error">
            {registerMessage}
          </HelperText>

          <Text style={styles.inputDivider}></Text>
         <View style={styles.fixToText}>
        <TouchableOpacity   onPress={()=>navigateBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>BACK</Text>
       </TouchableOpacity>
       <Text style={styles.buttonDivider}></Text>
       <TouchableOpacity onPress={() => register(firstName, lastName, username, password, birthday, interests)} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>REGISTER</Text>
       </TouchableOpacity>
       </View>
        
        </View>
   </View>
  
    </SafeAreaView>
  
  );

  
}



const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    fontSize: 50, 
    fontFamily: 'Comfortaa_400Regular',
  },
  input:{
    padding: 20, 
  
 },
 center: {
  flex: 1,
  justifyContent: 'center',
  alignContent: 'center',
  alignSelf: 'center', 
  width: 500
},
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 25
  },
   verticalDivider: {
    height:50,
  },
  inputDivider: {
    height:20,
  },
  fixToText: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  nextButton: {
    backgroundColor: "black",
    borderColor:"black",
    alignSelf: 'stretch',
    height:50,
    width: 245,
    borderWidth:3,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 5,
  },
  nextButtonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Roboto_500Medium'
  }, 
  backButton: {
    backgroundColor: "grey",
    borderColor:"grey",
    width:245,
    height:50,
    borderWidth:3,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Roboto_500Medium'
  }, 
  buttonDivider: {
    width:10,
  },
});

export default InterestsPage;