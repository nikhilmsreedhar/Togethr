import React, { useEffect, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import CardStack, { Card } from "react-native-card-stack-swiper";
import EventCard from "../components/EventCard";
import Data, { push } from "../assets/data.js";
import NavigationBar from "../components/NavigationBar";
import axios from "axios";

function Explore() {

  //retrieve user tags for POST to API
  var counter = 0;
  const _ud = localStorage.getItem("user_data");
  const ud = JSON.parse(_ud);
  const userid = ud.id;
  const userName = ud.username;
  const myLikes = ud.likes;
  const myAttends = ud.attend;

  //returns true or false depending on if page is focused or not
  const isFocused = useIsFocused();

  useEffect(() => {
    counter = 0;
    console.log('IN USE EFFECT');
    const userTags = ud.tags;
    getEventsData(userTags);
    return () => console.log("exiting useEffect");
  }, [isFocused]);

  
  
  // useFocusEffect should run every time the Explore page is focused
  // useFocusEffect(() => {
  //   getEventsData();
  //   console.log("called");
  //   console.log(eventData);
  // });

  //for use by the swiper
  const [t, setT] = React.useState({});

  const [eventData, setEventsData] = React.useState([]);

  function getEventsData(userTags) {
    axios.post("https://togethrgroup1.herokuapp.com/api/retrieveevents", {
        Tags: userTags,
      })
      .then(
        (response) => {
          console.log(response);
          var postData = response.data;
          postData = postData.filter(postData=> postData.Maker !== userid);
          postData = postData.filter(postData=> myAttends.includes(postData._id) !== true);
          postData = postData.filter(postData=> myLikes.includes(postData._id) !== true);

          setEventsData(postData);
          console.log(postData);
          console.log("Updated eventData");
        },
        (error) => {
          console.log(error);
          alert("Failed to Update Events!");
        }
      );
  }

  function swipeDown(event, userid, myLikes){
    myLikes.push(event);
    axios.patch('https://togethrgroup1.herokuapp.com/api/edituser', {
      id: userid, 
      LikedEvents: myLikes
    })
    .then((response) => {
      var UserData = {firstName:response.data.FirstName, lastName:response.data.LastName, username:response.data.UserName, 
        id:userid, tags: response.data.Tags, emailAddress: response.data.Email, likes: response.data.LikedEvents, 
        attend: response.data.AttendingEvents}
      localStorage.setItem('user_data', JSON.stringify(UserData));
      console.log(response);
    }, (error) => {
      console.log(error);
    });
    counter++;
  }

  function swipeRight(event, userName, userid, myAttends){
    myAttends.push(event._id);
    axios.patch('https://togethrgroup1.herokuapp.com/api/edituser', {
      id: userid, 
      AttendingEvents: myAttends
    })
    .then((response) => {
      var UserData = {firstName:response.data.FirstName, lastName:response.data.LastName, username:response.data.UserName, 
        id:userid, tags: response.data.Tags, emailAddress: response.data.Email, likes: response.data.LikedEvents, 
        attend: response.data.AttendingEvents}
      localStorage.setItem('user_data', JSON.stringify(UserData));
      console.log(response);
    }, (error) => {
      console.log(error);
    });
    var attendeeList = event.Attendees;
    attendeeList.push(userName);
    axios.patch('https://togethrgroup1.herokuapp.com/api/editevent', {
      id: event._id, 
      Attendees: attendeeList
    })
    .then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
    counter++;
  }

  function swipeLeft(){
    counter++;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationBar />
      <View style={styles.page}>
        <CardStack
          disableTopSwipe
          disableBottomSwipe
          disableLeftSwipe
          disableRightSwipe
          style={styles.content}
          ref={(component) => {
            t.swiper = component;
          }}
          renderNoMoreCards={() => (
            <Text style={{ fontSize: 18, color: "gray" }}>
              No more events to display. Come back later!
            </Text>
          )}
          onSwipedLeft={() => swipeLeft()}
          onSwipedRight={() => swipeRight(eventData[counter], userName, userid, myAttends)}
          onSwipedBottom={() => swipeDown(eventData[counter]._id, userid, myLikes)}
          key={isFocused}
        >
          {eventData.map((item, index) => (
            <Card key={index}>
              <EventCard
                title={item.EventName}
                description={item.EventDescription}
                startDate={item.StartDate}
                endDate={item.EndDate}
                location={item.EventLocation}
                attendees={item.Attendees}
                guests={item.NumGuests}
              />
            </Card>
          
          ))}
        </CardStack>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => t.swiper.swipeLeft()}>
            <Ionicons name="close-circle" size={50} color="back" />
          </TouchableOpacity>

          <View style={styles.buttonSpace} />

          <TouchableOpacity onPress={() => t.swiper.swipeBottom()}>
            <Ionicons name="heart-outline" size={45} color="back" />
          </TouchableOpacity>

          <View style={styles.buttonSpace} />

          <TouchableOpacity onPress={() => t.swiper.swipeRight()}>
            <Ionicons name="checkmark-circle" size={50} color="back" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  buttonSpace: {
    width: 20,
  },
});
export default Explore;
