import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {
    useFonts,
    Comfortaa_400Regular,
    Roboto_500Medium,
    Roboto_300Light,
  } from '@expo-google-fonts/dev';


export default function NavigationBar() {
    let [fontsLoaded] = useFonts({
        Comfortaa_400Regular,
        Roboto_500Medium,
        Roboto_300Light,
      });

    const navigation = useNavigation();
    
  return (
    
      <AppBar style={{ background: 'black' }} position="static">
        <Toolbar>
            <Text style={styles.title}>Togethr</Text>

            <TouchableOpacity onPress={()=> navigation.navigate("Explore")} style={styles.menuItem}>
             Explore
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> navigation.navigate("Events")} style={styles.menuItem}>
             My Events
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> navigation.navigate("Likes")} style={styles.menuItem}>
             My Saves
            </TouchableOpacity>
           

            <View style={styles.iconItems}>
            <TouchableOpacity onPress={()=> navigation.navigate("AddEvent")}>
             <Ionicons name="add"  size={30} color="white" />
            </TouchableOpacity>
            <Text style={styles.buttonDivider}></Text>
            <TouchableOpacity onPress={()=> navigation.navigate("Profile")}>
             <Ionicons name="person"  size={25} color="white" />
            </TouchableOpacity>
            </View>
        </Toolbar>
      </AppBar>
  
  );
}

const styles = StyleSheet.create({
    title: {
      color: 'white',
      fontSize: 30, 
      fontFamily: 'Comfortaa_400Regular',
      flexGrow: 1
    },
    iconItems: {
      flexDirection: 'row',
    },
    buttonDivider: {
        width:10,
    },
    menuItem: {
        color: 'white',
        fontSize: 15, 
        fontFamily: 'Roboto_300Light',
        flexGrow: 1
    },
});