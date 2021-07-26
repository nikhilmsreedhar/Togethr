import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import EventCard from '../components/EventCard';
import Data, { push } from '../assets/data.js'
import NavigationBar from '../components/NavigationBar';
import axios from 'axios';

function Explore() {
  const t = {};
  var i, j;
  var _ud = localStorage.getItem('user_data');
  var ud = JSON.parse(_ud);
  var etags = ud.tags;
  var data = [];

  axios.post('https://togethrgroup1.herokuapp.com/api/retrieveevents', {
    Tags: etags
  })
  .then((response) => {
    console.log(response.data);
    // var ed = JSON.parse(response.data);
    // console.log(ed);  
    // for (i = 0; i < ed.data.length; i++){
    //   var event = ed[i];
    //   data.push(event);
    // }
    // console.log(data);
  }, (error) => {
    console.log(error);
    alert("Something went wrong!");
  });

  return (
    <SafeAreaView style={{flex: 1}}>
    <NavigationBar/>
    <View style={styles.page}>
      
      <CardStack 
      disableTopSwipe = {true}
      disableBottomSwipe = {true}
      disableLeftSwipe = {true}
      disableRightSwipe = {true}
      verticalSwipe = {false}
      horizontalSwipe = {false}
      style={styles.content}
      ref={swiper => {t.swiper = swiper }}
      renderNoMoreCards={() => <Text style={{ fontSize: 18, color: 'gray' }}>No more events to display</Text>}
      onSwipedLeft={() => 
        
        alert('swiped left')
      }
      onSwipedRight={() => 
        alert('swiped right')
      }
      onSwipedBottom={() => alert('swiped down')}>
        {data.map((item, index) => (
        <Card key={index}>
          <EventCard
            title={item.title}
            description={item.description}
            startTime={item.startTime}
            endTime={item.endTime}
            attendees={item.attendees}
            />
        </Card>
         ))}
      </CardStack>

      <View style={{flexDirection:'row'}}> 
      <TouchableOpacity 
        onPress={() => t.swiper.swipeLeft()}>
       <Ionicons name="close-circle"  size={50} color="back" />
      </TouchableOpacity>

      <Text style={styles.buttonSpace}></Text>

      <TouchableOpacity 
        onPress={() => t.swiper.swipeBottom()}>
       <Ionicons name="heart-outline"  size={45} color="back" />
      </TouchableOpacity>

      <Text style={styles.buttonSpace}></Text>

      <TouchableOpacity 
        onPress={() => t.swiper.swipeRight()}>
       <Ionicons name="checkmark-circle"  size={50} color="back" />
      </TouchableOpacity>

    </View>
    </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  content:{
   flex: 5,
   alignItems: 'center',
   justifyContent: 'center',
 },
 page:{
  flex: 1, 
  justifyContent: 'center', 
  alignItems: 'center', 
  paddingBottom: 50,
},
buttonSpace:{
  width: 20
}
})
export default Explore;