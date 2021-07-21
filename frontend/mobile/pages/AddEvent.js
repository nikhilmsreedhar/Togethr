import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Menu, Provider, TextInput } from 'react-native-paper';

const AddEvent = () => {
  
  const navigation = useNavigation();
  function navigateBack() {
    navigation.goBack();
  }

  const [visible, setVisible] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [location, setLocation] = useState('');
  const [numGuests, setNumGuests] = useState('');
  const [category, setCategory] = useState('');
  const [day, setDay] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState();
  const [addMessage, setAddMessage] = useState();
  const [addErrorMessage, setAddErrorMessage] = React.useState();

  const handleGuestChange = (event) => {
    setNumGuests(event.target.value);
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

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const postEvent = (title, description, location, guests, category, day, start, end) => {
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
    <Provider>
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
          value={description}
          mode='outlined'
          onChangeText={descrip => setDescription(descrip)}
        />

        <TextInput style={{ alignSelf: 'stretch'}}
          label="Location"
          value={location}
          mode='outlined'
          onChangeText={handleLocationChange}
        />

        <TextInput style={{ alignSelf: 'stretch'}}
          label="Number of Guests"
          value={numGuests}
          mode='outlined'
          onChangeText={handleGuestChange}
        />

        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu}>Category</Button>}
        >
          <Menu.Item title={"Movie"} />
          <Menu.Item title={"Music"} />
          <Menu.Item title={"Sports"} />
          <Menu.Item title={"Outdoors"} />
          <Menu.Item title={"Food"} />
          <Menu.Item title={"Animals"} />
          <Menu.Item title={"Beauty"} />
          <Menu.Item title={"Gaming"} />
          <Menu.Item title={"Sight Seeing"} />
          <Menu.Item title={"Technology"} />
          <Menu.Item title={"DIY"} />
          <Menu.Item title={"Travel"} />
          <Menu.Item title={"Performing Arts"} />
          <Menu.Item title={"Fine Arts"} />
          <Menu.Item title={"Cars"} />
          <Menu.Item title={"Photography"} />
          <Menu.Item title={"Lifestyle"} />
          <Menu.Item title={"Shopping"} />
        </Menu>

        <Button
          onPress={() => postEvent(
            title, 
            description, 
            location, 
            numGuests,
            category,
            day,
            startTime, 
            endTime
          )}
          style={styles.postButton}
        >
          POST
        </Button>
      </View>
    
    </SafeAreaView>
    </Provider>
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

export default AddEvent;