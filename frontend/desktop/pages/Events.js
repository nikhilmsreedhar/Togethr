import React, { useEffect, useCallback } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View, Text } from "react-native";
import Card from "../components/YourEventCard";
import NavigationBar from "../components/NavigationBar";
import Accordion from "@material-ui/core/Accordion";
import {
  useFonts,
  Comfortaa_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/dev";
import Data from "../assets/data.js";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import axios from "axios";

function Events() {

  const [myEvents, setMyEvents] = React.useState([]);
  var _ud = localStorage.getItem('user_data');
  var ud = JSON.parse(_ud);
  var attending = ud.attend;
  const isFocused = useIsFocused();

  useEffect(() => {
    getEvents(attending);
    return () => console.log("");
  }, [attending]);
  
  function getEvents(attending){
    console.log(attending);
    axios.post('https://togethrgroup1.herokuapp.com/api/viewattendingevents', { 
      AttendingEvents: attending
    })
    .then((response) => {
      console.log(response);
      const events = response.data;
      setMyEvents(events);
    }, (error) => {
      setMyEvents([]);
      console.log(error);
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationBar />
      <View style={styles.container}>
        <View style={styles.center}>
          <Text h1 style={styles.title}>
            Your Events
          </Text>
          <Text style={styles.verticalDivider}></Text>
          <Text style={styles.inputDivider}></Text>
          <ScrollView>
            {myEvents.map((item, index) => (
              <Accordion key={index}>
                <Card
                   _id={item._id}
                   maker={item.Maker}
                   location={item.EventLocation}
                   title={item.EventName}
                   description={item.EventDescription}
                   startDate={item.StartDate}
                   endDate={item.EndDate}
                   attendees={item.Attendees}
                   guests={item.NumGuests}
                />
              </Accordion>
            ))}
            <Text style={{ fontSize: 18, color: "gray", justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }}>{attending.length === 0 ? "You have no events" : null}</Text>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 60,
    fontFamily: "Comfortaa_400Regular",
    alignSelf: "center",
  },
  center: {
    flex: 1,
    alignContent: "center",
    alignSelf: "center",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: 25,
  },
  verticalDivider: {
    height: 10,
  },
  inputDivider: {
    height: 20,
  },
});

export default Events;
