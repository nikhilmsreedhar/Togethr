import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import EventCard from '../components/EventCard';
import Data from '../assets/data.js'
import NavigationBar from '../components/NavigationBar';

function Explore() {
  const t = {};

  return (
    <SafeAreaView style={{flex: 1}}>
    <NavigationBar/>
    <View style={styles.page}>
      
      <CardStack 
      disableTopSwipe = 'true'
      disableBottomSwipe = 'true'
      disableLeftSwipe = 'true'
      disableRightSwipe = 'true'
      verticalSwipe = 'false'
      horizontalSwipe = 'false'
      style={styles.content}
      ref={swiper => {t.swiper = swiper }}
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