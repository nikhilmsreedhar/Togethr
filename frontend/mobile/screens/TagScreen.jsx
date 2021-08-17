import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import {
  IconButton,
  Text,
  Title
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Tags from "../components/Tags";

const Interests = ({ route }) => {

  const navigation = useNavigation();
  function navigateBack() {
    navigation.goBack();
  }

  const [isLoading, setIsLoading] = useState(true);
  const [tags, setTags] = useState(route.params.tags);


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>

        <IconButton icon="arrow-back" onPress={() => navigateBack()}/ >

        <Title style={styles.title}>
          Add Your Interests!
        </Title>

        <Tags tagList={tags} />
        
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontFamily: "Comfortaa_400Regular",
  },
  input: {
    padding: 20,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: 25,
  },
  verticalDivider: {
    height: 50,
  },
  inputDivider: {
    height: 20,
  },
  loginButton: {
    backgroundColor: "black",
    borderColor: "black",
    alignSelf: "stretch",
    height: 50,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  loginButtonText: {
    fontSize: 18,
    color: "white",
    fontFamily: "Roboto_500Medium",
  },
});

export default Interests;
