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
import { HelperText } from 'react-native-paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker, TimePicker  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';

import NavigationBar from '../components/NavigationBar';


export default function AddEvent() {
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

  
  const navigation = useNavigation();
  function navigateBack() {
    navigation.goBack();
}

const [title, setTitle] = React.useState('');
const [location, setLocation] = React.useState('');
const [description, setDescrip] = React.useState('');
const [guests, setGuests] = React.useState('');
const [category, setCat] = React.useState('');
const [day, setDay] = React.useState(new Date());
const [startTime, setStartTime] = React.useState(new Date());
const [endTime, setEndTime] = React.useState();
const [addMessage, setAddMessage] = React.useState();


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
}

const post = (title, description, guests, category, day, start, end) => {
  if (title == "" || description  == "" || guests == "" || category  == "" || day  == "" || start   == "" || end  == ""){
    setAddMessage("Please fill in all fields");
  }
  else{
    alert('Title: ' + title + ' Description: '+ description + ' Location: ' + location + 'Guests: '+ guests + ' Day: '+ day + ' Start: '+ start + ' End: '+ end);
  }
  
};

 return (
  
    <SafeAreaView style={{flex: 1}}>
    <NavigationBar/>
     <View style={styles.container}>
    
           <View style={styles.closeButton}>
            <TouchableOpacity onPress={() => navigateBack()}>
            <Ionicons  name="close"  size={30} color="back" />
            </TouchableOpacity>
            </View>

        <View style={styles.center}>
        <Text h1 style={styles.title}>Create Activity</Text>
        <Text style={styles.verticalDivider}></Text>
        <Text Text style={styles.inputDivider}></Text>
        
        <MuiThemeProvider theme={theme}>
        <TextField 
          color = 'secondary'
          label="Title" 
          variant="outlined" 
          value={title}
          onChange={handleTitleChange}
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
        />

        <Text Text style={styles.inputDivider}></Text>

        <TextField 
          color = 'secondary'
          label="Location" 
          variant="outlined" 
          value={location}
          onChange={handleLocationChange}
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

      <Text Text style={styles.inputDivider}></Text>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
            autoOk
            color='secondary'
            variant="inline"
            inputVariant="outlined"
            label="Date"
            format="MM/dd/yyyy"
            value={day}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            onChange={day => setDay(day)}
          />
          
          <Text Text style={styles.inputDivider}></Text>

          <View style={styles.fixToText}>  
          <TimePicker
          clearable
          style={{width: 240}}
          color= 'secondary'
          variant="inline"
          inputVariant="outlined"
          label="Start Time"
          value={startTime}
          onChange={startTime => setStartTime(startTime)}
         />
        <Text style={styles.buttonDivider}></Text>
         <TimePicker
          clearable
          style={{width: 245}}
          color= 'secondary'
          variant="inline"
          inputVariant="outlined"
          label="End Time"
          value={endTime}
          onChange={endTime => setEndTime(endTime)}
         />
         </View> 
         <HelperText type="error">
            {addMessage}
          </HelperText>
         </MuiPickersUtilsProvider>

         <Text Text style={styles.inputDivider}></Text>

         <TouchableOpacity onPress={() => post(title, description, guests, category, day, startTime, endTime)} style={styles.postButton}>
          <Text style={styles.postButtonText}>POST</Text>
       </TouchableOpacity>

      </MuiThemeProvider>
    </View>
    </View>
    
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
  