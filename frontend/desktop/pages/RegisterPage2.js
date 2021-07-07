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
import { TextInput, HelperText} from 'react-native-paper';
import TextField from '@material-ui/core/TextField';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const RegisterPage2 = ({route}) =>{
  let [fontsLoaded] = useFonts({
    Comfortaa_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  });

  const theme = createMuiTheme({
    palette: {
      secondary: {
        main: '#5b06d5'
      }
    }
  });

  const firstName = route.params.firstName
  const lastName  = route.params.lastName
  const birthday  = route.params.birthday


  
  const navigation = useNavigation();
  function navigateBack() {
    navigation.goBack();
}

function goToNextPage (firstName, lastName, email, user, pass, passConfirm, birthday) {
  if (user == "" || pass  == "" ||  email  == ""){
    setRegisterMessage("Please enter all fields");
  }
  else if (user == "" && pass != "" && email != ""){
    setRegisterMessage("Please enter username");
  }
  else if (user != "" && pass == "" && email != ""){
    setRegisterMessage("Please enter password");
  }
  else if (user != "" && pass != "" && email == ""){
    setRegisterMessage("Please enter email");
  }
  else if (pass != passConfirm){
    setRegisterMessage("Passwords must match");
  }
  else{
    navigation.navigate('RegisterPage3', {firstName: firstName, lastName: lastName, email: email,  username: user, password: pass, birthday: birthday});
  }
  };
  
  
const [email, setEmail] = React.useState('');
const [user, setUser] = React.useState('');
const [pass, setPass] = React.useState('');
const [passConfirm, setPassConfirm] = React.useState('');
const [registerMessage,setRegisterMessage] = React.useState('');

const handleEmailChange = (event) => {
  setEmail(event.target.value);
};
const handleUserChange = (event) => {
  setUser(event.target.value);
};
const handlePassChange = (event) => {
  setPass(event.target.value);
};
const handlePassConfirmChange = (event) => {
  setPassConfirm(event.target.value);
};

const hasErrors = () => {
    return !(pass == passConfirm);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
      
    <TouchableOpacity onPress={() => navigateBack()}>
      <Ionicons name="arrow-back"  size={30} color="back" />
    </TouchableOpacity>
    <View style={styles.center}>
        <Text h1 style={styles.title}>Register</Text>
        <Text style={styles.verticalDivider}></Text>
        <MuiThemeProvider theme={theme}>
        <TextField 
          style={{width: 500}}
          color = 'secondary'
          label="Email" 
          variant="outlined" 
          value={email}
          onChange={handleEmailChange}
          />

        <Text style={styles.inputDivider}></Text>

        <TextField 
          style={{width: 500}}
          color = 'secondary'
          label="Username" 
          variant="outlined" 
          value={user}
          onChange={handleUserChange}
          />

        <Text style={styles.inputDivider}></Text>

        <TextField 
          style={{width: 500}}
          type="password"
          color = 'secondary'
          label="Password" 
          variant="outlined" 
          value={pass}
          onChange={handlePassChange}
          />
        
        <Text style={styles.inputDivider}></Text>

        <TextField 
          style={{width: 500}}
          type="password"
          color = 'secondary'
          label="Confirm Password" 
          variant="outlined" 
          value={passConfirm}
          onChange={handlePassConfirmChange}
          />
        <HelperText type="error">
            {registerMessage}
          </HelperText>
       </MuiThemeProvider>
        <Text style={styles.inputDivider}></Text>

       
         <View style={styles.fixToText}>
        <TouchableOpacity   onPress={()=>navigateBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>BACK</Text>
       </TouchableOpacity>
       <Text style={styles.buttonDivider}></Text>
       <TouchableOpacity  onPress={() => goToNextPage(firstName, lastName, email, user, pass, passConfirm, birthday)} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>NEXT</Text>
       </TouchableOpacity>
        </View>
        
         </View>
        
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
    width: 500,
 },
 center: {
  flex: 1,
  justifyContent: 'center',
  alignContent: 'center',
  alignSelf: 'center'
},
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 25
  },
   verticalDivider: {
    height:25,
  },
  inputDivider: {
    height:20,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  
export default RegisterPage2;