import * as React from 'react';
import axios from 'axios';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { TextInput, HelperText } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginPage() {
  
  const navigation = useNavigation();
  function navigateBack() {
    navigation.goBack();
  }

  const [user, setUser] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [loginMessage,setLoginMessage] = React.useState('');

  // This is where the logic for the login function will be added
  const login = (user, pass) => {
    if (user == "" && pass  == ""){
      setLoginMessage("Please enter username and password");
    } else if (user == "" && pass != "") {
      setLoginMessage("Please enter username");
    } else if (user != "" && pass == "") {
      setLoginMessage("Please enter password");
    } else {
      axios.post('https://togethrgroup1.herokuapp.com/api/login', { 
        UserName: user,
        Password: pass
      })
      .then(async (response) => {
        console.log(response);
        var UserData = {
          firstName: response.data.FirstName,
          lastName: response.data.LastName,
          username: response.data.UserName, 
          id: response.data.id,
          interests: response.data.Tags,
          emailAddress: response.data.Email
        };
        // store JSON object
        await AsyncStorage.setItem('user_data', JSON.stringify(UserData));
        // if tags are empty go to choose tags
        if(response.data.Tags.length > 0){
          navigation.navigate('LoggedIn');
        } else {
          navigation.navigate('EditTags');
        }
      }, (error) => {
        setLoginMessage('Incorrect Username or Password');
        console.log(error);
      });
    }
  };


  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
    <TouchableOpacity onPress={() => navigateBack()}>
      <Ionicons name="arrow-back"  size={30} color="back" />
    </TouchableOpacity>
      <Text style={styles.verticalDivider}></Text>
        <Text h1 style={styles.title}>Log In</Text>
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
         <HelperText type="error">
          {loginMessage}
        </HelperText>

          <Text style={styles.inputDivider}></Text>

         <TouchableOpacity  onPress={() => login(user, pass)} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>LOG IN</Text>
         </TouchableOpacity>
   </View>
  
    
    </SafeAreaView>
    

    
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
  