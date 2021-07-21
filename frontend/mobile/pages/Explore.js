import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import EventCard from '../components/EventCard';
import Data from '../assets/data.js'
import BottomNavigator from '../components/BottomNavigator'


function Explore() {
  const t = {};
  return (    
    <SafeAreaView style={{flex: 1}}>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CardStack 
        disableTopSwipe = 'true'
        style={styles.content}
        ref={swiper => { t.swiper = swiper }}
        renderNoMoreCards={() => <Text style={{ fontSize: 18, color: 'gray' }}>No more events to display</Text>}
        onSwipedLeft={() => alert('swiped left')}
        onSwipedRight={() => alert('swiped right')}
        onSwipedBottom={() => alert('swiped down')}>
        {Data.map((item, index) => (
          <Card key={index}
            onSwipedLeft={() => alert('swiped left')}
            onSwipedRight={() => alert('swiped right')}
            onSwipedBottom={() => alert('swiped down')}
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