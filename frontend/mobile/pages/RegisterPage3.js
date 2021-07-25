import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const RegisterPage3 = ({ route }) => {
  const firstName = route.params.firstName;
  const lastName = route.params.lastName;
  const username = route.params.username;
  const password = route.params.password;

  const navigation = useNavigation();
  function navigateBack() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigateBack()}>
          <Ionicons name="arrow-back" size={30} color="back" />
        </TouchableOpacity>

        <Text style={styles.verticalDivider}></Text>
        <Text h1 style={styles.title}>
          Add Your Interests!
        </Text>
        <Text style={styles.verticalDivider}></Text>

        <Tags tagList={tags} />
        
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
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

export default RegisterPage3;
