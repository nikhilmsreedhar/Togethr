import React, { useState } from 'react';
import { View } from "react-native";
import { Card as PaperCard, Text } from "react-native-paper";
import CardStack, { Card } from "react-native-card-stack-swiper";
import EventCard from '../components/EventCard';

//Needs to be replaced with data from database
import EventsData from '../assets/EventsData';
/*
  userId:
  tags: [0, 0, ...0]
  events:
*/
//pass in user events
const Explore = () => {
  
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
        ref={swiper => { this.swiper = swiper }}
        renderNoMoreCards={() => <Text style={{ fontSize: 18, color: 'gray' }}>No more events to display</Text>}
        onSwipedLeft={() => alert('swiped left')}
        onSwipedRight={() => alert('swiped right')}
        onSwipedBottom={() => alert('swiped down')}
      >
        {EventsData.map((item, index) => (
          <Card key={index}>
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