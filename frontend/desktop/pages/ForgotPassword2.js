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
import {  HelperText} from 'react-native-paper';
import TextField from '@material-ui/core/TextField';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import axios from 'axios'


export default function ForgotPassword2(){
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
    navigation.navigate('HomePage');
}

function goToNextPage (ucode, upass, upassConfirm) {
  if (ucode == "" || upass  == "" ||  upassConfirm  == ""){
    setMessage('Please fill in all fields');
  }
  else if (ucode == "" && upass != "" && upassConfirm != ""){
    setMessage("Please enter secret code (sent to your email)");
  }
  else if (ucode != "" && upass == "" && upassConfirm != ""){
    setMessage("Please enter password");
  }
  else if (upass != upassConfirm){
    setMessage("Passwords must match");
  }
  else{
    handleClickOpen();
  };
}
  

const [code, setCode] = React.useState('');
const [pass, setPass] = React.useState('');
const [passConfirm, setPassConfirm] = React.useState('');
const [message,setMessage] = React.useState('');
const [open, setOpen] = React.useState(false);


const handleCodeChange = (event) => {
  setCode(event.target.value);
};
const handlePassChange = (event) => {
  setPass(event.target.value);
};
const handlePassConfirmChange = (event) => {
  setPassConfirm(event.target.value);
};
const handleClickOpen = () => {
  setOpen(true);
};
const handleClose = () => {
  setOpen(false);
  navigation.navigate('HomePage')
};


  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
      
    <TouchableOpacity onPress={() => navigateBack()}>
      <Ionicons name="arrow-back"  size={30} color="back" />
    </TouchableOpacity>
    <View style={styles.center}>
        <Text h1 style={styles.title}>Reset Password</Text>
        <Text style={{width: 500, textAlign: 'center'}}>If you leave this page prior to form completion, 
        password recovery will be cancelled and you must restart the password recovery process again.</Text>
        <Text style={{height: 10}}></Text>
        <MuiThemeProvider theme={theme}>
        <TextField 
          style={{width: 500}}
          color = 'secondary'
          label="Secret Code (Sent to Your Email)" 
          variant="outlined" 
          value={code}
          onChange={handleCodeChange}
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
            {message}
        </HelperText>
       
        <Text style={styles.inputDivider}></Text>
         
       <Text style={styles.buttonDivider}></Text>
       <TouchableOpacity  onPress={() => goToNextPage(code, pass, passConfirm)} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>CONFIRM</Text>
       </TouchableOpacity>
        

        <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle >{"Password Reset successful!"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
           You may now login with your new password.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            OKAY
          </Button>
        </DialogActions>
      </Dialog>
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
    alignSelf: 'center'
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
    alignSelf: 'center',
    height:50,
    width: 500,
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
});
