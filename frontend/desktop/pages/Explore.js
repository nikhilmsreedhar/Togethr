import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import EventCard from '../components/EventCard';
import NavigationBar from '../components/NavigationBar';

function Explore() {
  return (
    <SafeAreaView style={{flex: 1}}>
    <NavigationBar/>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Explore!</Text>
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