import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import {
  useFonts,
  Comfortaa_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/dev';


function Events() {
  let [fontsLoaded] = useFonts({
    Comfortaa_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  });

  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
    
        <Text h1 style={styles.title}>Your Events</Text>
        <Text style={styles.verticalDivider}></Text>
      
   </View>
  
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 50, 
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
});

export default Events;