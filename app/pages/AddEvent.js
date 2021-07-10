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
import { TextInput } from 'react-native-paper';




export default function AddEvent() {
  let [fontsLoaded] = useFonts({
    Comfortaa_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  });

  
  const navigation = useNavigation();
  function navigateBack() {
    navigation.goBack();
}

const [title, setTitle] = React.useState('');
const [descrip, setDescrip] = React.useState('');

const login = (user, pass) => {
  if (user == "" || pass  == ""){
    alert("Please fill in all fields");
  }
  else{
    alert('Username: ' + user + ' Password: '+ pass);
  }
  
};

 return (

    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
        <View style={styles.closeButton}>
            <TouchableOpacity onPress={() => navigateBack()}>
            <Ionicons  name="close"  size={30} color="back" />
            </TouchableOpacity>
        </View>
        <Text style={styles.verticalDivider}></Text>
        <Text h1 style={styles.title}>Create Activity</Text>
        <Text style={styles.verticalDivider}></Text>
        
        <TextInput style={{ alignSelf: 'stretch'}}
          label="Title"
          value={title}
          mode='outlined'
          onChangeText={title => setTitle(title)}
        />

        <Text style={styles.inputDivider}></Text>

        <TextInput style={{ alignSelf: 'stretch'}}
          label="Description"
          value={descrip}
          mode='outlined'
          onChangeText={descrip => setDescrip(descrip)}
        />

        

    </View>
  
    
    </SafeAreaView>
   
    
  );
}


const styles = StyleSheet.create({
  title: {
    fontSize: 45, 
    fontFamily: 'Comfortaa_400Regular',
    alignSelf: 'center', 
  },
  input:{
    padding: 20, 
  
 },
  closeButton:{
    alignSelf: 'flex-end'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 25
  },
   verticalDivider: {
    height:10,
  },
  inputDivider: {
    height:20,
  },
 
});
  