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
import {HelperText} from 'react-native-paper';
import TextField from '@material-ui/core/TextField';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import NavigationBar from '../components/NavigationBar';


const ChangePassword = ({route}) =>{
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

  
  const navigation = useNavigation();
  function navigateBack() {
    navigation.goBack();
}

  
const [curpass, setCurPass] = React.useState('');
const [pass, setPass] = React.useState('');
const [passConfirm, setPassConfirm] = React.useState('');
const [message, setMessage] = React.useState('');


const handleCurPassChange = (event) => {
    setCurPass(event.target.value);
  };
const handlePassChange = (event) => {
  setPass(event.target.value);
};
const handlePassConfirmChange = (event) => {
  setPassConfirm(event.target.value);
};

// Add update pass function and check if old pass word is correct function
function change(pass, passConfirm){
    if (pass != passConfirm){
        setMessage('Passwords must match');
    }
    else {
        setMessage('Success');
    }
}

  return (
    <SafeAreaView style={{flex: 1}}>
       <NavigationBar/>
    <View style={styles.container}>
    <View style={styles.center}>
        <Text h1 style={styles.title}>Change Password</Text>
        <Text style={styles.verticalDivider}></Text>
        <MuiThemeProvider theme={theme}>
        <TextField 
          style={{width: 500}}
          type="password"
          color = 'secondary'
          label="Current Password" 
          variant="outlined" 
          value={curpass}
          onChange={handleCurPassChange}
          />
        
        <Text style={styles.inputDivider}></Text>


        <TextField 
          style={{width: 500}}
          type="password"
          color = 'secondary'
          label="New Password" 
          variant="outlined" 
          value={pass}
          onChange={handlePassChange}
          />
        
        <Text style={styles.inputDivider}></Text>

        <TextField 
          style={{width: 500}}
          type="password"
          color = 'secondary'
          label="Confirm New Password" 
          variant="outlined" 
          value={passConfirm}
          onChange={handlePassConfirmChange}
          />
          <HelperText type="error">
            {message}
          </HelperText>
       
        <Text style={styles.inputDivider}></Text>

       
         <View style={styles.fixToText}>
        <TouchableOpacity   onPress={()=>navigateBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>BACK</Text>
       </TouchableOpacity>
       <Text style={styles.buttonDivider}></Text>
       <TouchableOpacity  onPress={() =>change(pass, passConfirm)} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>NEXT</Text>
       </TouchableOpacity>
        </View>

        </MuiThemeProvider>
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

export default ChangePassword;