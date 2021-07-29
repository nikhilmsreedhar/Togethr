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
      <Text style={styles.info}>{startDate.substring(0,15)}{startDate.substring(18,21)} to {endDate.substring(0,15)}{endDate.substring(18,21)}</Text>
      <Text style={styles.info}>at</Text>
      <Text style={styles.info}>{location}</Text>
      <Text style={styles.info}>Attendees: {attendees.length}/{guests+1}</Text>
     
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
