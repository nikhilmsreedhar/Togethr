import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';


const RegisterPage = () => {
  
  const navigation = useNavigation();
  function navigateBack() {
    navigation.goBack();
  }

  const [fname, setFirst] = React.useState('');
  const [lname, setLast] = React.useState('');
  const [month, setMonth] = React.useState('');
  const [day, setDay] = React.useState('');
  const [year, setYear] = React.useState('');
  const [birthday, setBirthday] = React.useState(new Date());
  const [registerMessage,setRegisterMessage] = React.useState('');
  const [confirmAge, setConfirmAge] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  // const [registerMessage, setRegisterMessage] = React.useState('');
  // const [openDatePicker, setOpenDatePicker] = React.useState();


  function goToNextPage(fname, lname, month, day, year) {
    formatBirthday(year, month, day);
    let age = calculateAge(birthday);

    if (fname == "" || lname == "") {
      setRegisterMessage("Please fill in all fields");
    } else if (age < 18) {
      setRegisterMessage("Must be over 18 to create an account.");
    } else {
      navigation.navigate('RegisterPage2', {firstName: fname, lastName: lname});
    }
  }

  function calculateAge(dob) {
    var diff_ms = Date.now() - dob.getTime();
    var age = new Date(diff_ms);
    return (age.getUTCFullYear() - 1970);
  }

  function formatBirthday(month, day, year) {
    let bdaystr = year + "/" + month + "/" + day;
    let bday = new Date(bdaystr);
    setBirthday(bday);
  }

  // const onDateDismiss = React.useCallback(() => {
  //   setOpenDatePicker(false);
  // }, [setOpenDatePicker]);

  // const onConfirmDate = React.useCallback(
  //   (params) => {
  //     setOpenDatePicker(false);
  //     setBirthday(params.date);
  //   },
  //   [setOpenDatePicker, setBirthday]
  // );


  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
      
      <TouchableOpacity onPress={() => navigateBack()}>
        <Ionicons name="arrow-back"  size={30} color="back" />
      </TouchableOpacity>
      
      <Text style={styles.verticalDivider}></Text>
      <Text h1 style={styles.title}>Register</Text>
      <Text style={styles.verticalDivider}></Text>
        
      <TextInput style={{ alignSelf: 'stretch'}}
        label="First Name"
        value={fname}
        mode='outlined'
        onChangeText={fname => setFirst(fname)}
      />

      <Text style={styles.inputDivider}></Text>

      <TextInput style={{ alignSelf: 'stretch'}}
        label="Last Name"
        value={lname}
        mode='outlined'
        onChangeText={lname => setLast(lname)}
      />

      <Text style={styles.inputDivider}></Text>

      <View
        style={{
          flexDirection: 'row'
        }}
      >
        <TextInput
          label="MM"
          value={month}
          mode='outlined'
          keyboardType='numeric'
          onChangeText={month => setMonth(month)}
        />

        <TextInput
          label="DD"
          value={day}
          mode='outlined'
          keyboardType='numeric'
          onChangeText={day => setDay(day)}
        />

        <TextInput
          label="YYYY"
          value={year}
          mode='outlined'
          keyboardType='numeric'
          onChangeText={year => setYear(year)}
        />
      </View>

      <HelperText type="error">
        {registerMessage}
      </HelperText>

      {/* <Button onPress={() => setOpenDatePicker(true)}>Enter Your Birthday</Button>
      <DatePickerModal
        mode="single"
        visible={openDatePicker}
        onDismiss={onDateDismiss}
        date={birthday}
        onConfirm={onConfirmDate}
        // validRange={{
        //   startDate: new Date(2021, 1, 2),  // optional
        //   endDate: new Date(), // optional
        // }}
        // onChange={} // same props as onConfirm but triggered without confirmed by user
        // saveLabel="Save" // optional
        // label="Select date" // optional
        // animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
      /> */}

      {/* <View style = {{flexDirection: "row"}}>
        <Text>Please confirm that you are over 18 years old.</Text>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            setChecked(!checked);
            setConfirmAge(!checked);
          }}
        />
      </View> */}

      <TouchableOpacity
        //disabled = {confirmAge ? false : true}
        onPress={()=>{goToNextPage(fname, lname)}} 
        style={styles.loginButton}
      >
        <Text style={styles.loginButtonText}>NEXT</Text>
      </TouchableOpacity>

    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 50, 
    fontFamily: 'Comfortaa_400Regular',
  },
  input:{
    padding: 20, 
  
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 25
  },
   verticalDivider: {
    height:50,
  },
  inputDivider: {
    height:20,
  },
  loginButton: {
    backgroundColor: "black",
    borderColor:"black",
    alignSelf: 'stretch',
    height:50,
    borderWidth:3,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 5,
  },
  loginButtonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Roboto_500Medium'
  }, 
});

export default RegisterPage;