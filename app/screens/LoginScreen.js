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
import { TextInput, HelperText } from 'react-native-paper';

export default function LoginPage() {
  let [fontsLoaded] = useFonts({
    Comfortaa_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  });
  
  const navigation = useNavigation();
  function navigateBack() {
    navigation.goBack();
  }

  const userBlank = () => {
    return (user == "");
  }

  const [user, setUser] = React.useState('');
  const [pass, setPass] = React.useState('');

  const login = (user, pass) => {
    if (user == "" && pass  == "") {            //no username or password
      setLoginMessage("Please enter username and password");
    } else if (username == "" && pass != "") {  //no username
      setLoginMessage("Please enter username");
    } else if (username != "" && pass == "") {  //no password
      setLoginMessage("Please enter password");
    } else {                                    //login to api post
      axios.post('https://togethrgroup1.herokuapp.com/api/login', { 
        UserName: username,
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
  };

  var userEmpty = false;

  return (
    <SafeAreaView style={{flex: 1}}> {/iOS only/}
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigateBack()}>
        <Ionicons name="arrow-back" size={30} color="back" />
      </TouchableOpacity>
      <View style={styles.verticalDivider} />
      <Text h1 style={styles.title}>Log In</Text>
      <View style={styles.verticalDivider} />
        
      <TextInput style={{ alignSelf: 'stretch'}}
        label="Username"
        value={user}
        mode='outlined'
        onChangeText={user => setUser(user)}
      />

      <Text style={styles.inputDivider}></Text>

      <TextInput style={{ alignSelf: 'stretch'}}
        secureTextEntry
        //right={<TextInput.Icon name="eye"/>}
        label="Password"
        value={pass}
        mode='outlined'
        onChangeText={pass => setPass(pass)}
      />

      <Text style={styles.inputDivider}></Text>

      <TouchableOpacity
        onPress={() => login(user, pass)}
        style={styles.loginButton}
      >
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
  