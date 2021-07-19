import * as React from 'react';
import { View } from 'react-native';
import { Avatar, Button, Surface, Text } from 'react-native-paper';

const Profile = () => {

  return (
    <View>
      <Text>Your Profile</Text>
      <Surface
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Avatar.Icon icon="account"/>

        <Button mode="contained">Change Password</Button>
        <Button 
          contentStyle={{color:'red'}}
          mode="outlined">Delete Account</Button>
      </Surface>
    </View>
  );
};

export default Profile;