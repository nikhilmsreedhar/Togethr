import React, { useState } from 'react';
import { Button, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Chip, Checkbox } from 'react-native-paper';
import UserData from '../assets/UserData';

const STORAGE_KEY = 'user_data';

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

//Recieve an array of strings corresponding to tags
//Render two columns of checkboxes with tags
//Check boxes that correspond to strings in tag array
//On checking the box, add that value to the array
//On clicking submit, send that array 


const Tags = () => {

  React.useEffect(() => {
    getTagList()
  }, [])

  //for setting selection state of chips
  const [checked, setChecked] = useState('unchecked');
  const [tagList, setTagList] = useState([]);

  const getTagList = async () => {

    try {
      const udJSON = await AsyncStorage.getItem(STORAGE_KEY);
      const userData = udJSON != null ? JSON.parse(udJSON) : null;

      if(userData !== null) {
        setTagList(userData.tags);
      } else {
        setTagList(UserData.tags);
      }

    } catch(e) {
      console.error("Unable to get tags")
    }
  }

  const editTags = ({tagList}) => {
    if (tagList.length === 0) {
      setSuccessMessage();
      setMessage("Please select at least one interest");
    } else {
      axios.patch('https://togethrgroup1.herokuapp.com/api/edituser', { 
        id: userid,
        Tags: tagList
      })
      .then(async (response) => {
        var UserData = {
          firstName: response.data.FirstName,
          lastName: response.data.LastName,
          username: response.data.UserName, 
          id: userid,
          tags: response.data.Tags,
          emailAddress: response.data.Email}
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
    <View style = {{flex:1}}>
      <View style = {{padding: 50}}>
        {/* Map to loop through the array of items */}
        {interestList.map((item, index) => {
          return (
            //{text}   {CheckBox}//
            <View style={{flexDirection: "row"}}>
              <Text>{item.value}</Text>
              <Checkbox
                status={item.isSelected ? "checked" : "unchecked"}
                onPress={() => {
                  const updatedInterests = interests.map((val) =>
                    val.value === item.value
                      ? { ...val, isSelected: !val.isSelected }
                      : val);

                  setInterests(updatedInterests);
                }}
              />
            </View>
          );
        })}
      </View>
      
      {/*Add tags to array*/}
      <Button onPress={() => {editTags(tags)}}>CONFIRM</Button>
    </View>
  );
}

export default Tags;