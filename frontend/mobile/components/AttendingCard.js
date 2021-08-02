import React, { useContext } from "react";
import axios from "axios";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { AuthContext } from "./AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const AttendingCard = ({
  eventId,
  maker,
  image,
  title,
  description,
  location,
  startDate,
  endDate,
  attendees,
  removeCard,
}) => {
  const { userData, updateUserData } = useContext(AuthContext);

  const formatDate = new Date(startDate).toDateString();
  const formatStartTime = new Date(startDate).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formatEndTime = new Date(endDate).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  function removeAttend(eventId) {
    removeNameFromEvent(eventId, attendees);
  }
  
  function removeNameFromEvent(eventId, attendees) {
    //new array of names to attach to event
    const newAttendeeList = attendees.filter(
      (name) => name !== userData.UserName
    );

    axios
      .patch("https://togethrgroup1.herokuapp.com/api/editevent", {
        id: eventId,
        Attendees: newAttendeeList,
      })
      .then(
        (response) => {
          console.log(response);
          removeEventIdFromUser(eventId);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  function removeEventIdFromUser(eventId) {
    //new array of ids to patch to user
    const newAttendEventList = userData.AttendingEvents.filter(
      (aEventId) => aEventId !== eventId
    );

    console.log("REMOVE EVENT FROM USER");
    console.log(newAttendEventList);
    axios
      .patch("https://togethrgroup1.herokuapp.com/api/edituser", {
        id: userData.id,
        AttendingEvents: newAttendEventList,
      })
      .then(
        (response) => {
          console.log(response);
          updateUserData(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }


  async function deleteEvent(eventId, maker) {
    const res = await axios.delete(
      "https://togethrgroup1.herokuapp.com/api/deleteevent",
      {
        data: { id: eventId },
      }
    );
    console.log(res.data.json);

    attending.splice(attending.indexOf(eventId), 1);
    axios
      .patch("https://togethrgroup1.herokuapp.com/api/edituser", {
        id: userid,
        AttendingEvents: attending,
      })
      .then(
        (response) => {
          localStorage.setItem("user_data", JSON.stringify(UserData));
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  return (
    <Card>
      <Card.Title title={title} />
      {image ? null : (
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
      )}

      <Card.Content>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text>Attending:</Text>
            {attendees.map((user, index) => (
              <Text key={index}>• {user}</Text>
            ))}
          </View>
          <View style={{ flex: 1 }}>
            <Paragraph>{description}</Paragraph>
            <Text>Where:</Text>
            <Text>{location}</Text>
            <Text>When:</Text>
            <Text>{formatDate}</Text>
            {formatStartTime == formatEndTime ? (
              <Text>{formatStartTime}</Text>
            ) : (
              <Text>
                {formatStartTime} - {formatEndTime}
              </Text>
            )}
          </View>
        </View>
      </Card.Content>

      {userData.id == maker ? (
        <Card.Actions style={{ justifyContent: "flex-end" }}>
          <Button onPress={() => {}}>Edit</Button>
          <Button
            onPress={() => {
              removeCard();
            }}
          >
            Delete
          </Button>
        </Card.Actions>
      ) : (
        <Card.Actions style={{ justifyContent: "flex-end" }}>
          <Button
            onPress={() => {
              removeCard(eventId);
              removeAttend(eventId);
            }}
          >
            Remove
          </Button>
        </Card.Actions>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  containerCardItem: {
    height: SCREEN_HEIGHT - 160,
    width: SCREEN_WIDTH - 30,
    paddingVertical: 50,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: "black",
    shadowOffset: { height: 0, width: 0 },
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    margin: 10,
  },
  description: {
    fontSize: 20,
    margin: 10,
  },
  info: {
    margin: 10,
  },
});

export default AttendingCard;
