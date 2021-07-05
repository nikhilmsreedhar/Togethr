import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import {
  useFonts,
  Comfortaa_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/dev';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { TextInput, HelperText} from 'react-native-paper';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';



export default function RegisterPage() {
  let [fontsLoaded] = useFonts({
    Comfortaa_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  });

  
  const navigation = useNavigation();
  function navigateBack() {
    navigation.goBack();
}

function goToNextPage(fname, lname, bday){
  if (fname == "" || lname == "" || bday == "") {
    alert('Please fill in all fields') ;
  }
  else{
   navigation.navigate('RegisterPage2', {firstName: fname, lastName: lname, birthday: bday});
  }
}

// Caclulate users age to make sure they are 18
function calculate_age(dob1){
  var today = new Date();
  var birthDate = new Date(dob1);  
  var age_now = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
  {
      age_now--;
  }
  console.log(age_now);
  return age_now;
}

const over18 = (dob1) => {
  return !(calculate_age(dob1)>=18);
};


const [fname, setFirst] = React.useState('');
const [lname, setLast] = React.useState('');
const [birthday, setBirthday] = React.useState(new Date());

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: '#5b06d5'
    }
  }
});

  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
      
    <TouchableOpacity onPress={() => navigateBack()}>
      <Ionicons name="arrow-back"  size={30} color="back" />
    </TouchableOpacity>
    <View style={styles.center}>
        <Text h1 style={styles.title}>Register</Text>
        <Text style={styles.verticalDivider}></Text>
        
        <TextInput style={styles.input}
          label="First Name"
          value={fname}
          mode='outlined'
          onChangeText={fname => setFirst(fname)}
        />

        <Text style={styles.inputDivider}></Text>

        <TextInput style={styles.input}
          label="Last Name"
          value={lname}
          mode='outlined'
          onChangeText={lname => setLast(lname)}
         />

          <Text style={styles.inputDivider}></Text>
          
          <MuiThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
            autoOk
            color='secondary'
            variant="inline"
            inputVariant="outlined"
            label="Birthday"
            format="MM/dd/yyyy"
            value={birthday}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            onChange={birthday => setBirthday(birthday)}
          />
          </MuiPickersUtilsProvider>
          <HelperText type="error" visible={over18(birthday)}>
            Must be over 18 to crate an account
          </HelperText>
          </MuiThemeProvider>

          <Text style={styles.inputDivider}></Text>
         <View style={styles.fixToText}>
        <TouchableOpacity onPress={()=>navigateBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>CANCEL</Text>
       </TouchableOpacity>
       <Text style={styles.buttonDivider}></Text>
       <TouchableOpacity disabled = {(calculate_age(birthday) >= 18) ? false : true} onPress={() => goToNextPage(fname, lname, birthday)} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>NEXT</Text>
       </TouchableOpacity>
        </View>
       

        </View>
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
    width: 500,
 },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 25
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center'
  },
   verticalDivider: {
    height:25,
  },
  inputDivider: {
    height:20,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nextButton: {
    backgroundColor: "black",
    borderColor:"black",
    alignSelf: 'stretch',
    height:50,
    width: 245,
    borderWidth:3,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 5,
  },
  nextButtonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Roboto_500Medium'
  }, 
  backButton: {
    backgroundColor: "grey",
    borderColor:"grey",
    width:245,
    height:50,
    borderWidth:3,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 5,
  },
  backButtonText: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Roboto_500Medium'
  }, 
  buttonDivider: {
    width:10,
  },
});
  