import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import {
  useFonts,
  Comfortaa_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/dev';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import NavigationBar from '../components/NavigationBar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';



export default function Profile() {
  var _ud = localStorage.getItem('user_data');
  var ud = JSON.parse(_ud);
  var fname = ud.firstName;
  var lname = ud.lastName;
  var initials = fname.charAt(0).toUpperCase() + lname.charAt(0).toUpperCase()
  const fullName = fname[0].toUpperCase() + fname.substring(1) + " " + lname[0].toUpperCase() + lname.substring(1);
  var tags = ud.interests;

  let [fontsLoaded] = useFonts({
    Comfortaa_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  });

  const navigation = useNavigation();

  const theme = createMuiTheme({
    palette: {
      secondary: {
        main: '#5b06d5'
      }
    }
  });
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const goToChangePassword = () => {
    setOpen(false);
    navigation.navigate('ChangePassword')
  };

  const goToEditInterests = () => {
    setOpen(false);
    navigation.navigate('EditTags')
  };

  const logout = () => {
    setOpen(false);
    navigation.navigate('HomePage')
  };

 return (
  
    <SafeAreaView style={{flex: 1}}>
    <NavigationBar/>
    <MuiThemeProvider theme={theme}>
      <View style={styles.container}>
        <View style={styles.settingsButton}>
         <TouchableOpacity onPress={() => handleClickOpen()}>
           <Ionicons  name="settings"  size={30} color="black" />
           </TouchableOpacity>
        </View>
       <View style={styles.center}>
        <Text h1 style={styles.title}>Profile</Text>
        <Text style={styles.verticalDivider}></Text>
        <Avatar style={{width: theme.spacing(20), height: theme.spacing(20),fontSize: 75, alignSelf: 'center'}}>{initials}</Avatar>
        <Text style={styles.inputDivider}></Text>
        <Text style={styles.text}>{fullName}</Text>
      </View>

        <Dialog
        open={open}
        onClose={handleClose}>
        <DialogTitle >{"Account Settings"}</DialogTitle>
        <DialogContent>
        <List>
          <ListItem button onClick={() => goToEditInterests()}>
            <ListItemText primary='Edit Interests'/>
          </ListItem>

          <ListItem button onClick={() => alert("Edit Info")}>
            <ListItemText primary='Edit Account Information'/>
          </ListItem>

          <ListItem button onClick={() => goToChangePassword()}>
            <ListItemText primary='Change Password'/>
          </ListItem>

          <ListItem button onClick={() => logout()}>
            <ListItemText primary='Logout'/>
            <Ionicons name="exit-outline"  size={24} color="back" />
          </ListItem>       
        </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            CLOSE
          </Button>
        </DialogActions>
      </Dialog>
     </View>
    </MuiThemeProvider>
    </SafeAreaView>
   
    
  );
}


const styles = StyleSheet.create({
  title: {
    fontSize: 60, 
    fontFamily: 'Comfortaa_400Regular',
    alignSelf: 'center', 
  },
  text:{
    fontSize: 30, 
    alignSelf: 'center',
 },
  settingsButton:{
    alignSelf: 'flex-end'
  },
  center: {
    flex: 1,
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
    height:10,
  },
  inputDivider: {
    height:20,
  },
   
});
  