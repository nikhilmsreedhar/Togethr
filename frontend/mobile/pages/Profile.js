import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  Avatar,
  Button,
  Modal,
  Portal,
  Provider,
  Surface,
  TextInput,
  Title,
} from "react-native-paper";
import axios from "axios";
import UserData from "../assets/UserData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChangePassword from "../components/ChangePassword";

const STORAGE_KEY = "user_data";

const Profile = () => {
  React.useEffect(() => {
    getUserData();
  }, []);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [initials, setInitials] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [changePassVisible, setChangePassVisible] = useState(false);
  const [tags, setTags] = useState([]);

  const showChangePassModal = () => setChangePassVisible(true);
  const confirmDelete = () => setDeleteModalVisible(true);
  const hidePassDeleteWarning = () => setDeleteModalVisible(false);
  const hideChangePass = () => setChangePassVisible(false);

  const getUserData = async () => {
    try {
      const udJSON = await AsyncStorage.getItem(STORAGE_KEY);
      const userData = udJSON != null ? JSON.parse(udJSON) : null;

      if (userData !== null) {
        setFname(userData.firstName);
        setLname(userData.lastName);
        setTags(userData.tags);
        const userInitials =
          fname.charAt(0).toUpperCase() + lname.charAt(0).toUpperCase();
        setInitials(userInitials);
      } else {
        setFname(UserData.firstName);
        setLname(UserData.lastName);
      }
      return;
    } catch (e) {
      console.error("Unable to get user info");
    }
  };

  const sendUserData = () => {
    axios
      .patch("https://togethrgroup1.herokuapp.com/api/edituser", {
        id: userid,
        FirstName: first,
        LastName: last,
        UserName: username,
        Email: email,
      })
      .then(
        (response) => {
          var UserData = {
            firstName: response.data.FirstName,
            lastName: response.data.LastName,
            username: response.data.UserName,
            id: userid,
            interests: response.data.Tags,
            emailAddress: response.data.Email,
          };
          localStorage.setItem("user_data", JSON.stringify(UserData));
          console.log(response);
          setErrorMessage();
          setMessage("Your information was updated!");
        },
        (error) => {
          console.log(error);
          setMessage();
          setErrorMessage("Something went wrong! Try again.");
        }
      );
  };

  const deleteAccount = () => {
    axios
      .delete("https://togethrgroup1.herokuapp.com/api/login")
      .then(() => navigation.navigate("WelcomeScreen"));
  };

  return (
    <Provider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Portal>
            {/* Change Password Warning */}
            <Modal
              //style={{margin:50}}
              contentContainerStyle={styles.modal}
              visible={deleteModalVisible}
              onDismiss={hidePassDeleteWarning}
            >
              <View style={{ backgroundColor: "white" }}>
                <Text style={{ padding: 40 }}>
                  Are you sure you want to delete your account?
                </Text>
                <Button
                  style={{ margin: 40 }}
                  color="red"
                  mode="contained"
                  onPress={() => {}}
                >
                  DELETE
                </Button>
              </View>
            </Modal>

            {/* Change Password */}
            <Modal
              contentContainerStyle={styles.modal}
              visible={changePassVisible}
              onDismiss={hideChangePass}
            >
              <ChangePassword />
            </Modal>
          </Portal>

          <Text style={styles.title}>Your Profile</Text>

          <View
            style={{
              flex: 1,
              justifyContent: "flex-start",
              alignItems: "stretch",
              borderWidth: 0,
            }}
          >
            <View style={{ alignItems: "center", marginTop: 40 }}>
              <Avatar.Text size={200} label={initials} />
              <Text style={{ marginTop: 10, fontSize: 50 }}>
                {fname} {lname}
              </Text>
            </View>

            <View style={{ marginVertical: 30 }}>
              <Text>Your Interests:</Text>
              <View style={{ borderWidth: 1, padding: 10 }}>
                <Text>
                  {tags.map((tag) => {
                    return tag + " ";
                  })}
                </Text>
              </View>
            </View>

            <Button mode="outlined" onPress={showChangePassModal}>
              Change Password
            </Button>

            <Button mode="outlined" onPress={() => {}}>
              Log Out
            </Button>

            <Button color="red" mode="contained" onPress={confirmDelete}>
              Delete Account
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 60,
    fontFamily: "Comfortaa_400Regular",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    margin: 30,
  },
  verticalDivider: {
    height: 50,
  },
  inputDivider: {
    height: 20,
  },
  header: {
    flexDirection: "row",
    margin: 25,
    justifyContent: "space-between",
  },
  modal: {
    marginHorizontal: 50,
  },
});

export default Profile;
