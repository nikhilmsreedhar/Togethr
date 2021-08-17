import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Button, IconButton, Menu, Provider, Text, TextInput } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { DatePickerModal } from "react-native-paper-dates";
import {useForm} from "react-hook-form";

const interestOptions = [
  { label: "Movie", value: "Movie" },
  { label: "Music", value: "Music" },
  { label: "Sports", value: "Sports" },
  { label: "Outdoors", value: "Outdoors" },
  { label: "Food", value: "Food" },
  { label: "Animals", value: "Animals" },
  { label: "Beauty", value: "Beauty" },
  { label: "Gaming", value: "Gaming" },
  { label: "Sight Seeing", value: "Sight Seeing" },
  { label: "Technology", value: "Technology" },
  { label: "DIY", value: "DIY" },
  { label: "Travel", value: "Travel" },
  { label: "Performing Arts", value: "Performing Arts" },
  { label: "Fine Arts", value: "Fine Arts" },
  { label: "Cars", value: "Cars" },
  { label: "Photography", value: "Photography" },
  { label: "Lifestyle", value: "Lifestyle" },
  { label: "Shopping", value: "Shopping" },
];

const AddEvent = () => {
  const navigation = useNavigation();

  function navigateBack() {
    navigation.goBack();
  }

  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [numGuests, setNumGuests] = useState(0);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState();

  const [addMessage, setAddMessage] = useState();
  const [addErrorMessage, setAddErrorMessage] = useState();

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const onDateDismiss = React.useCallback(() => {
    setDateModalVisible(false);
  }, [setDateModalVisible]);

  const onConfirmDate = React.useCallback(
    (params) => {
      setDateModalVisible(false);
      setDate(params.date);
    },
    [setDateModalVisible, setDate]
  );

  const submit = () => {
    if (
      title == "" ||
      description == "" ||
      numGuests == "" ||
      category == "" ||
      day == "" ||
      start == "" ||
      end == ""
    ) {
      setAddMessage();
      setAddErrorMessage("Please fill in all fields");
    } else {
      const event = {
        EventName: title,
        EventDescription: description,
        EventLocation: location,
        StartDate: start,
        EndDate: end
      };
      postEvent();
    }
  };

  const postEvent = (title, description, location, guests, category) => {
    axios
      .post("https://togethrgroup1.herokuapp.com/api/addevent", {
        Maker: userid,
        EventName: title,
        EventDescription: description,
        EventLocation: location,
        StartDate: startdate,
        EndDate: enddate,
        NumGuests: numGuests,
        Attendees: attendeeList,
        Pictures: 't', // for now is t
        Tag: category,
      })
      .then(
        (response) => {
          console.log(response);
          setAddErrorMessage();
          setAddMessage("Your event was posted!");
        },
        (error) => {
          console.log(error);
          setAddMessage();
          setAddErrorMessage("Something went wrong. Try again.");
        }
      );
  };

  return (
    <Provider>
      <SafeAreaView style={{ flex: 1 }}>
        <DatePickerModal
          mode="single"
          visible={dateModalVisible}
          onDismiss={onDateDismiss}
          onConfirm={onConfirmDate}
          date={date}
        />

        <View style={styles.container}>
          <View style={styles.closeButton}>

            <IconButton icon="close" onPress={() => {navigateBack}}/>
          </View>

          <Title h1 style={styles.title}>
            Create Activity
          </Title>

          <TextInput
            style={{ alignSelf: "stretch" }}
            label="Title"
            value={title}
            mode="outlined"
            onChangeText={(title) => setTitle(title)}
          />

          <TextInput
            style={{ alignSelf: "stretch" }}
            label="Description"
            value={description}
            mode="outlined"
            onChangeText={(descrip) => setDescription(descrip)}
          />

          <TextInput
            style={{ alignSelf: "stretch" }}
            label="Location"
            value={location}
            mode="outlined"
            onChangeText={(location) => setLocation(location)}
          />

          <TextInput
            style={{ alignSelf: "stretch" }}
            label="Number of Guests"
            value={numGuests}
            mode="outlined"
            onChangeText={(numGuests) => setNumGuests(numGuests)}
          />

          <RNPickerSelect
            style={pickerSelectStyles}
            value={category}
            onValueChange={(value) => {
              setCategory(value);
            }}
            items={interestOptions}
          />

          <TextInput
            style={{ alignSelf: "stretch" }}
            label="Date"
            value={date}
            mode="outlined"
            onFocus={() => setDateModalVisible(true)}
            onChangeText={(date) => setDate(date)}
          />

          <View>
            <TextInput />
            <TextInput />
          </View>

          <Button
            onPress={() =>
              postEvent(
                title,
                description,
                location,
                numGuests,
                category,
                date,
                startTime,
                endTime
              )
            }
            style={styles.postButton}
          >
            POST
          </Button>
        </View>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 25,
  },
  title: {
    fontSize: 30,
    fontFamily: "Comfortaa_400Regular",
    alignSelf: "center",
    marginVertical: 10,
  },
  input: {
    width: 500,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  center: {
    flex: 1,
    alignContent: "center",
    alignSelf: "center",
  },
  verticalDivider: {
    height: 10,
  },
  inputDivider: {
    height: 20,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonDivider: {
    width: 10,
  },
  postButton: {
    backgroundColor: "black",
    // width: 'stretch',
    height: 50,
    //borderWidth: 3,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    //borderRadius: 5,
  },
  postButtonText: {
    fontSize: 18,
    color: "white",
    fontFamily: "Roboto_500Medium",
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default AddEvent;
