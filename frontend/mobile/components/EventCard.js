import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const BUFFER = Dimensions.get("window").width * 0.2;
const HBUFFER = Dimensions.get("window").height * 0.25;

const EventCard = ({
  picture,
  title,
  description,
  startDate,
  endDate,
  attendees,
}) => {
  const formatDate = new Date(startDate).toDateString();
  const formatStartTime = new Date(startDate).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formatEndTime = new Date(endDate).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View style={styles.containerCardItem}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.info}>{formatDate}</Text>

      <View style={{ flexDirection: "row" }}>
        {formatStartTime == formatEndTime ? (
          <Text>{formatStartTime}</Text>
        ) : (
          <Text>
            {formatStartTime} - {formatEndTime}
          </Text>
        )}
      </View>
      <View>
        <Text style={styles.info}>{attendees}</Text>
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
    fontSize: 30,
    fontWeight: "bold",
    margin: 10,
  },
  description: {
    fontSize: 20,
    margin: 10,
  },
  info: {
    margin: 10,
  },
});

export default EventCard;
