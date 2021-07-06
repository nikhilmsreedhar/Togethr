import * as React from 'react';
import { Text, View } from 'react-native';
import CardStack, { Card } from 'react-native-card-stack-swiper';
import EventCard from '../components/EventCard';

function Explore() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CardStack ref={swiper => { this.swiper = swiper }}
      onSwipedLeft={() => alert('swiped left')}
      onSwipedRight={() => alert('swiped right')}>
        <Card><EventCard content={'A'}/></Card>
        <Card><EventCard content={'B'}/></Card>
        <Card><EventCard content={'C'}/></Card>
      </CardStack>
    </View>
  );
}

export default Explore;