import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  FlatList,
  Text,
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Avatar, Button, Chip, Divider } from "react-native-paper";
import AttendingCard from "../components/AttendingCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../components/Loading";
import { AuthContext } from "../components/AuthProvider";
import { useIsFocused } from "@react-navigation/native";

const STORAGE_KEY = "events_data";

const Events = () => {
  const { userData } = useContext(AuthContext);
  console.log(userData);

  useEffect(() => {
    getEventsData(userData.AttendingEvents);
  }, []);

  const [eventsData, setEventsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  const getEventsData = (attendingEvents) => {
    axios
      .post("https://togethrgroup1.herokuapp.com/api/viewattendingevents", {
        AttendingEvents: attendingEvents,
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
    const newEventList = eventsData.filter((event) => event.id !== eventId);
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
          <Text style={styles.title}>
            Your Events
          </Text>

          {/* <Avatar.Icon icon="filter-variant" size={24} style={{marginRight:10}}/> */}
        </View>


          <FlatList
            style={{ width: "100%" }}
            numColumns={1}
            data={eventsData}
            keyExtractor={(item) => item._id}
            ItemSeparatorComponent={() => <Divider/>}
            renderItem={({item}) => (
              <TouchableOpacity>
                <AttendingCard
                  userData={userData}
                  eventId={item._id}
                  maker={item.Maker}
                  title={item.EventName}
                  description={item.EventDescription}
                  location={item.EventLocation}
                  startDate={item.StartDate}
                  endDate={item.EndDate}
                  numGuests={item.NumGuests}
                  attendees={item.Attendees}
                  category={item.Tag}
                  removeCard={handleEventRemove}
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
  chipWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default Events;
