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
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Button from '@material-ui/core/Button';


export default function NavigationBar() {
    let [fontsLoaded] = useFonts({
        Comfortaa_400Regular,
        Roboto_500Medium,
        Roboto_300Light,
      });

    const navigation = useNavigation();

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }

      setOpen(false);
    };

    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      }
    }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const logout = () => {
    localStorage.remove('user_data');
    setOpen(false);
    navigation.navigate('HomePage')
  };
  const goToSettings = () => {
    setOpen(false);
    navigation.navigate('EditAccountInfo')
  };
  const goToEditInterests = () => {
    setOpen(false);
    navigation.navigate('EditTags')
  };
    
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
            <Button onClick={()=> navigation.navigate("AddEvent")}>
             <Ionicons name="add"  size={30} color="white" />
            </Button>
            <Text style={styles.buttonDivider}></Text>
            <Button
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
                <Ionicons name="person"  size={25} color="white" />
             </Button>
            </View>
        </Toolbar>

        
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={goToEditInterests}>Your Interests</MenuItem>
                    <MenuItem onClick={goToSettings}>Account Settings </MenuItem>
                    <MenuItem onClick={logout}><Ionicons name="exit-outline"  size={24} color="back" />Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
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