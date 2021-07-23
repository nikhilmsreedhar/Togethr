import React, { useState } from "react";
import { Button, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Chip, Checkbox } from "react-native-paper";
import UserData from "../assets/UserData";

const STORAGE_KEY = "user_data";

export const defaultInterests = [
  { value: "Animals", isSelected: false },
  { value: "Beauty", isSelected: false },
  { value: "Cars", isSelected: false },
  { value: "Fine Arts", isSelected: false },
  { value: "Food", isSelected: false },
  { value: "DIY", isSelected: false },
  { value: "Gaming", isSelected: false },
  { value: "Lifestyle", isSelected: false },
  { value: "Movies", isSelected: false },
  { value: "Music", isSelected: false },
  { value: "Outdoors", isSelected: false },
  { value: "Performing Arts", isSelected: false },
  { value: "Photography", isSelected: false },
  { value: "Shopping", isSelected: false },
  { value: "Sight Seeing", isSelected: false },
  { value: "Sports", isSelected: false },
  { value: "Technology", isSelected: false },
  { value: "Travel", isSelected: false },
];

//tagList will be an array of strings
const Tags = ({tagList}) => {
  // React.useEffect(() => {
  //   getTagList()
  // }, [])

  //for setting selection state of chips
  const [checked, setChecked] = useState("unchecked");
  const [interests, setInterests] = useState([]);

  const updatedInterests = defaultInterests.map((x) => 
  ({...x, isSelected: tagList.includes(x.value)}));

  // const getTagList = async () => {
  //   try {
  //     const udJSON = await AsyncStorage.getItem(STORAGE_KEY);
  //     const userData = udJSON != null ? JSON.parse(udJSON) : null;

  //     if(userData !== null) {
  //       setInterests(userData.tags);
  //     } else {
  //       setInterests(UserData.tags);
  //     }

  //   } catch(e) {
  //     console.error("Unable to get tags")
  //   }
  // }

  // const editTags = ({tagList}) => {
  //   if (tagList.length === 0) {
  //     setSuccessMessage();
  //     setMessage("Please select at least one interest");
  //   } else {
  //     axios.patch('https://togethrgroup1.herokuapp.com/api/edituser', {
  //       id: userid,
  //       Tags: tagList
  //     })
  //     .then(async (response) => {
  //       var UserData = {
  //         firstName: response.data.FirstName,
  //         lastName: response.data.LastName,
  //         username: response.data.UserName,
  //         id: userid,
  //         tags: response.data.Tags,
  //         emailAddress: response.data.Email}
  //       await AsyncStorage.setItem('user_data', JSON.stringify(UserData));
  //       console.log(response);
  //       setMessage();
  //       setSuccessMessage('You changed your Interests!');
  //     }, (error) => {
  //       console.log(error);
  //       setSuccessMessage();
  //       setMessage('Something went wrong! Try again.');
  //     });
  //   }
  // };

  return (
    <View style={{ flex: 1 }}>
      {interestList.map((item) => {
        return (
          <View style={{ flexDirection: "row" }}>
            <Text>{item.value}</Text>
            <Checkbox
              status={item.isSelected ? "checked" : "unchecked"}
              onPress={() => {}}
            />
          </View>
        );
      })}

      {/*Add tags to array*/}
      <Button
        onPress={() => {
          editTags(tags);
        }}
      >
        CONFIRM
      </Button>
    </View>
  );
};

export default Tags;
