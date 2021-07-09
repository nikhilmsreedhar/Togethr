import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import {
  useFonts,
  Comfortaa_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/dev';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { TextInput, HelperText, Checkbox } from 'react-native-paper';
//import DatePicker from 'react-native-date-picker';
import axios from 'axios';

const RegisterScreen2 = ({route}) => {
  let [fontsLoaded] = useFonts({
    Comfortaa_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  });

  const firstName = route.params.firstName
  const lastName  = route.params.lastName

  const navigation = useNavigation();
  function navigateBack() {
    navigation.goBack();
  }

  function register(firstName, lastName, user, pass) {
    if (user == "" || pass  == "" ||  email  == "") {
      setRegisterMessage("Please enter all fields");
    } else if (user == "" && pass != "" && email != "") { //missing username
      setRegisterMessage("Please enter username");
    } else if (user != "" && pass == "" && email != "") { //missing password
      setRegisterMessage("Please enter password");
    } else if (user != "" && pass != "" && email == "") { //missing email
      setRegisterMessage("Please enter email");
    } else if (pass != passConfirm) {                     //passwords mismatched
      setRegisterMessage("Passwords must match.");
    } else {
      alert('First: ' + firstName +
            ' Last: '+ lastName +
            ' Email: '+ email +
            ' Username: ' + user +
            ' Password: '+ pass);
      axios.post('https://togethrgroup1.herokuapp.com/api/adduser', { 
        UserName: user,
        Password: pass,
        FirstName: firstName,
        LastName: lastName,
        Email: email
      })
      .then((response) => {
        handleClickOpen();
        console.log(response);
      }, (error) => {
        setRegisterMessage('Invalid fields');
        console.log(error);
      });
    }
  }; //end register function

  const [user, setUser] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [passConfirm, setPassConfirm] = React.useState('');

  const hasErrors = () => {
    return !(pass == passConfirm);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
      
      <TouchableOpacity onPress={() => navigateBack()}>
        <Ionicons name="arrow-back"  size={30} color="back" />
      </TouchableOpacity>

      <Text style={styles.verticalDivider}></Text>
      <Text h1 style={styles.title}>Register</Text>
      <Text style={styles.verticalDivider}></Text>
      
      <TextInput style={{ alignSelf: 'stretch'}}
        label="Username"
        value={user}
        mode='outlined'
        onChangeText={user => setUser(user)}
      />

      <Text style={styles.inputDivider}></Text>

      <TextInput style={{ alignSelf: 'stretch'}}
        secureTextEntry
        label="Password"
        value={pass}
        mode='outlined'
        onChangeText={pass => setPass(pass)}
      />
        
      <Text style={styles.inputDivider}></Text>

      <TextInput style={{ alignSelf: 'stretch'}}
        secureTextEntry
        label="Confirm Password"
        value={passConfirm}
        mode='outlined'
        error = {(pass == passConfirm) ? false : true}
        onChangeText={passConfirm => setPassConfirm(passConfirm)}
      />

      <HelperText type="error" visible={hasErrors()}>
        Passwords do not match.
      </HelperText>

      <Text style={styles.inputDivider}></Text>

      <TouchableOpacity
        disabled = {(pass == passConfirm) ? false : true}
        onPress={()=> register(firstName, lastName, user, pass)}
        style={styles.regButton}
      >
        <Text style={styles.regButtonText}>REGISTER</Text>
      </TouchableOpacity>        
    </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  title: {
    fontSize: 50, 
    fontFamily: 'Comfortaa_400Regular'
  },
  input:{
    padding: 20
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
  regButton: {
    backgroundColor: "black",
    borderColor:"black",
    alignSelf: 'stretch',
    height:50,
    borderWidth:3,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 5,
  },
  regButtonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Roboto_500Medium'
  }, 
});

export default RegisterScreen2;