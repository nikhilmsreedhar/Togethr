import React from "react";
import { View, Image, StyleSheet, Text, Dimensions } from "react-native";
import { Paragraph, Title } from "react-native-paper";
import Loading from "./Loading";

// function importAll(r) {
//   let images = {};
//   r.keys().map((item, index) => {
//     images[item.replace("./", "")] = r(item);
//   });
//   return images;
// }

// const images = importAll(
//   require.context("../images", false, /\.(png|jpe?g|svg)$/)
// );

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const BUFFER = Dimensions.get("window").width * 0.2;
const HBUFFER = Dimensions.get("window").height * 0.25;

const EventCard = ({
  picture,
  title,
  description,
  location,
  startDate,
  endDate,
  attendees,
  tag,
}) => {
  let source = tag + ".png";

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
      <View style={styles.image}>
        <Loading />
      </View>
      {/* <Image style={styles.image} source={images[source]} /> */}

      <View style={{ alignItems: "center" }}>
        <View style = {{width: 250}}>
          <Title style={styles.title}>{title}</Title>
          <Paragraph style={styles.description}>{description}</Paragraph>
        </View>

        <Text style={{ color: "gray" }}>@ {location}</Text>
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
        <View style={{ flexDirection: "row" }}>
          <Text style={{padding: 10}}>{attendees.length} people attending!</Text>
          {/* {attendees.map((guest) => (
            <Text style={styles.info}>{guest}</Text>
          ))} */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerCardItem: {
    height: SCREEN_HEIGHT - HBUFFER,
    width: SCREEN_WIDTH - BUFFER,
    // paddingVertical: 50,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "flex-start",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: "black",
    shadowOffset: { height: 0, width: 0 },
    padding: 30,
    // paddingVertical:(SCREEN_HEIGHT - HBUFFER)*.2,
    // paddingHorizontal: (SCREEN_WIDTH - BUFFER)*.2
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  description: {
    fontSize: 15,
    margin: 10,
  },
  info: {
    margin: 10,
  },
  image: {
    height: 300,
    width: SCREEN_WIDTH - 90,
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 8,
    resizeMode: "contain",
    //flex: 1,
  },
});

export default EventCard;
