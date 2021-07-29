import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Button, HelperText, TextInput } from "react-native-paper";
import { useForm } from "react-hook-form";
import DatePicker from "@dietime/react-native-date-picker";

const RegisterPage = () => {
  const navigation = useNavigation();
  function navigateBack() {
    navigation.goBack();
  }

  const [fname, setFirst] = React.useState("");
  const [lname, setLast] = React.useState("");
  const [birthday, setBirthday] = React.useState(new Date());
  const [registerMessage, setRegisterMessage] = React.useState("");
  const [confirmAge, setConfirmAge] = React.useState(false);

  function goToNextPage(fname, lname) {
    const age = calculateAge(birthday);

    if (fname == "" || lname == "") {
      setRegisterMessage("Please fill in all fields");
    } else if (age < 18) {
      setRegisterMessage("Must be over 18 to create an account.");
    } else {
      navigation.navigate("RegisterPage2", {
        firstName: fname,
        lastName: lname,
      });
    }
  }

  function calculateAge(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age = new Date(diff_ms);
    return age.getUTCFullYear() - 1970;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigateBack()}>
          <Ionicons name="arrow-back" size={30} color="back" />
        </TouchableOpacity>

        <Text style={styles.verticalDivider}></Text>
        <Text h1 style={styles.title}>
          Register
        </Text>
        <Text style={styles.verticalDivider}></Text>

        <TextInput
          style={{ alignSelf: "stretch" }}
          label="First Name"
          value={fname}
          mode="outlined"
          onChangeText={(fname) => setFirst(fname)}
        />

        <Text style={styles.inputDivider}></Text>

        <TextInput
          style={{ alignSelf: "stretch" }}
          label="Last Name"
          value={lname}
          mode="outlined"
          onChangeText={(lname) => setLast(lname)}
        />

        <Text style={styles.inputDivider}></Text>

        <View>
          <Text>{birthday ? birthday.toDateString() : "Select date..."}</Text>
          <DatePicker
            height={200}
            width="100%"
            value={birthday}
            onChange={(value) => setBirthday(value)}
            format="mm-dd-yyyy"
          />
        </View>

        <HelperText type="error">{registerMessage}</HelperText>

        <TouchableOpacity
          //disabled = {confirmAge ? false : true}
          onPress={() => {
            goToNextPage(fname, lname);
          }}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>NEXT</Text>
        </TouchableOpacity>
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

export default RegisterPage;
