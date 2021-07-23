import React, { useState } from 'react';
import { Button, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Chip, Checkbox } from 'react-native-paper';
import UserData from '../assets/UserData';

const STORAGE_KEY = 'user_data';

const Tags = ({}) => {

  React.useEffect(() => {
    getTagList()
  }, [])

  //for setting selection state of chips
  const [checked, setChecked] = useState('unchecked');
  const [interests, setInterests] = useState([]);

  const getTagList = async () => {
    try {
      const udJSON = await AsyncStorage.getItem(STORAGE_KEY);
      const userData = udJSON != null ? JSON.parse(udJSON) : null;

      if(userData !== null) {
        setInterests(userData.tags);
      } else {
        setInterests(UserData.tags);
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
        {/* Map to loop through the array of items */}
        {interestList.map((item) => {
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
      
      {/*Add tags to array*/}
      <Button onPress={() => {editTags(tags)}}>CONFIRM</Button>
    </View>
  );
}

export default Tags;