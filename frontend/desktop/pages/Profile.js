import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, } from 'react-native';
import {
  useFonts,
  Comfortaa_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/dev';
import { Ionicons } from '@expo/vector-icons'

function Profile() {
  let [fontsLoaded] = useFonts({
    Comfortaa_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  });

  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.header}>
        <Text h1 style={styles.title}>Profile</Text>
        <TouchableOpacity onPress={() => alert('pressed')}>
          <Ionicons name="settings"  size={35} color="back" />
        </TouchableOpacity>
   </View>
  
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 60, 
    fontFamily: 'Comfortaa_400Regular',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 30
  },
   verticalDivider: {
    height:50,
  },
  inputDivider: {
    height:20,
  },
  header: {
    flexDirection: 'row', 
    margin: 25, 
    justifyContent: 'space-between'
  }
});

export default Profile;