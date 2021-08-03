import React from "react";
import { View, StyleSheet, Text, Dimensions, Image } from "react-native";

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

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

  var source = tag+'.png'
  
  return (
    <View style={styles.containerCardItem}>
      <Text style={styles.title}>{title}</Text>
      <Image style={styles.image} source={images[source]}/>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.info}>{startDate.substring(0,15)}{startDate.substring(18,21)} to {endDate.substring(0,15)}{endDate.substring(18,21)}</Text>
      <Text style={styles.info}>at {location}</Text>
      <Text style={styles.info}>Attendees: {attendees.length}/{guests+1}</Text>
     
    </View>
  );
};

const styles = StyleSheet.create({
  containerCardItem: {
    height: SCREEN_HEIGHT - HBUFFER,
    width: SCREEN_WIDTH - BUFFER,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowColor: "black",
    shadowOffset: { height: 0, width: 0 },
    paddingVertical:(SCREEN_HEIGHT - HBUFFER)*.2,
    paddingHorizontal: (SCREEN_WIDTH - BUFFER)*.2
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    margin: 5,
    textAlign: 'center'
  },
  description: {
    fontSize: 15,
    margin: 5,
    textAlign: 'center'
  },
  info: {
    fontSize: 15,
    margin: 5,
  },
  image: {
    height: (SCREEN_HEIGHT - HBUFFER)*.5,
    width: (SCREEN_WIDTH - BUFFER)*.5, 
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 8,
    resizeMode: 'contain',
    flex: 1,
    aspectRatio: 1 // Your aspect ratio
  }
});

export default EventCard;
