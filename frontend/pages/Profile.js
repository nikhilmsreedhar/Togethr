import * as React from 'react';
import { Text, View } from 'react-native';


function Profile() {
  const [username, setUser] = React.useState('');
  const [pass, setPass] = React.useState('');

  const handleUserChange = (event) => {
    setUser(event.target.value);
  };
  const handlePassChange = (event) => {
    setPass(event.target.value);
  };

  // Edit Password
  function changePass(){
    if (pass == ""){
      alert("Password cannot be empty");
    }
    else{
      axios.post('', { 
        Password: pass
      })
      .then((response) => {
        alert("Password Changed Successfuly")
        console.log(response);
      }, (error) => {
        alert("Something went wrong. Try again.")
        console.log(error);
      });
    }
  }

  // Edit Username
  function changeUsername(){
    if (username == ""){
      alert("Username cannot be empty");
    }
    else{
      axios.post('', { 
        UserName: username
      })
      .then((response) => {
        alert("Username Changed Successfuly")
        console.log(response);
      }, (error) => {
        alert("Something went wrong. Try again.")
        console.log(error);
      });
    }
  }

  // Edit Interests/Tags
  function changeInterests(){
    // navigate to InterestsPage set tags equal to returned array
    var tags = [];
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile!</Text>
    </View>
  );
}

export default Profile;