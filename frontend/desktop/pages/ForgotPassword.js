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


export default function ForgotPassword(){
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

function goToNextPage (uname) {
 if (uname == ""){
    setMessage("Please enter username");
  }
else{
    axios.patch('https://togethrgroup1.herokuapp.com/api/forgotpassword',{
      UserName: uname
    })
    .then(
      (response) => 
      {console.log(response);
      handleClickOpen();},
      (error) => 
      {console.log(error);
      setMessage("This username does not exist");}
      );
  };
}
  
  
const [user, setUser] = React.useState('');
const [message,setMessage] = React.useState('');
const [open, setOpen] = React.useState(false);

const handleUserChange = (event) => {
    setUser(event.target.value);
};

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
  navigation.navigate('ForgotPassword2')
};


  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
    <TouchableOpacity onPress={() => navigateBack()}>
      <Ionicons name="arrow-back"  size={30} color="back" />
    </TouchableOpacity>
    <View style={styles.center}>
        <Text h1 style={styles.title}>Forgot Password</Text>
        <Text style={styles.verticalDivider}></Text>
        <MuiThemeProvider theme={theme}>
        <TextField 
          style={{width: 500}}
          color = 'secondary'
          label="Username" 
          variant="outlined" 
          value={user}
          onChange={handleUserChange}
          />
       
        <HelperText type="error">
            {message}
          </HelperText>
       
        <Text style={styles.inputDivider}></Text>

       
         <View style={styles.fixToText}>
        <TouchableOpacity   onPress={()=>navigateBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>CANCEL</Text>
       </TouchableOpacity>
       <Text style={styles.buttonDivider}></Text>
       <TouchableOpacity  onPress={() => goToNextPage(user)} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>NEXT</Text>
       </TouchableOpacity>
        </View>

        <Dialog
        open={open}
        onClose={handleClose}
      >
         <DialogTitle >{"Password Recovery Initiated!"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Please check the email associated with this account for a secret code to reset your pasword. 
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
