import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput, HelperText } from 'react-native-paper';


const AddEvent = () => {
  
  const navigation = useNavigation();
  function navigateBack() {
    navigation.goBack();
  }

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [guests, setGuests] = useState('');
  const [category, setCategory] = useState('');
  const [day, setDay] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState();
  const [addMessage, setAddMessage] = useState();

  const handleGuestChange = (event) => {
    setGuests(event.target.value);
  };
  const handleCatChange = (event) => {
    setCategory(event.target.value);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  }

  const post = (title, description, location, guests, category, day, start, end) => {
    if (title == "" || description  == "" || guests == "" || category  == "" || day  == "" || start   == "" || end  == ""){
      setAddMessage();
      setAddErrorMessage("Please fill in all fields");
    } else {
      axios.post('https://togethrgroup1.herokuapp.com/api/addevent', { 
        EventName: title,
        EventDescription: description,
        EventLocation: location,
        EventDate: day,
        EventStartTime: start,
        EventEndTime: end,
        Maker: userid,
        LikedUsers: 0,
        Attendees: guests,
        Pictures: null, // for now is null
        Tag: category
      })
      .then((response) => {
        console.log(response);
        setAddErrorMessage();
        setAddMessage('Your event was posted!');
      }, (error) => {
        console.log(error);
        setAddMessage();
        setAddErrorMessage('Something went wrong. Try again.');
      });
    }
    
  };

  return (
    <View style={styles.container}>
      <Button
        icon="arrow-left"
        onPress={() => navigateBack()}
      />

      <Text h1 style={styles.title}>Create Activity</Text>
      
      <TextInput style={{ alignSelf: 'stretch'}}
        label="Title"
        value={title}
        mode='outlined'
        onChangeText={title => setTitle(title)}
      />

      <TextInput style={{ alignSelf: 'stretch'}}
        label="Description"
        value={description}
        mode='outlined'
        onChangeText={description => setDescription(description)}
      />

    </View>
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

export default AddEvent;