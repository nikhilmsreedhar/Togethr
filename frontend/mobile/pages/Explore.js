import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";

import { AuthContext } from "../components/AuthProvider";
import EventCard from "../components/EventCard";

const STORAGE_KEY = "user_data";

const Explore = () => {
  //for swiper
  const t = {};
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    fetchEventsData();
  }, []);

  const [eventsData, setEventsData] = useState([]);
  const [attendingEvents, setAttendingEvents] = useState([]);
  const [likedEvents, setLikedEvents] = useState([]);
  const isFocused = useIsFocused();

  const updateAttendingArray = (event) => {
    const newAttendingList = attendingEvents.slice();
    newAttendingList.push(event);
    setAttendingEvents(newAttendingList);
  }

  const updateLikedArray = (event) => {
    const newLikedList = likedEvents.slice();
    newLikedList.push(event);
    setLikedEvents(newLikedList);
  }

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
    await axios
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
    updateAttendingArray(event);
    axios.patch('https://togethrgroup1.herokuapp.com/api/edituser', {
      id: userData.id,
      AttendingEvents: attendingEvents
    })
    .then((response) => {
      console.log(response);
      AsyncStorage.setItem('user_data', JSON.stringify(response.data));
    }, (error) => {
      console.log(error);
    });
  };

  const dismissCard = () => {
  };

  const addEventToLiked = (event) => {
    updateLikedArray(event);
    axios.patch('https://togethrgroup1.herokuapp.com/api/edituser', {
      id: userData.id,
      LikedEvents: likedEvents
    })
    .then((response) => {
      console.log(response);
      AsyncStorage.setItem('user_data', JSON.stringify(response.data));
    }, (error) => {
      console.log(error);
    });
  };

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
            <Text style={{ fontSize: 18, color: "gray" }}>
              No more events to display. Check back later!
            </Text>
          )}
          key={isFocused}
        >
          {eventsData && eventsData.length
            ? eventsData.map((item, index) => (
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
                    date={item.StartDate}
                    startTime={item.StartDate}
                    endTime={item.EndDate}
                    attendees={item.Attendees}
                    guests={item.NumGuests}
                  />
                </Card>
              ))
            : null}
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
