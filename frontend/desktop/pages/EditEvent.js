import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import {
  useFonts,
  Comfortaa_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/dev';
import { HelperText } from 'react-native-paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import NavigationBar from '../components/NavigationBar';


const EditEvent = ({route}) =>{
  let [fontsLoaded] = useFonts({
    Comfortaa_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  });

  const theme = createMuiTheme({
    palette: {
      secondary: {
        main: '#5b06d5'
      }
    }
  });

  const e_id = route.params._id
  const etitle  = route.params.title
  const edescrip  = route.params.descrip
  const esD = route.params.sD
  const eeD  = route.params.eD
  const eguests  = route.params.guests
  const elocation  = route.params.location
  const etag  = route.params.tag

  var _ud = localStorage.getItem('user_data');
  var ud = JSON.parse(_ud);
  var userid = ud.id;
  var userName = ud.username;
  var attending = ud.attend;

  let attendees = new Array();
  attendees.push(userName);

const [title, setTitle] = React.useState(etitle);
const [location, setLocation] = React.useState(elocation);
const [description, setDescrip] = React.useState(edescrip);
const [guests, setGuests] = React.useState(eguests);
const [category, setCat] = React.useState(etag);
const [startTime, setStartTime] = React.useState(new Date(esD));
const [endTime, setEndTime] = React.useState(new Date(eeD));
const [addMessage, setAddMessage] = React.useState();
const [addErrorMessage, setAddErrorMessage] = React.useState();


const handleGuestChange = (event) => {
  setGuests(event.target.value);
};
const handleCatChange = (event) => {
  setCat(event.target.value);
};
const handleTitleChange = (event) => {
  setTitle(event.target.value);
};
const handleLocationChange = (event) => {
  setLocation(event.target.value);
};
const handleDescriptionChange = (event) => {
  setDescrip(event.target.value)
};


const post = (_id, title, description, location, guests, category, start, end) => {
  if (title == "" || description  == "" || guests == "" || category  == "" || start   == "" || end  == ""){
    setAddMessage();
    setAddErrorMessage("Please fill in all fields");
  }
  else{
    const startUTC = new Date(start).toLocaleString();
    const endUTC = new Date(end).toLocaleString();
    axios.patch('https://togethrgroup1.herokuapp.com/api/editevent', { 
      id: _id,
      EventName: title,
      EventDescription: description,
      EventLocation: location,
      StartDate: startUTC,
      EndDate: endUTC,
      NumGuests: guests,
      Tag: category
    })
    .then((response) => {
      console.log(response);
      setAddErrorMessage();
      setAddMessage('Your event was updated!');
    }, (error) => {
      console.log(error);
      setAddMessage();
      setAddErrorMessage('Something went wrong. Try again.');
    });
  }
};
  
 return (
  
    <SafeAreaView style={{flex: 1}}>
    <NavigationBar/>
    <ScrollView>
     <View style={styles.container}>
    
        <View style={styles.center}>
        <Text h1 style={styles.title}>Edit Activity</Text>
        <Text style={styles.verticalDivider}></Text>
        <Text Text style={styles.inputDivider}></Text>
        
        <MuiThemeProvider theme={theme}>
        <TextField 
          color = 'secondary'
          label="Title" 
          variant="outlined" 
          value={title}
          onChange={handleTitleChange}
          inputProps={{ maxLength: 24 }}
          />

        <Text Text style={styles.inputDivider}></Text>


        <TextField
          color ='secondary'
          label="Description"
          multiline
          rows={4}
          defaultValue="Description"
          variant="outlined"
          value={description}
          onChange={handleDescriptionChange}
          inputProps={{ maxLength: 120 }}
        />

        <Text Text style={styles.inputDivider}></Text>

        <TextField 
          color = 'secondary'
          label="Location" 
          variant="outlined" 
          value={location}
          onChange={handleLocationChange}
          inputProps={{ maxLength:50 }}
          />

        <Text Text style={styles.inputDivider}></Text>

        <FormControl variant="outlined">
        <InputLabel >Number of Guests</InputLabel>
        <Select
          color='secondary'
          value={guests}
          onChange={handleGuestChange}
          label="Number of Guests"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
        </Select>
      </FormControl>

      <Text Text style={styles.inputDivider}></Text>

      <FormControl variant="outlined">
        <InputLabel >Category</InputLabel>
        <Select
          required
          color='secondary'
          value={category}
          onChange={handleCatChange}
          label="Category"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Movie"}>Movie</MenuItem>
          <MenuItem value={"Music"}>Music</MenuItem>
          <MenuItem value={"Sports"}>Sports</MenuItem>
          <MenuItem value={"Outdoors"}>Outdoors</MenuItem>
          <MenuItem value={"Food"}>Food</MenuItem>
          <MenuItem value={"Animals"}>Animals</MenuItem>
          <MenuItem value={"Beauty"}>Beauty</MenuItem>
          <MenuItem value={"Gaming"}>Gaming</MenuItem>
          <MenuItem value={"Sight Seeing"}>Sight Seeing</MenuItem>
          <MenuItem value={"Technology"}>Technology</MenuItem>
          <MenuItem value={"DIY"}>DIY</MenuItem>
          <MenuItem value={"Travel"}>Travel</MenuItem>
          <MenuItem value={"Performing Arts"}>Performing Arts</MenuItem>
          <MenuItem value={"Fine Arts"}>Fine Arts</MenuItem>
          <MenuItem value={"Cars"}>Cars</MenuItem>
          <MenuItem value={"Photography"}>Photography</MenuItem>
          <MenuItem value={"Lifestyle"}>Lifestyle</MenuItem>
          <MenuItem value={"Shopping"}>Shopping</MenuItem>
        </Select>
      </FormControl>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
          
          <Text Text style={styles.inputDivider}></Text>
          <View style={styles.fixToText}>  
          <DateTimePicker
          clearable
          style={{width: 240}}
          color= 'secondary'
          variant="inline"
          inputVariant="outlined"
          label="Start Date and Time"
          value={startTime}
          onChange={startTime => setStartTime(startTime)}
         />
        <Text style={styles.buttonDivider}></Text>
         <DateTimePicker
          clearable
          style={{width: 245}}
          color= 'secondary'
          variant="inline"
          inputVariant="outlined"
          label="End Date and Time"
          value={endTime}
          onChange={endTime => setEndTime(endTime)}
         />
         </View> 
         <HelperText>
            {addMessage}
          </HelperText>
          <HelperText type="error">
            {addErrorMessage}
          </HelperText>
         </MuiPickersUtilsProvider>

         <Text Text style={styles.inputDivider}></Text>

         <TouchableOpacity onPress={() => post(e_id, title, description, location, guests, category, startTime, endTime)} style={styles.postButton}>
          <Text style={styles.postButtonText}>EDIT</Text>
       </TouchableOpacity>

      </MuiThemeProvider>
    </View>
    </View>
    </ScrollView>
    </SafeAreaView>
   
    
  );
}


const styles = StyleSheet.create({
  title: {
    fontSize: 60, 
    fontFamily: 'Comfortaa_400Regular',
    alignSelf: 'center', 
  },
  input:{
    width: 500,
 },
  closeButton:{
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
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonDivider: {
    width:10,
  },
  postButton: {
    backgroundColor: "black",
    borderColor:"black",
    width:500,
    height:50,
    borderWidth:3,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 5,
  },
  postButtonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Roboto_500Medium'
  }, 
});
  
export default EditEvent;