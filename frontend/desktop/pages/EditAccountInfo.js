import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import {
  useFonts,
  Comfortaa_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/dev';
import axios from 'axios';
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

  

  var _ud = localStorage.getItem('user_data');
  var ud = JSON.parse(_ud);
  var fname = ud.firstName;
  var lname = ud.lastName;
  var uemail = ud.emailAddress;
  var uuser = ud.username;
  var userid = ud.id;



const [first, setFirst] = React.useState(stringify(fname));
const [last, setLast] = React.useState(stringify(lname));
const [email, setEmail] = React.useState(stringify(uemail));
const [username, setUser] = React.useState(stringify(uuser));
const [curpass, setCurPass] = React.useState('');
const [pass, setPass] = React.useState('');
const [passConfirm, setPassConfirm] = React.useState('');
const [pwerrormessage, setPWErrorMessage] = React.useState('');
const [successmessage, setSuccessMessage] = React.useState('');
const [pwmessage, setPWMessage] = React.useState('');
const [message, setMessage] = React.useState('');
const [errormessage, setErrorMessage] = React.useState('');


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

function stringify(object) {
    var str = JSON.stringify(object);
    return ((str === "") ?  str : str.replace(/\"/g, ""));
    
    
}

function editProfile(first, last, username, email, uuser, uemail){
  if (first == "" || last  == "" || username =="" || email  == ""){
    setMessage();
    setErrorMessage('Please fill in all fields');
    return;
  }
  if (username != uuser){
    // send security email
  }
  if (email != uemail){
    // send security emails to email and uemail
  }
  axios.patch('https://togethrgroup1.herokuapp.com/api/edituser', {
      id: userid, 
      FirstName: first,
      LastName: last,
      UserName: username,
      Email: email
    })
    .then((response) => {
      var UserData = {firstName:response.data.FirstName, lastName:response.data.LastName, username:response.data.UserName, 
        id:userid, interests: response.data.Tags, emailAddress: response.data.Email}
      localStorage.setItem('user_data', JSON.stringify(UserData));
      console.log(response);
      setErrorMessage();
      setMessage('Your information was updated!');
    }, (error) => {
      console.log(error);
      setMessage();
      setErrorMessage('Something went wrong! Try again.');
  });
}



// Add update pass function and check if old pass word is correct function
function change(curpass, pass, passConfirm){
    if (curpass === "" || pass === "" || passConfirm === ""){
      setPWMessage();
      setSuccessMessage();
      setPWErrorMessage('Please fill in all fields');
    }
    else{
        // first check that old pw is correct for security
        axios.post('https://togethrgroup1.herokuapp.com/api/login', { 
        UserName: username,
        Password: curpass
      })
      .then((response) => {
        console.log(response);
        if (pass != passConfirm){
          setPWMessage();
          setSuccessMessage();
          setPWErrorMessage('Passwords must match');
        }
        else {
            // hash pw
            axios.patch('https://togethrgroup1.herokuapp.com/api/editpassword', { 
            id: userid,
            Password: pass
          })
          .then((response) => {
            console.log(response);
            setPWMessage();
            setPWErrorMessage();
            setSuccessMessage('Your password was updated!');
          }, (error) => {
            console.log(error);
            setPWMessage();
            setSuccessMessage();
            setPWErrorMessage('Something went wrong! Try again.');
          });
        }

      }, (error) => {
        console.log(error);
        setSuccessMessage();
        setPWErrorMessage();
        setPWMessage('Incorrect Password');
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
          value={username}
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
     

          <HelperText type="error">
            {errormessage}
          </HelperText>
          <HelperText type="success">
            {message}
          </HelperText>
                 
          <Text Text style={styles.inputDivider}></Text>

         <TouchableOpacity onPress={() => editProfile(first, last, username, email, uuser, uemail)} style={styles.postButton}>
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
          <HelperText type="error">
            {pwmessage}
          </HelperText>
        
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
            {pwerrormessage}
          </HelperText>
          <HelperText type="success">
            {successmessage}
          </HelperText>
                 
          <Text Text style={styles.inputDivider}></Text>

        <TouchableOpacity onPress={() =>change(curpass, pass, passConfirm)} style={styles.postButton}>
        <Text style={styles.postButtonText}>UPDATE PASSWORD</Text>
        </TouchableOpacity>

        <Text Text style={styles.inputDivider}></Text>

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
  