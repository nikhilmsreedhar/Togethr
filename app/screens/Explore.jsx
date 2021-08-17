import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import { Title, Chip, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import Loading from "../components/Loading";
import axios from "axios";

import { AuthContext } from "../components/AuthProvider";
import EventCard from "../components/EventCard";

const Explore = () => {
  //for swiper
  const t = {};
  const { userData, updateUserData } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEventsData(userData.Tags);
  }, [isFocused]);

  const [eventsData, setEventsData] = useState([]);
  const isFocused = useIsFocused();

  // make API request to get events
  const fetchEventsData = (tags) => {
    console.log(tags);
    axios
      .post("https://togethrgroup1.herokuapp.com/api/retrieveevents", {
        Tags: tags,
      })
      .then((response) => {
        console.log(response.data);
        const eventsArray = response.data;
        const filteredArray = eventsArray
          .filter((event) => event.Maker != userData.id)
          .filter((event) => {
            return !userData.AttendingEvents.includes(event._id);
          })
          .filter((event) => {
            return !userData.LikedEvents.includes(event._id);
          });

        setEventsData(filteredArray);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const addEventToAttending = async (event) => {
    // const userDataFromAsync = await AsyncStorage.getItem("user_data");

    const newAttendingList = userData.AttendingEvents.slice();
    newAttendingList.push(event._id);

    console.log("SEND ATTEND EVENTS");
    // console.log(userDataFromAsync.id);
    console.log(userData.id);
    console.log(newAttendingList);
    axios
      .patch("https://togethrgroup1.herokuapp.com/api/edituser", {
        id: userData.id,
        AttendingEvents: newAttendingList,
      })
      .then(
        (response) => {
          console.log(response);
          const t = response.data;
          //updateUserData(t);
          updateEvent(event);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const dismissCard = () => {};

  const addEventToLiked = (event) => {
    const newLikedList = likedEvents.slice();
    newLikedList.push(event);

    console.log("SEND LIKED EVENTS");
    console.log(newLikedList);

    axios
      .patch("https://togethrgroup1.herokuapp.com/api/edituser", {
        id: userData.id,
        LikedEvents: newLikedList,
      })
      .then(
        (response) => {
          console.log(response.data);
          //updateUserData(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
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
          console.log("Attendee List updated");
          console.log(response.data);
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
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.chipWrapper}>
            <Chip icon="map-marker" onPress={()=>{}}>Florida</Chip>
          </View>
          <Title>Explore!</Title> 
          <View style={styles.chipWrapper}>
            <Chip icon="filter-variant" onPress={()=>{}}>Filter</Chip>
          </View>
        </View>

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
                  location={item.EventLocation}
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
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {},
  top: {
    paddingTop: 50,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default Explore;
