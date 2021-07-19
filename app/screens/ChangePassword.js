import * as React from 'react';
import { StyleSheet, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Text, TextInput, HelperText } from 'react-native-paper';
import axios from 'axios';

const ChangePassword = ({route}) => {

  const navigation = useNavigation();
  function navigateBack() {
    navigation.goBack();
  }

  function changePassword(oldpass, newpass) {
    if (oldpass == newpass) {                     //passwords mismatched
      setRegisterMessage("Password is the same.");
    } else {
      alert('Old Password: ' + oldpass +
            ' New Password: '+ newpass);
      axios.post('https://togethrgroup1.herokuapp.com/api/changepassword', { 
        OldPassword: oldpass,
        Password: newpass,
      })
      .then((response) => {
        handleClickOpen();
        console.log(response);
      }, (error) => {
        setRegisterMessage('Invalid fields');
        console.log(error);
      });
    }
  };

  const [pass, setPass] = React.useState('');
  const [passConfirm, setPassConfirm] = React.useState('');

  const hasErrors = () => {
    return !(pass == passConfirm);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
      <Button
        icon="arrow-left"
        onPress={() => navigateBack()}
      />

      <Text style={styles.verticalDivider} />
      <Text h1 style={styles.title}>Register</Text>
      <Text style={styles.verticalDivider} />
      
      <TextInput style={{ alignSelf: 'stretch'}}
        label="Old Password"
        value={user}
        mode='outlined'
        onChangeText={user => setUser(user)}
      />

      <Text style={styles.inputDivider} />

      <TextInput style={{ alignSelf: 'stretch'}}
        secureTextEntry
        label="New Password"
        value={newPass}
        mode='outlined'
        onChangeText={pass => setPass(pass)}
      />
        
      <Text style={styles.inputDivider} />

      <TextInput style={{ alignSelf: 'stretch'}}
        secureTextEntry
        label="Confirm New Password"
        value={newPassConfirm}
        mode='outlined'
        error = {(newPass == newPassConfirm) ? false : true}
        onChangeText={passConfirm => setPassConfirm(passConfirm)}
      />

      <HelperText type="error" visible={hasErrors()}>
        Passwords do not match.
      </HelperText>

      <Text style={styles.inputDivider} />

      <TouchableOpacity
        disabled = {(pass == passConfirm) ? false : true}
        onPress={()=> register(firstName, lastName, user, pass)}
        style={styles.regButton}
      >
        <Text style={styles.regButtonText}>REGISTER</Text>
      </TouchableOpacity>        
    </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  title: {
    fontSize: 50, 
    fontFamily: 'Comfortaa_400Regular'
  },
  input:{
    padding: 20
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
  regButton: {
    backgroundColor: "black",
    borderColor:"black",
    alignSelf: 'stretch',
    height:50,
    borderWidth:3,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 5,
  },
  regButtonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Roboto_500Medium'
  }, 
});

export default ChangePassword;