import React, { useState } from 'react';
import { View } from "react-native";
import { Card as PaperCard, Text } from "react-native-paper";
import CardStack, { Card } from "react-native-card-stack-swiper";
import EventCard from '../components/EventCard';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

//Needs to be replaced with data from database
import EventsData from '../assets/EventsData';

/*
  userId:
  tags: [0, 0, ...0]
  events:
*/
//pass in user events


const Explore = () => {
  //for swiper
  const t = {};

  //get user and event data from storage
  var _ud = SecureStore.getItemAsync('user_data');
  var user_data = JSON.parse(_ud);
  var _ed = SecureStore.getItemAsync('event_data');
  var event_data = JSON.parse(_ed);
  var tags = ud.interests;

  function addUserToEvents(event) {

  }

  function addEventToFavorites() {

  }

  function deleteUserFromEvents() {

  }

  return (
    <View>
      <View style={{
        paddingTop: 50,
        marginHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"}}
      />

      <Text>Explore</Text>

      <CardStack 
        disableTopSwipe = 'true'
        disableBottomSwipe = 'true'
        disableLeftSwipe = 'true'
        disableRightSwipe = 'true'
        verticalSwipe = 'false'
        horizontalSwipe = 'false'
        ref={swiper => { t.swiper = swiper }}
        renderNoMoreCards={() => <Text style={{ fontSize: 18, color: 'gray' }}>No more events to display</Text>}
        onSwipedLeft={deleteUserFromEvents}   //no
        onSwipedBottom={addEventToFavorites} //swipe down to save
      >
        {event_data.map((item, index) => (
          <Card
            key={index}
            onSwipedRight={addUserToEvents()}
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
  );
};

export default Explore;