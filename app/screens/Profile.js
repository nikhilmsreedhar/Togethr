import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import { View, StyleSheet } from 'react-native';
import { Avatar, Button, Modal, Portal, Surface, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
import ChangePassword from './ChangePassword';

const Profile = () => {
  var _ud = SecureStore.getItemAsync('user_data');
  var ud = JSON.parse(_ud);
  var fname = ud.firstName;
  var lname = ud.lastName;
  var initials = fname.charAt(0).toUpperCase() + lname.charAt(0).toUpperCase()
  const fullName = fname[0].toUpperCase() + fname.substring(1) + " " + lname[0].toUpperCase() + lname.substring(1);
  var tags = ud.interests;

  const navigation = useNavigation();

  //for showing warning
  const [visible, setVisible] = React.useState(false);
  const confirmDelete = () => setVisible(true);
  const hidePassDeleteWarning = () => setVisible(false);

  function deleteAccount() {
    axios.delete('https://togethrgroup1.herokuapp.com/api/login')
      .then(() => navigation.navigate('WelcomeScreen'));
  }

  return (
    <View>
      <Portal>
        <Modal
          visible = {visible}
          onDismiss= { hidePassDeleteWarning }
        >
          <Text>Are you sure you want to delete your account?</Text>
          <Button
            color="red"
            mode="outlined"
            onPress={deleteAccount}
          >
            DELETE
          </Button>
        </Modal>
      </Portal>

      <Text>Your Profile</Text>
      <Surface
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
          
        <Avatar.Icon icon="account"/>
        
        <View>
          <Text>Name: {fullName}</Text>
          <Text>Your Interests: {tags}</Text>
        </View>

        <Button
          mode="contained"
          onPress={navigation.navigate(ChangePassword)}
        >
          Change Password
        </Button>

        <Button
          color="red"
          mode="outlined"
          onPress={confirmDelete}
        >
          Delete Account
        </Button>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 60, 
    fontFamily: 'Comfortaa_400Regular',
    alignSelf: 'center', 
  },
  text:{
    fontSize: 30, 
    alignSelf: 'center',
 },
  settingsButton:{
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
   
});

export default Profile;