import React, { useState } from "react";
import { Button, View, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Chip } from "react-native-paper";

const STORAGE_KEY = "user_data";

export const defaultInterests = [
  { value: "Animals", isSelected: false, icon: "paw" },
  { value: "Beauty", isSelected: false, icon: "content-cut" },
  { value: "Cars", isSelected: false, icon: "car" },
  { value: "Fine Arts", isSelected: false, icon: "palette" },
  { value: "Food", isSelected: false, icon: "food" },
  { value: "DIY", isSelected: false, icon: "hammer-wrench" },
  { value: "Gaming", isSelected: false, icon: "controller-classic" },
  { value: "Lifestyle", isSelected: false, icon: "hiking" },
  { value: "Movie", isSelected: false, icon: "movie-roll"},
  { value: "Music", isSelected: false, icon: "music"},
  { value: "Outdoors", isSelected: false, icon: "tree"},
  { value: "Performing Arts", isSelected: false, icon: "drama-masks" },
  { value: "Photography", isSelected: false, icon: "camera" },
  { value: "Shopping", isSelected: false, icon: "shopping" },
  { value: "Sight Seeing", isSelected: false, icon: "binoculars" },
  { value: "Sports", isSelected: false, icon: "basketball" },
  { value: "Technology", isSelected: false, icon: "cog" },
  { value: "Travel", isSelected: false, icon: "train-car" }
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
            await AsyncStorage.setItem("user_data", JSON.stringify(response.data));
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
    <View style={styles.tagListContainer}>
      <View style={styles.tagChipContainer}>
        {interests.map((item) => {
          return (
            <View style={styles.chipWrapper}>
              <Chip
                selected={item.isSelected ? true : false}
                selectedColor="#5b06d5"
                style={{ marginHorizontal: 5 }}
                icon={item.icon}
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
        mode="contained"
        // style={{ margin: 10 }}
        onPress={() => {
          submitTags();
        }}
      >
        CONFIRM
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  tagListContainer: {
    flex: 1,
    alignItems: 'center'
  },
  tagChipContainer: {
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
  },
});

export default Tags;
