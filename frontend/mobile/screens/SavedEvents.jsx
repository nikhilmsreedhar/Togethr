import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  FlatList,
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Button, Chip, Text } from "react-native-paper";
import LikedCard from "../components/LikedCard";
import EventsData from "../assets/data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../components/Loading";
import { AuthContext } from "../components/AuthProvider";
import { useIsFocused } from "@react-navigation/native";

const STORAGE_KEY = "events_data";

const SavedEvents = () => {
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    getEventsData(userData.LikedEvents);
  }, [isFocused]);

  const [eventsData, setEventsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  const getEventsData = (likedEvents) => {
    axios
      .post("https://togethrgroup1.herokuapp.com/api/viewattendingevents", {
        AttendingEvents: likedEvents,
      })
      .then(
        (response) => {
          console.log(response.data);
          setEventsData(response.data);
        },
        (error) => {
          console.log(error);
          console.log("Unable to get user data.");
        }
      )
      .finally(() => setIsLoading(false));
  };

  const handleEventRemove = (eventId) => {
    const newEventList = eventsData.filter((event) => event._id !== eventId);
    setEventsData(newEventList);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View
          style={{
            width: '100%',
            paddingTop: 20,
            marginHorizontal: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <Text h1 style={styles.title}>
            Saved Events
          </Text>
        </View>

        <FlatList
          style={{ width: "100%" }}
          numColumns={1}
          data={eventsData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <LikedCard
                eventId={item._id}
                maker={item.Maker}
                title={item.EventName}
                description={item.EventDescription}
                location={item.EventLocation}
                startDate={item.StartDate}
                endDate={item.EndDate}
                numGuests={item.NumGuests}
                attendees={item.Attendees}
                removeCard={() => handleEventRemove(item._id)}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontFamily: "Comfortaa_400Regular",
    margin: 5
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  verticalDivider: {
    height: 50,
  },
  inputDivider: {
    height: 20,
  },
});

export default SavedEvents;
