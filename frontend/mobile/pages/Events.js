import * as React from 'react';
import {
  FlatList,
  Text,
  View, 
  ScrollView,
  StyleSheet, 
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { Button } from 'react-native-paper';
import EventCard from '../components/EventCard';
import EventsData from '../assets/data';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Events = () => {

  React.useEffect(() => {
    getEventsData()
  }, [])

  const getEventsData = () => {
    
  }

  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
      <View 
        style={{
          paddingTop: 50,
          marginHorizontal: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <Text h1 style={styles.title}>Your Events</Text>
          <Button icon="dots-vertical"/>
      </View>

      <ScrollView>
        <FlatList
          style={{alignSelf: "center"}}
          numColumns={1}
          data={EventsData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <EventCard
                image={item.image}
                name={item.name}
                status={item.status}
                variant
              />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 50, 
    fontFamily: 'Comfortaa_400Regular',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 30
  },
   verticalDivider: {
    height:50,
  },
  inputDivider: {
    height:20,
  },
});

export default Events;