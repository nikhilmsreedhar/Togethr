import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import EventCard from "../components/EventCard";
import Data from "../assets/data.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";

const STORAGE_KEY = "user_data";

const Explore = () => {
  //for swiper
  const t = {};

  useEffect(() => {
    fetchEventsData();
  }, []);

  const [eventsData, setEventsData] = useState([]);

  const isFocused = useIsFocused();

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

  const updateEvents = () => {
    
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
            <Text style={{ fontSize: 18, color: "gray" }}>
              No more events to display. Check back later!
            </Text>
          )}
          onSwipedLeft={() => alert("swiped left")}
          onSwipedRight={() => alert("swiped right")}
          onSwipedBottom={() => alert("swiped down")}
          key={isFocused}
        >
          {eventsData.map((item, index) => (
            <Card
              style={styles.card}
              key={index}
              onSwipedLeft={() => alert("swiped left")}
              onSwipedRight={() => alert("swiped right")}
              onSwipedBottom={() => alert("swiped down")}
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
          ))}
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
