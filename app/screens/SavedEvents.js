import React from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  ImageBackground,
  FlatList
} from 'react-native';
import { Button, Text } from 'react-native-paper';
import EventCard from '../components/EventCard';
import EventsData from '../assets/EventsData';

const SavedEvents = () => {
  return (
    <View>
      <ScrollView>
        <View style={{
          paddingTop: 50,
          marginHorizontal: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <Text>Events</Text>
          <Button icon="dots-vertical"/>
        </View>

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

  );
};

export default SavedEvents;