import React, { useState } from "react";
import { Button, View, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Chip, Checkbox } from "react-native-paper";
import UserData from "../assets/UserData";

const STORAGE_KEY = "user_data";

const defaultInterests = [
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
const Tags = ({ tagList }) => {

  const initialInterests = defaultInterests.map((x) => ({
    ...x,
    isSelected: tagList.includes(x.value),
  }));

  //return list of strings representing user tags
  const makeUserInterests = () => {
    const tagNames = interests.filter((x) => x.isSelected).map((x) => x.value);
    return tagNames;
  };

  // initialize interest object representing state of chips
  const [interests, setInterests] = React.useState(initialInterests);

  // submit tagList to API
  const submitTags = (tagList) => {
    if (tagList.length === 0) {
      setSuccessMessage();
      setMessage("Please select at least one interest");
    } else {
      axios
        .patch("https://togethrgroup1.herokuapp.com/api/edituser", {
          id: userid,
          Tags: tagList,
        })
        .then(
          async (response) => {
            var UserData = {
              firstName: response.data.FirstName,
              lastName: response.data.LastName,
              username: response.data.UserName,
              id: userid,
              tags: response.data.Tags,
              emailAddress: response.data.Email,
            };
            await AsyncStorage.setItem("user_data", JSON.stringify(UserData));
            console.log(response);
            setMessage();
            setSuccessMessage("You changed your Interests!");
          },
          (error) => {
            console.log(error);
            setSuccessMessage();
            setMessage("Something went wrong! Try again.");
          }
        );
    }
  };

  //render
  return (
    <>
      <View style={styles.tagListContainer}>
        {interests.map((item) => {
          return (
            <View style={styles.chipWrapper}>
              <Chip
                selected={item.isSelected ? true : false}
                //selectedColor="#5b06d5"
                style={{ marginHorizontal: 5 }}
                onPress={() => {
                  const updatedInterests = interests.map((interest) =>
                    interest.value === item.value
                      ? { ...interest, isSelected: !interest.isSelected }
                      : interest
                  );
                  setInterests(updatedInterests);
                }}
              >
                {item.value}
              </Chip>
            </View>
          );
        })}
      </View>

      {/*Add tags to array*/}
      <Button
        style={{ margin: 10 }}
        onPress={() => {
          submitTags();
        }}
      >
        CONFIRM
      </Button>
    </>
  );
};

const styles = StyleSheet.create({
  tagListContainer: {
    fontSize: 50,
    fontFamily: "Comfortaa_400Regular",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    marginVertical: 50,
    marginHorizontal: 15,
    padding: 10,
  },
  chipWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: 7,
  },
});

export default Tags;
