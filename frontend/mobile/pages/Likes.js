import * as React from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import LikedCard from "../components/LikedCard";
import EventsData from "../assets/data";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Tags from "./Tags";
import UserData from "../assets/UserData";

const STORAGE_KEY = "user_data";

const Likes = () => {
  React.useEffect(() => {
    getTagData();
  }, []);

  const [tags, setTags] = React.useState([]);

  const getTagData = async () => {
    try {
      const udJSON = await AsyncStorage.getItem(STORAGE_KEY);
      const userData = udJSON != null ? JSON.parse(udJSON) : null;

      if (userData !== null) {
        setTags(userData.tags);
      } else {
        setTags(UserData.tags);
      }
    } catch (e) {
      console.error("Unable to get user info");
    }
  };

  return (
    <View style={{flex: 1}}>
      <Text style={{ fontSize: 50, fontFamily: "Comfortaa_400Regular" }}></Text>
      <Tags tagList={tags} />
    </View>
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

export default Likes;
