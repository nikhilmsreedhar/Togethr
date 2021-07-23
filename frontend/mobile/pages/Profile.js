import * as React from "react";
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
  Title
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

  //const fullName = fname[0].toUpperCase() + fname.substring(1) + " " + lname[0].toUpperCase() + lname.substring(1);
  //var tags = ud.interests;
  const [fname, setFname] = React.useState("");
  const [lname, setLname] = React.useState("");
  //const [initials, setInitials] = React.useState(fname.charAt(0).toUpperCase() + lname.charAt(0).toUpperCase());
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  const [changePassVisible, setChangePassVisible] = React.useState(false);
  const [tags, setTags] = React.useState([]);

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
      } else {
        setFname(UserData.firstName);
        setLname(UserData.lastName);
      }
    } catch (e) {
      console.error("Unable to get user info");
    }
  };

  const deleteAccount = () => {
    axios
      .delete("https://togethrgroup1.herokuapp.com/api/login")
      .then(() => navigation.navigate("WelcomeScreen"));
  };

  return (
    <Provider>
      <Portal>
        {/* Change Password Warning */}
        <Modal style={styles.modal} visible={deleteModalVisible} onDismiss={hidePassDeleteWarning}>
          <Text style={{ padding: 50 }}>
            Are you sure you want to delete your account?
          </Text>
          <Button color="red" mode="contained" onPress={deleteAccount}>
            DELETE
          </Button>
        </Modal>

        {/* Change Password */}
        <Modal style={styles.modal} visible={changePassVisible} onDismiss={hideChangePass}>
          <ChangePassword />
        </Modal>
      </Portal>

      <Text
        style={{
          fontSize: 50,
          fontFamily: "Comfortaa_400Regular",
        }}
      >
        Your Profile
      </Text>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar.Icon size={100} icon="account" />

        <View style={{alignItems: "center"}}>
          <Title>
            {fname} {lname}
          </Title>
          <Text>
            Your Interests:
            {tags.map((tag) => {
              return <Text>{JSON.stringify(tag)}</Text>;
            })}
          </Text>
        </View>

        <Button mode="outlined" onPress={showChangePassModal}>
          Change Password
        </Button>

        <Button mode="outlined" onPress={{}}>
          Log Out
        </Button>

        <Button color="red" mode="contained" onPress={confirmDelete}>
          Delete Account
        </Button>
      </View>
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
    marginHorizontal: 50
  }
});

export default Profile;
