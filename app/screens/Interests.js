import React, { useState } from 'react';
import { View } from 'react-native';
import { Chip } from 'react-native-paper';

const interestList = [
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

async function getTagList() {

}

//Needs to receive the interest bool array to
const Interests = () => {
  //for setting selection state of chips
  const [selected, setSelection] = useState([]);
  const [tags, setTags] = useState([]);

  const handlePress = () => {
    console.log("Test")
  };

  function editTags (tagList) {
    if (tagList.length === 0){
     setSuccessMessage();
     setMessage("Please select at least one interest");
   } else {
       axios.patch('https://togethrgroup1.herokuapp.com/api/edituser', { 
       id: userid,
       Tags: tagList
      })
      .then((response) => {
       var UserData = {
         firstName:response.data.FirstName,
         lastName:response.data.LastName,
         username:response.data.UserName, 
        id: userid, interests: response.data.Tags, emailAddress: response.data.Email}
       localStorage.setItem('user_data', JSON.stringify(UserData));
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
    <View style = {{flex:1}}>
      {
      interestList.map((item, index) => {
        return (
          <View style={{ margin:5, flexWrap: 'wrap'}}>
            <Chip
              onPress={() => {
                const updatedList = tags.map(val =>
                  (val.value === item.value)
                    ? {...val, isSelected: !val.isSelected}
                    : val);
                setSelection(updatedList);
              }}
            >
              {item}
            </Chip>
          </View>
        );
      })
      }
    </View>
  );
}

export default Interests;