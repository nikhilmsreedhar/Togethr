import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import {
  useFonts,
  Comfortaa_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/dev';
import { useNavigation } from '@react-navigation/native';
import { HelperText } from 'react-native-paper';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import NavigationBar from '../components/NavigationBar';


export default function EditAccountInfo() {
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



const [first, setFirst] = React.useState('VALUE');
const [last, setLast] = React.useState('VALUE');
const [email, setEmail] = React.useState('VALUE');
const [user, setUser] = React.useState('VALUE');
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
const handleFirstChange = (event) => {
  setFirst(event.target.value);
};
const handleLastChange = (event) => {
    setLast(event.target.value);
  };
const handleUserChange = (event) => {
    setUser(event.target.value);
  };
const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  
// Add update pass function and check if old pass word is correct function
function change(pass, passConfirm){
    if (pass != passConfirm){
        setMessage('Passwords must match');
    }
    else {
      axios.patch('https://togethrgroup1.herokuapp.com/api/edituser', { 
        Password: pass
      })
      .then((response) => {
        var UserData = {firstName:response.data.FirstName, lastName:response.data.LastName, username:response.data.UserName, id:response.data.id, interests: response.data.Tags}
        localStorage.setItem('user_data', JSON.stringify(UserData));
        console.log(response);
        setMessage('Your Password was changed!');
      }, (error) => {
        console.log(error);
        setMessage('Something went wrong! Try again.');
      });
    }
}




 return (
  
    <SafeAreaView style={{flex: 1}}>
    <NavigationBar/>
     <View style={styles.container}>
    
        <View style={styles.center}>
        <Text h1 style={styles.title}>Account </Text>
        <Text style={styles.verticalDivider}></Text>
        <Text Text style={styles.inputDivider}></Text>
        
        <MuiThemeProvider theme={theme}>
        <Text style={styles.subtitle}>Profile</Text>

        <Text Text style={styles.inputDivider}></Text>

        <TextField 
          color = 'secondary'
          label="First Name" 
          variant="outlined" 
          value={first}
          onChange={handleFirstChange}
          />

        <Text Text style={styles.inputDivider}></Text>

        <TextField 
          color = 'secondary'
          label="Last Name" 
          variant="outlined" 
          value={last}
          onChange={handleLastChange}
          />

        <Text Text style={styles.inputDivider}></Text>

        <TextField 
          color = 'secondary'
          label="Username" 
          variant="outlined" 
          value={user}
          onChange={handleUserChange}
          />

        <Text Text style={styles.inputDivider}></Text>

        <TextField 
          color = 'secondary'
          label="Email Address" 
          variant="outlined" 
          value={email}
          onChange={handleEmailChange}
          />
     

        <Text Text style={styles.inputDivider}></Text>

         <TouchableOpacity onPress={() => alert(email)} style={styles.postButton}>
          <Text style={styles.postButtonText}>SAVE</Text>
         </TouchableOpacity>

         <Text Text style={styles.inputDivider}></Text>

         <Divider/>

         <Text Text style={styles.inputDivider}></Text>

         <Text style={styles.subtitle}>Password</Text>

         <Text Text style={styles.inputDivider}></Text>

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
       
          <Text Text style={styles.inputDivider}></Text>

        <TouchableOpacity onPress={() =>change(pass, passConfirm)} style={styles.postButton}>
        <Text style={styles.postButtonText}>UPDATE PASSWORD</Text>
        </TouchableOpacity>

        <Text Text style={styles.inputDivider}></Text>

            <Divider/>

         </MuiThemeProvider>
        </View>
    </View>
    </SafeAreaView>
   
    
  );
}


const styles = StyleSheet.create({
  title: {
    fontSize: 60, 
    fontFamily: 'Comfortaa_400Regular',
    alignSelf: 'center', 
  },
  subtitle: {
    fontSize: 30, 
  },
  input:{
    width: 500,
 },
  closeButton:{
    alignSelf: 'flex-end'
  },
  center: {
    flex: 1,
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
    height:10,
  },
  inputDivider: {
    height:20,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonDivider: {
    width:10,
  },
  postButton: {
    backgroundColor: "black",
    borderColor:"black",
    width:500,
    height:50,
    borderWidth:3,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 5,
  },
  postButtonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Roboto_500Medium'
  }, 
});
  