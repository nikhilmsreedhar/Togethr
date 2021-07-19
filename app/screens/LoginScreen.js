import React, { useState } from 'react';
import axios from 'axios';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Text, TextInput, HelperText, Surface } from 'react-native-paper';

const LoginScreen = () => {
  
  const navigation = useNavigation();
  function navigateBack() {
    navigation.goBack();
  }

  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const login = (user, pass) => {
    navigation.navigate('Main');
    /*
    if (user == "" && pass  == "") {         //no username or password
      setLoginMessage("Please enter username and password");
    } else if (user == "" && pass != "") {  //no username
      setLoginMessage("Please enter username");
    } else if (user != "" && pass == "") {  //no password
      setLoginMessage("Please enter password");
    } else {                                    //login to api post
      axios.post('https://togethrgroup1.herokuapp.com/api/login', { 
        UserName: user,
        Password: pass
      })
      .then((response) => {
        navigation.navigate('Explore');
        console.log(response);
      }, (error) => {
        setLoginMessage('Incorrect Username or Password');
        console.log(error);
      }); 
    }
    */
  };

  var userEmpty = false;

  return (
    <View style={{
      flex: 1,
      alignItems: 'flex-start',
      margin: 25
    }}>
      <Button
        icon="arrow-left"
        onPress={() => navigateBack()}
      />
      
      <Surface
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          borderRadius: 4,
          paddingHorizontal: 15,
          paddingVertical: 30
        }}
      >
        <Text h1 style={{fontSize: 50, fontFamily: 'Comfortaa_400Regular'}}>Log In</Text>

        <TextInput
          style={{width: 500}}
          label="Username"
          value={user}
          mode='outlined'
          onChangeText={user => setUser(user)}
        />

        <TextInput
          secureTextEntry
          style={{width: 500}}
          label="Password"
          value={pass}
          mode='outlined'
          onChangeText={pass => setPass(pass)}
        />

        <HelperText type="error">
          {loginMessage}
        </HelperText>

        <Button
          style={{borderWidth: 3}}
          onPress={() => login(user, pass)}
          mode='outlined'
        >
        LOG IN
        </Button>
      </Surface>
    </View>
  );
}

/* Replace with Paper theme?
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
*/

export default LoginScreen;