import * as React from 'react';
import { Text, View , SafeAreaView} from 'react-native';

import NavigationBar from '../components/NavigationBar';

function Profile() {
  const [user, setUser] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [tags, setTags] = React.useState('');

  const handleUserChange = (event) => {
  setUser(event.target.value);
  };
  const handlePassChange = (event) => {
    setPass(event.target.value);
  };
  const handleTagsChange = (event) =>{
    setTags(event.target.values)
  }

  // Edit Password
  function changePass(){
    localStorage.setItem('pass', pass);
    alert('Password Changed');
  }

  // Edit Username
  function changeUsername(){
    localStorage.setItem('user', user);
    alert('Username Changed');
  }

  // Edit Interests/Tags
  function changeInterests(){
    localStorage.setItem('tags', tags);
    alert('Interests Changed');
  }

  // Delete Account
  function deleteAccount(){
    db.removeUser(user)
    .then((response) => {
      navigation.navigate('HomePage');
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }

  return (
    <SafeAreaView style={{flex: 1}}>
    <NavigationBar/>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile!</Text>
    </View>
    </SafeAreaView>
  );
}

export default Profile;