import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import EventCard from '../components/EventCard';
import Data from '../assets/data.js'
import NavigationBar from '../components/NavigationBar';

function Explore(swiper) {
   var swiper;
  return (
    <SafeAreaView style={{flex: 1}}>
    <NavigationBar/>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection:'row'}}>
      
    <TouchableOpacity 
    ref={swiper => {swiper = swiper }}
    onPress={() => this.swiper.swipeLeft()}>
      <Ionicons name="arrow-back"  size={30} color="back" />
    </TouchableOpacity>
      
      <CardStack 
      disableTopSwipe = 'true'
      style={styles.content}
      ref={swiper => {swiper = swiper }}
      renderNoMoreCards={() => <Text style={{ fontSize: 18, color: 'gray' }}>No more events to display</Text>}
      onSwipedLeft={() => alert('swiped left')}
      onSwipedRight={() => alert('swiped right')}
      onSwipedBottom={() => alert('swiped down')}>
        {Data.map((item, index) => (
        <Card key={index}>
          <EventCard
            title={item.title}
            description={item.description}
            date={item.date}
            startTime={item.startTime}
            endTime={item.endTime}
            atendees={item.atendees}
            />
        </Card>
         ))}
      </CardStack>
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
})
export default Explore;