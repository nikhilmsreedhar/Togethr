import React, { useState } from 'react';
import { Button, View } from 'react-native';
import { Chip } from 'react-native-paper';

const tagList = [
  {value: "Animals", isSelected: false},
  {value: "Beauty", isSelected: false},
  {value: "Cars", isSelected: false},
  {value: "Fine Arts", isSelected: false},
  {value: "Food", isSelected: false},
  {value: "DIY", isSelected: false},
  {value: "Gaming", isSelected: false},
  {value: "Lifestyle", isSelected: false},
  {value: "Movies", isSelected: false},
  {value: "Music", isSelected: false},
  {value: "Outdoors", isSelected: false},
  {value: "Performing Arts", isSelected: false},
  {value: "Photography", isSelected: false},
  {value: "Shopping", isSelected: false},
  {value: "Sight Seeing", isSelected: false},
  {value: "Sports", isSelected: false},
  {value: "Technology", isSelected: false},
  {value: "Travel", isSelected: false}
]

//Recieve an array of strings corresponding to tags
//Render two columns of checkboxes with tags
//Check boxes that correspond to strings in tag array
//On checking the box, add that value to the array
//On clicking submit, send that array 


const Tags = () => {
  //for setting selection state of chips
  const [selected, setSelection] = useState([]);
  const [tags, setTags] = useState([]);

  function editTags (tagList) {
    if (tagList.length === 0){
        setSuccessMessage();
        setMessage("Please select at least one interest");
    } else {
      axios.patch('https://togethrgroup1.herokuapp.com/api/edituser', { 
        id: userid,
        Tags: tagList
      })
      .then(async (response) => {
        var UserData = {
          firstName:response.data.FirstName,
          lastName:response.data.LastName,
          username:response.data.UserName, 
          id: userid,
          interests: response.data.Tags,
          emailAddress: response.data.Email
        }
          await AsyncStorage.setItem('user_data', JSON.stringify(UserData));
          console.log(response);
          setMessage();
          setSuccessMessage('You changed your Interests!');
      }, (error) => {
        console.log(error);
        setSuccessMessage();
        setMessage('Something went wrong! Try again.');
      });
    }
  };

  return (
    <View style = {{flex:1, padding: 20}}>
      {
      tagList.map((item, index) => {
        return (
          <View></View>
          // <View style={{margin: 5, flexWrap: 'wrap'}}>
          //   <Chip
          //     key={index}
          //     mode={selected}
          //     selected={item.isSelected}
          //     style={{width:''}}
          //     // onPress={() => {
          //     //   // const updatedList = tags.map(val =>
          //     //   //   (val.value === item.value)
          //     //   //     ? {...val, isSelected: !val.isSelected}
          //     //   //     : val);
          //     //   setSelection(updatedList);
          //     // }}
          //   >
          //     {item.value}
          //   </Chip>
          // </View>
        );
      })
      }
      <Button onPress={() => {editTags(tags)}}>CONFIRM</Button>
    </View>
  );
}

export default Tags;