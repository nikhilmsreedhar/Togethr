import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import Loading from "../components/Loading";

import { AuthContext } from "../components/AuthProvider";
import EventCard from "../components/EventCard";

const STORAGE_KEY = "user_data";

const Explore = () => {
  //for swiper
  const t = {};
  const { userData } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEventsData();
    setIsLoading(false);
  }, []);

  const [eventsData, setEventsData] = useState([]);
  const [attendingEvents, setAttendingEvents] = useState([]);
  const [likedEvents, setLikedEvents] = useState([]);
  const isFocused = useIsFocused();

  //update user's attending array list
  const updateAttendingArray = (eventId) => {
    const newAttendingList = attendingEvents.slice();
    newAttendingList.push(eventId);
    console.log(newAttendingList);
    setAttendingEvents(newAttendingList);
  };

  const updateLikedArray = (event) => {
    const newLikedList = likedEvents.slice();
    newLikedList.push(event);
    setLikedEvents(newLikedList);
  };

  // retrieve user tags from AsyncStorage
  const getUserTags = async () => {
    try {
      const jsonString = await AsyncStorage.getItem(STORAGE_KEY);
      const user = JSON.parse(jsonString);
      return user.Tags;
    } catch (error) {
      console.log(error);
    }
  };

  // make API request to get events
  const fetchEventsData = async () => {
    let tags = await getUserTags();
    axios
      .post("https://togethrgroup1.herokuapp.com/api/retrieveevents", {
        Tags: tags,
      })
      .then((response) => {
        console.log(response);
        setEventsData(response.data);
      })
      .catch((err) => console.log(err));
  };

  const addEventToAttending = (event) => {
    updateAttendingArray(event._id);
    axios
      .patch("https://togethrgroup1.herokuapp.com/api/edituser", {
        id: userData.id,
        AttendingEvents: attendingEvents,
      })
      .then(
        (response) => {
          console.log(response);
          AsyncStorage.setItem("user_data", JSON.stringify(response.data));
        },
        (error) => {
          console.log(error);
        }
      );
    updateEvent(event);
  };

  const updateEvent = (event) => {
    const attendeeList = event.Attendees.slice();
    attendeeList.push(userData.UserName);

    axios
      .patch("https://togethrgroup1.herokuapp.com/api/editevent", {
        id: event._id,
        Attendees: attendeeList,
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const dismissCard = () => {};

  const addEventToLiked = (event) => {
    updateLikedArray(event);
    axios
      .patch("https://togethrgroup1.herokuapp.com/api/edituser", {
        id: userData.id,
        LikedEvents: likedEvents,
      })
      .then(
        (response) => {
          console.log(response);
          AsyncStorage.setItem("user_data", JSON.stringify(response.data));
        },
        (error) => {
          console.log(error);
        }
      );
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <CardStack
          disableTopSwipe
          style={styles.content}
          ref={(swiper) => {
            t.swiper = swiper;
          }}
          renderNoMoreCards={() => (
            <Text style={{ fontSize: 18, color: "gray" }}>No more events!</Text>
          )}
          key={isFocused}
        >
          {eventsData && eventsData.length ? (
            eventsData.map((item) => (
              <Card
                style={styles.card}
                key={item.id}
                onSwipedLeft={() => dismissCard(item)}
                onSwipedRight={() => addEventToAttending(item)}
                onSwipedBottom={() => addEventToLiked(item)}
              >
                <EventCard
                  title={item.EventName}
                  description={item.EventDescription}
                  startDate={item.StartDate}
                  endDate={item.EndDate}
                  attendees={item.Attendees}
                  guests={item.NumGuests}
                />
              </Card>
            ))
          ) : (
            <View />
          )}
        </CardStack>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {},
});

export default Explore;
