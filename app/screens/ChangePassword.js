import React, { useContext, useState } from "react";
import { StyleSheet, View, TouchableOpacity, SafeAreaView } from "react-native";
import { Button, Text, TextInput, HelperText } from "react-native-paper";
import axios from "axios";
import { AuthContext } from "../components/AuthProvider";

const ChangePassword = () => {
  const { userData } = useContext(AuthContext);

  const [pwErrorMessage, setPWErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [currentPass, setCurrentPass] = React.useState("");
  const [newPass, setPass] = React.useState("");
  const [newPassConfirm, setPassConfirm] = React.useState("");

  function submit(currentPass, newPass, passConfirm) {
    if (currentPass === "" || newPass === "" || passConfirm === "") {
      setPWMessage();
      setSuccessMessage();
      setPWErrorMessage("Please fill in all fields");
    } else {
      verifyPassword(currentPass);
    }
  }

  // check that old pw is correct for security
  function verifyPassword() {
    axios
      .post("https://togethrgroup1.herokuapp.com/api/login", {
        UserName: userData.UserName,
        Password: currentPass,
      })
      .then(
        (response) => {
          console.log(response);
          if (newPass != passConfirm) {
            setPWMessage();
            setSuccessMessage();
            setPWErrorMessage("Passwords must match");
          } else {
            changePassword();
          }
        },
        (error) => {
          console.log(error);
          setSuccessMessage();
          setPWErrorMessage();
          setPWMessage("Incorrect Password");
        }
      );
  }

  function changePassword(currentPass) {
    axios
      .patch("https://togethrgroup1.herokuapp.com/api/editpassword", {
        id: userData.id,
        Password: newPass,
      })
      .then(
        (response) => {
          console.log(response);
          setPWMessage();
          setPWErrorMessage();
          setSuccessMessage("Your password was updated!");
        },
        (error) => {
          console.log(error);
          setPWMessage();
          setSuccessMessage();
          setPWErrorMessage("Something went wrong! Try again.");
        }
      );
  }

  const hasErrors = () => {
    return !(newPass == newPassConfirm);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={{ alignSelf: "stretch" }}
        label="Current Password"
        value={currentPass}
        mode="outlined"
        onChangeText={(currentPass) => setCurrentPass(currentPass)}
      />

      <TextInput
        style={{ alignSelf: "stretch" }}
        secureTextEntry
        label="New Password"
        value={newPass}
        mode="outlined"
        onChangeText={(newPass) => setPass(newPass)}
      />

      <TextInput
        style={{ alignSelf: "stretch" }}
        secureTextEntry
        label="Confirm New Password"
        value={newPassConfirm}
        mode="outlined"
        error={newPass == newPassConfirm ? false : true}
        onChangeText={(newPassConfirm) => setPassConfirm(newPassConfirm)}
      />

      <HelperText type="error" visible={hasErrors()}>
        Passwords do not match.
      </HelperText>

      <Text style={styles.inputDivider} />

      <TouchableOpacity
        disabled={newPass == newPassConfirm ? false : true}
        onPress={() => changePassword(currentPass, newPass, newPassConfirm)}
        style={styles.regButton}
      >
        <Text style={styles.regButtonText}>CHANGE PASSWORD</Text>
      </TouchableOpacity>
    </View>
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
  regButton: {
    backgroundColor: "black",
    borderColor: "black",
    alignSelf: "stretch",
    height: 50,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  regButtonText: {
    fontSize: 18,
    color: "white",
    fontFamily: "Roboto_500Medium",
  },
});

export default ChangePassword;
