import React, { useContext, useState } from "react";
import axios from "axios";
import {
  FlatList,
  Text,
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import AttendingCard from "../components/AttendingCard";
import EventsData from "../assets/data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../components/Loading";
import {AuthContext} from "../components/AuthProvider";

const STORAGE_KEY = "events_data";

const Events = () => {
  const { userData } = useContext(AuthContext);

  React.useEffect(() => {
    getEventsData();
    setIsLoading(false);
  }, []);

  const [eventsData, setEventsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getEventsData = async () => {
    axios
      .post("https://togethrgroup1.herokuapp.com/api/viewattendingevents", {
        AttendingEvents: userData.AttendingEvents,
      })
      .then(
        (response) => {
          console.log(response);
          setEventsData(response.data);
        },
        (error) => {
          console.log(error);
        }
      );

    // try {
    //   const edJSON = await AsyncStorage.getItem(STORAGE_KEY);
    //   const ed = edJSON != null ? JSON.parse(udJSON) : null;

    //   if (ed !== null) {
    //     setEventsData(ed);
    //   } else {
    //   }
    // } catch (e) {
    //   console.error("Unable to get user info");
    // }
  };

  function removeEvent() {
    
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View
          style={{
            paddingTop: 20,
            marginHorizontal: 10,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text h1 style={styles.title}>
            Your Events
          </Text>
        </View>

        <FlatList
          style={{ width: "100%" }}
          numColumns={1}
          data={eventsData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <AttendingCard
                maker={item.Maker}
                title={item.EventName}
                description={item.EventDescription}
                location={item.EventLocation}
                startDate={item.StartDate}
                endDate={item.EndDate}
                numGuests={item.NumGuests}
                attendees={item.Attendees}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    fontFamily: "Comfortaa_400Regular",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  verticalDivider: {
    height: 50,
  },
  inputDivider: {
    height: 20,
  },
});

export default Events;
