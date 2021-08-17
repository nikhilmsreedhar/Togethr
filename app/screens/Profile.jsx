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
import ChangePassword from "./ChangePassword";
import { AuthContext } from "../components/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import { defaultInterests } from "../components/Tags";

const STORAGE_KEY = "user_data";

const Profile = () => {
  const { userData, updateUserData, logout } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

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

  const getUserData = () => {
    setFname(userData.FirstName);
    setLname(userData.LastName);
    setTags(userData.Tags);
    const userInitials =
      fname.charAt(0).toUpperCase() + lname.charAt(0).toUpperCase();
    setInitials(userInitials);

    setIsLoading(false);
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
          updateUserData(response.data);
          AsyncStorage.setItem("user_data", JSON.stringify(response.data));
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider>
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

          <Title style={styles.title}>Your Profile</Title>

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
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Interests", { tags: userData.Tags })
                }
              >
                <View style={styles.tagsContainer}>
                  {tags && tags.length
                    ? tags.map((tag) => {
                        return (
                          <Avatar.Icon
                            size={24}
                            icon={
                              defaultInterests.find((t) => t.value == tag).icon
                            }
                          />
                        );
                      })
                    : "No Tags"}
                </View>
              </TouchableOpacity>
            </View>

            <Button mode="outlined" onPress={showChangePassModal}>
              Change Password
            </Button>

            <Button
              mode="outlined"
              onPress={() => {
                logout();
              }}
            >
              Log Out
            </Button>

            <Button color="red" mode="contained" onPress={confirmDelete}>
              Delete Account
            </Button>
          </View>
        </View>
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontFamily: "Comfortaa_400Regular",
    color: "black",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
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
    marginHorizontal: 40,
    backgroundColor: 'white',
    height: 350
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 8,
  },
});

export default Profile;
