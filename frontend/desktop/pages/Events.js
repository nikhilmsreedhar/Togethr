import * as React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, Text} from 'react-native';
import Card from "../components/YourEventCard";
import NavigationBar from '../components/NavigationBar';
import Accordion from '@material-ui/core/Accordion';
import {
  useFonts,
  Comfortaa_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/dev';
import Data from '../assets/data.js'


function Events() {
  return (
    <SafeAreaView style={{flex: 1}}>
    <NavigationBar/>
    <View style={styles.container}>
    
        <View style={styles.center}>
        <Text h1 style={styles.title}>Your Events</Text>
        <Text style={styles.verticalDivider}></Text>
        <Text Text style={styles.inputDivider}></Text>
    <ScrollView>
    {Data.map((item, index) => (
    <Accordion
      key={index}
    >
      
        <Card 
         title={item.title}
         description={item.description}
         startDate={item.startDate}
         endDate={item.endDate}
         attendees={item.attendees}/>
      
    </Accordion> 
    ))}
    </ScrollView>
    </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 60, 
    fontFamily: 'Comfortaa_400Regular',
    alignSelf: 'center', 
  },
  center: {
    flex: 1,
    alignContent: 'center',
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 25
  },
   verticalDivider: {
    height:10,
  },
  inputDivider: {
    height:20,
  },
});
  

export default Events;
