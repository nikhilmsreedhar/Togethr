import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import {
  useFonts,
  Comfortaa_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/dev';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { TextInput} from 'react-native-paper';


export default function RegisterScreen() {
  let [fontsLoaded] = useFonts({
    Comfortaa_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  });
  
  const navigation = useNavigation();
  
  function navigateBack() {
    navigation.goBack();
  }

  function goToNextPage(fname, lname) {
    if (fname == "" || lname == "") {
      alert('Please fill in all fields') ;
    } else {
      navigation.navigate('RegisterScreen2', {firstName: fname, lastName: lname});
    }
  }

  /* TO BE ADDED
  function calculate_age(dob1){
    var today = new Date();
    var birthDate = new Date(dob1);  
    var age_now = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age_now--;
    }
    console.log(age_now);
    return age_now;
  }
  */

  const [fname, setFirst] = React.useState('');
  const [lname, setLast] = React.useState('');

  const next = (fname, lname) => {
    alert('First: ' + fname + ' Last: '+ lname);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigateBack()}>
        <Ionicons name="arrow-back"  size={30} color="back" />
      </TouchableOpacity>
      <Text style={styles.verticalDivider}></Text>
      <Text h1 style={styles.title}>Register</Text>
      <Text style={styles.verticalDivider}></Text>
          
      <TextInput
        style={{ alignSelf: 'stretch'}}
        label="First Name"
        value={fname}
        mode='outlined'
        onChangeText={fname => setFirst(fname)}
      />
      
      <Text style={styles.inputDivider}></Text>

      <TextInput
        style={{ alignSelf: 'stretch'}}
        label="Last Name"
        value={lname}
        mode='outlined'
        onChangeText={lname => setLast(lname)}
      />

      <Text style={styles.inputDivider}></Text>

      <TouchableOpacity
        onPress={() => {goToNextPage(fname, lname)}}
        style={styles.loginButton}
      >
        <Text style={styles.loginButtonText}>NEXT</Text>
      </TouchableOpacity>

    </View>
  );
}


const styles = StyleSheet.create({
  title: {
    fontSize: 50, 
    fontFamily: 'Comfortaa_400Regular',
  },
  input:{
    padding: 20,
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
  loginButton: {
    backgroundColor: "black",
    borderColor:"black",
    alignSelf: 'stretch',
    height:50,
    borderWidth:3,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 5,
  },
  loginButtonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Roboto_500Medium'
  }, 
});
  