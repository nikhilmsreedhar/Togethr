import * as React from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import EventCard from "../components/EventCard";
import Data from "../assets/data.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const STORAGE_KEY = 'user_data'

const Explore = () => {
  const t = {};

  React.useEffect(() => {
    const userTags = getUserTags();
    fetchEventsData(userTags);
  }, []);

  const [eventsData, setEventsData] = React.useState([]);

  const getUserTags = async () => {
    const jsonString = await AsyncStorage.getItem(STORAGE_KEY);
    const tags = JSON.parse(jsonString);
    return tags;
  }

  const fetchEventsData = async (tags) => {
    axios.post('https://togethrgroup1.herokuapp.com/api/retrieveevents',
    {
      Tags: tags
    }).then((response) => {
      console.log(response);
      setEventsData(response.data);
    }).catch((err) => console.log(err));
  }

  const getEventsData = async () => {
    try {
      const edJSON = await AsyncStorage.getItem(STORAGE_KEY);
      const ed = edJSON != null ? JSON.parse(udJSON) : null;

      if (ed !== null) {
        setEventsData(ed);
      } else {
        setEventsData(EventsData);
      }
    } catch (e) {
      console.error("Unable to get events info");
    }
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
              No more events to display
            </Text>
          )}
          onSwipedLeft={() => alert("swiped left")}
          onSwipedRight={() => alert("swiped right")}
          onSwipedBottom={() => alert("swiped down")}
          // key={isFocused}
        >
          {Data.map((item, index) => (
            <Card
              style={styles.card}
              key={index}
              onSwipedLeft={() => alert("swiped left")}
              onSwipedRight={() => alert("swiped right")}
              onSwipedBottom={() => alert("swiped down")}
            >
              <EventCard
                title={item.title}
                description={item.description}
                date={item.date}
                startTime={item.startTime}
                endTime={item.endTime}
                attendees={item.attendees}
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
  card: {
    
  }
});

export default Explore;
