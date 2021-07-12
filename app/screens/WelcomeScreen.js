import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {
  useFonts,
  Comfortaa_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/dev';
import { useNavigation } from '@react-navigation/native';

function WelcomeScreen() {
  let [fontsLoaded] = useFonts({
    Comfortaa_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  });

  const navigation = useNavigation();

  //functions
  function navigateToLogin() {
    navigation.navigate("LoginScreen");
  }

  function navigateToRegister() {
    navigation.navigate("RegisterScreen");
  }
 
  return (
    <View style={styles.container}>
      <Text h1
        style={{
          fontSize: 100,
          fontFamily: 'Comfortaa_400Regular'
        }}
      >
        Togethr
      </Text>
      <View style={{height: 50}} />
      <View style={styles.fixToText}>
        <TouchableOpacity onPress={() => navigateToLogin()} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>LOG IN</Text>
        </TouchableOpacity>
        <View style={styles.buttonDivider} />
        <TouchableOpacity onPress={() => navigateToRegister()} style={styles.registerButton}>
          <Text style={styles.registerButtonText}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {                //default alignment vertical
    flex: 1, 
    justifyContent: 'center', //align main
    alignItems: 'center'      //align secondary
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loginButton: {
    backgroundColor: "white",
    borderColor:"black",
    width:150,
    height:50,
    borderWidth:3,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 5,
  },
  loginButtonText: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Roboto_500Medium'
  }, 
  registerButton: {
    backgroundColor: "black",
    borderColor:"black",
    width:150,
    height:50,
    borderWidth:3,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 5,
  },
  registerButtonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Roboto_500Medium'
  }, 
  buttonDivider: {
    width:10,
  },
});

export default WelcomeScreen;
  