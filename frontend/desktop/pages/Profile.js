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

  const logout = () => {
    setOpen(false);
    navigation.navigate('HomePage')
  };

 return (
  
    <SafeAreaView style={{flex: 1}}>
      <NavigationBar/>
      <MuiThemeProvider theme={theme}>
      <View style={styles.header}>
        <Text h1 style={styles.title}>Profile</Text>
        <TouchableOpacity onPress={() =>  handleClickOpen()}>
          <Ionicons name="settings"  size={50} color="back" />
        </TouchableOpacity>
      </View>
        <View style={styles.container}>
              <Avatar style={{
                width: theme.spacing(25), height: theme.spacing(25),fontSize: 75}}>
                {initials}</Avatar>
              <Text>{fname}</Text>
              <Text>{lname}</Text>
        </View>

        <Dialog
        open={open}
        onClose={handleClose}>
        <DialogTitle >{"Account Settings"}</DialogTitle>
        <DialogContent>
        <List>
          <ListItem button onClick={() => alert("Edit Interests")}>
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

      </MuiThemeProvider>
    </SafeAreaView>
   
    
  );
}


const styles = StyleSheet.create({
  title: {
    fontSize: 60, 
    fontFamily: 'Comfortaa_400Regular',
    alignSelf: 'left',
  },
  input:{
    width: 500,
 },
  closeButton:{
    alignSelf: 'flex-end'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    flexDirection: 'row',
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
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonDivider: {
    width:10,
  },
  header: {
    flexDirection: 'row', 
    margin: 25, 
    justifyContent: 'space-between'
  }
});
  