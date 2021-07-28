import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const BUFFER = Dimensions.get("window").width * 0.2;
const HBUFFER = Dimensions.get("window").height * 0.3;

const EventCard = ({
  title,
  description,
  location,
  startDate,
  endDate,
  guests,
  attendees,
  tag,
}) => {
  return (
    <View style={styles.containerCardItem}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.info}>{startDate}</Text>
        <Text style={styles.info}> - </Text>
        <Text style={styles.info}>{endDate}</Text>
      </View>
      {/* <Text style={styles.info}>{attendees.length}/{guests}</Text> */}
      <View style={styles.info}>
        {attendees.map((attendee) => 
          {return <Text style={styles.info}>{attendee}</Text>}
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerCardItem: {
    height: SCREEN_HEIGHT - HBUFFER,
    width: SCREEN_WIDTH - BUFFER,
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
    fontSize: 60,
    fontWeight: "bold",
    margin: 10,
  },
  description: {
    fontSize: 40,
    margin: 10,
  },
  info: {
    fontSize: 30,
    margin: 10,
  },
});

export default EventCard;
