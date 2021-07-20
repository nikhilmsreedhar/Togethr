import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Text, TextInput, HelperText, Checkbox } from 'react-native-paper';
import axios from 'axios';

const RegisterScreen2 = ({route}) => {

  const firstName = route.params.firstName
  const lastName  = route.params.lastName

  const navigation = useNavigation();
  function navigateBack() {
    navigation.goBack();
  }

  function register(firstName, lastName, email, user, pass) {
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
        Email: email,
        Verified: 'false'
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

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [passConfirm, setPassConfirm] = useState('');
  const [registerMessage, setRegisterMessage] = useState('');

  const hasErrors = () => {
    return !(pass == passConfirm);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
      
      <TouchableOpacity onPress={() => navigateBack()}>
        <Ionicons name="arrow-back"  size={30} color="back" />
      </TouchableOpacity>
      <Button 
        onPress={() => navigateBack()}
      />

      <Text style={styles.verticalDivider} />
      <Text h1 style={styles.title}>Register</Text>
      <Text style={styles.verticalDivider} />
      
      <TextInput style={{ alignSelf: 'stretch'}}
        label="Username"
        value={user}
        mode='outlined'
        onChangeText={user => setUser(user)}
      />

      <TextInput style={{ alignSelf: 'stretch'}}
        label="Email"
        value={email}
        mode='outlined'
        onChangeText={email => setEmail(email)}
      />

      <TextInput style={{ alignSelf: 'stretch'}}
        secureTextEntry
        label="Password"
        value={pass}
        mode='outlined'
        onChangeText={pass => setPass(pass)}
      />

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

      <View
        style={{flexDirection: 'row'}}
      >
        <Button
          disabled={(pass == passConfirm) ? false : true}
          onPress={() => navigateBack()}
        >
          BACK
        </Button>

        <Button
          disabled={(pass == passConfirm) ? false : true}
          onPress={() => register(firstName, lastName, email, user, pass, passConfirm, birthday)}
        >
          REGISTER
        </Button>
      </View>
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