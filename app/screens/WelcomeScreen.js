import React from 'react';
import { StyleSheet, View, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Text } from 'react-native-paper';

const WelcomeScreen = () => {

  const navigation = useNavigation();

  //Functions
  function navigateToLogin() {
    navigation.navigate("LoginScreen");
  }

  function navigateToRegister() {
    navigation.navigate("RegisterScreen");
  }

  //Render
  return (
    <View style={styles.container}>
      <Text h1
        style={{
          fontSize: 100,
          fontFamily: 'Comfortaa_400Regular',
          marginBottom: 50
        }}
      >
        Togethr
      </Text>

      <View style={{
        flexDirection: 'row',
        justifyContent: "space-around",
      }}>
        <Button
          style= {{ borderWidth: 3, marginHorizontal: 5 }}
          mode="outlined"
          onPress={() => navigateToLogin()}
        >
        LOG IN
        </Button>
        <Button
          style = {{ borderWidth: 3, marginHorizontal: 5 }}
          mode="contained"
          onPress={() => navigateToRegister()}
        >
        REGISTER
        </Button>
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
  