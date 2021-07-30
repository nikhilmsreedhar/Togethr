import React, { useEffect, useCallback } from "react";
import { StyleSheet, SafeAreaView, ScrollView, View, Text } from "react-native";
import Card from "../components/YourLikeCard";
import NavigationBar from "../components/NavigationBar";
import Accordion from "@material-ui/core/Accordion";
import {useIsFocused } from "@react-navigation/native";
import axios from "axios";

function Likes() {

  const [myLikes, setMyLikes] = React.useState([]);
  var _ud = localStorage.getItem('user_data');
  var ud = JSON.parse(_ud);
  var liked = ud.likes;

  useEffect(() => {
    getLikes(liked);
    return () => console.log("");
  }, [liked]);
  
  function getLikes(liked){
    axios.post('https://togethrgroup1.herokuapp.com/api/viewlikedevents', { 
      LikedEvents: liked
    })
    .then((response) => {
      console.log(response);
      const events = response.data;
      if (events === ""){
        setMyLikes([]);
      }
      else{
        setMyLikes(events);
      }
    }, (error) => {
      setMyLikes([]);
      console.log(error);
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationBar />
      <View style={styles.container}>
        <View style={styles.center}>
          <Text h1 style={styles.title}>
            Your Likes
          </Text>
          <Text style={styles.verticalDivider}></Text>
          <Text style={styles.inputDivider}></Text>
          <ScrollView>
            {myLikes.map((item, index) => (
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
            <Text style={{ fontSize: 18, color: "gray", justifyContent: 'center', alignContent: 'center', alignSelf: 'center' }}>{liked.length === 0 ? "You have no liked events" : null}</Text>
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

export default Likes;
