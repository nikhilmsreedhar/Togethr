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




const RegisterPage2 = ({route}) =>{
  let [fontsLoaded] = useFonts({
    Comfortaa_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  });

  const firstName = route.params.firstName
  const lastName  = route.params.lastName
  const birthday  = route.params.birthday


  
  const navigation = useNavigation();
  function navigateBack() {
    navigation.goBack();
}

function goToNextPage (firstName, lastName, user, pass, birthday) {
  if(user == "" || pass == ""){
    alert('Please fill in all fields') ;
  }
  else{
    navigation.navigate('RegisterPage3', {firstName: firstName, lastName: lastName, username: user, password: pass, birthday: birthday});
  }
  };
  
  

const [user, setUser] = React.useState('');
const [pass, setPass] = React.useState('');
const [passConfirm, setPassConfirm] = React.useState('');

const hasErrors = () => {
    return !(pass == passConfirm);
  };

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
          label="Username"
          value={user}
          mode='outlined'
          onChangeText={user => setUser(user)}
        />

        <Text style={styles.inputDivider}></Text>

        <TextInput style={styles.input}
        secureTextEntry
          label="Password"
          value={pass}
          mode='outlined'
          onChangeText={pass => setPass(pass)}
        />
        
        <Text style={styles.inputDivider}></Text>

        <TextInput style={styles.input}
        secureTextEntry
          label="Confirm Password"
          value={passConfirm}
          mode='outlined'
          error = {(pass == passConfirm) ? false : true}
          onChangeText={passConfirm => setPassConfirm(passConfirm)}
        />
        <HelperText type="error" visible={hasErrors()}>
        Passwords do not match
       </HelperText>
        
        <Text style={styles.inputDivider}></Text>

       
         <View style={styles.fixToText}>
        <TouchableOpacity   onPress={()=>navigateBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>BACK</Text>
       </TouchableOpacity>
       <Text style={styles.buttonDivider}></Text>
       <TouchableOpacity disabled = {(pass == passConfirm) ? false : true} onPress={() => goToNextPage(firstName, lastName, user, pass, birthday)} style={styles.nextButton}>
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
 center: {
  flex: 1,
  justifyContent: 'center',
  alignContent: 'center',
  alignSelf: 'center'
},
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 25
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
  
export default RegisterPage2;