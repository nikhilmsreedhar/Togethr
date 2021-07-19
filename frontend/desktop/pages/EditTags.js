import React, { useState } from 'react'
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
import NavigationBar from '../components/NavigationBar';
import axios from 'axios';



const EditTags = ({route}) =>{
  const t = {};
  let [fontsLoaded] = useFonts({
    Comfortaa_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_300Light
  });
  
  var _ud = localStorage.getItem('user_data');
  var ud = JSON.parse(_ud);
  var tags = ud.interests;
  var userid = ud.id;

  const [interests, setInterests] = useState(tags)
  const [message,setMessage] = React.useState('');
  const [successmessage,setSuccessMessage] = React.useState('');
	const [error, setError] = useState("")

	const options = [
  {label: "Movie", value: "Movie"}, 
  {label: "Music", value: "Music"}, 
  {label: "Sports", value: "Sports"},
  {label: "Outdoors", value:"Outdoors"}, 
  {label: "Food", value: "Food"}, 
  {label: "Animals", value: "Animals"},
  {label: "Beauty", value:"Beauty"}, 
  {label: "Gaming", value: "Gaming"}, 
  {label: "Sight Seeing", value: "Sight Seeing"},
  {label: "Technology", value: "Technology"}, 
  {label: "DIY", value: "DIY"}, 
  {label: "Travel", value: "Travel"},
  {label: "Performing Arts", value: "Performing Arts"}, 
  {label: "Fine Arts", value: "Fine Arts"}, 
  {label: "Cars", value: "Cars"},
  {label: "Photography", value: "Photography"}, 
  {label: "Lifestyle", value: "Lifestyle"}, 
  {label: "Shopping", value: "Shopping"},
]



// This is where you will add the logic for the edit function
function edit (tagList) {
   if (tagList.length === 0){
    setSuccessMessage();
    setMessage("Please select at least one interest");
  }
  else{
      axios.patch('https://togethrgroup1.herokuapp.com/api/edituser', { 
      id: userid,
      Tags: tagList
    })
    .then((response) => {
      var UserData = {firstName:response.data.FirstName, lastName:response.data.LastName, username:response.data.UserName, 
      id: userid, interests: response.data.Tags, emailAddress: response.data.Email}
      localStorage.setItem('user_data', JSON.stringify(UserData));
      console.log(response);
      setMessage();
      setSuccessMessage('You changed your Interests!');
    }, (error) => {
      console.log(error);
      setSuccessMessage();
      setMessage('Something went wrong! Try again.');
    });
  }
};


  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationBar/>
    <View style={styles.container}>
    <View style={styles.center}>
        <Text h1 style={styles.title}>Your Interests</Text>

        <MultipleSelectChips
          label="Your Interests"
          value={interests}
          setValue={setInterests}
          options={options}
          error={error}
          setError={setError}
        />
        <View style={{alignSelf: 'center'}}> 
         <HelperText type="error">
            {message}
          </HelperText>
          <HelperText type="succcess">
            {successmessage}
          </HelperText>
          </View>
          
        <Text style={styles.inputDivider}></Text>
        
          
          <TouchableOpacity onPress={() => edit(interests)} style={styles.nextButton}>
              <Text style={styles.nextButtonText}>CONFIRM</Text>
          </TouchableOpacity>
     
        
        </View>
   </View>
  
    </SafeAreaView>
  
  );

  
}



const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    fontSize: 60, 
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
    width: 500,
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
  
});

export default EditTags;
