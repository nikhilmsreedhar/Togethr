import React, { useEffect, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import CardStack, { Card } from "react-native-card-stack-swiper";
import EventCard from "../components/EventCard";
import Data, { push } from "../assets/data.js";
import NavigationBar from "../components/NavigationBar";
import axios from "axios";

function Explore() {

  //retrieve user tags for POST to API
  const getUserTags = () => {
    const _ud = localStorage.getItem("user_data");
    const ud = JSON.parse(_ud);
    return ud.tags;
  };

  useEffect(() => {
    const userTags = getUserTags();
    getEventsData(userTags);

  }, [isFocused]);

  
  //returns true or false depending on if page is focused or not
  const isFocused = useIsFocused();

  // useFocusEffect should run every time the Explore page is focused
  // useFocusEffect(() => {
  //   getEventsData();
  //   console.log("called");
  //   console.log(eventData);
  // });

  //for use by the swiper
  const t = {};

  const [eventData, setEventsData] = React.useState([]);

  async function getEventsData(userTags) {
    await axios
      .post("https://togethrgroup1.herokuapp.com/api/retrieveevents", {
        Tags: userTags,
      })
      .then(
        (response) => {
          console.log(response);
          setEventsData([...response.data]);
          console.log("Updated eventData");
        },
        (error) => {
          console.log(error);
          alert("Something went wrong!");
        }
      );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationBar />
      <View style={styles.page}>
        <CardStack
          disableTopSwipe
          disableBottomSwipe
          disableLeftSwipe
          disableRightSwipe
          style={styles.content}
          ref={(swiper) => {
            t.swiper = swiper;
          }}
          renderNoMoreCards={() => (
            <Text style={{ fontSize: 18, color: "gray" }}>
              No more events to display
            </Text>
          )}
          onSwipedLeft={() => alert("swiped left")}
          onSwipedRight={() => alert("swiped right")}
          onSwipedBottom={() => alert("swiped down")}
        >
          {eventData.map((item, index) => (
            <Card key={index}>
              <EventCard
                title={item.EventName}
                description={item.EventDescription}
                startDate={item.StartDate}
                endDate={item.EndDate}
                attendees={item.Attendees}
              />
            </Card>
          ))}
        </CardStack>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => t.swiper.swipeLeft()}>
            <Ionicons name="close-circle" size={50} color="back" />
          </TouchableOpacity>

          <View style={styles.buttonSpace} />

          <TouchableOpacity onPress={() => t.swiper.swipeBottom()}>
            <Ionicons name="heart-outline" size={45} color="back" />
          </TouchableOpacity>

          <View style={styles.buttonSpace} />

          <TouchableOpacity onPress={() => t.swiper.swipeRight()}>
            <Ionicons name="checkmark-circle" size={50} color="back" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  buttonSpace: {
    width: 20,
  },
});
export default Explore;
