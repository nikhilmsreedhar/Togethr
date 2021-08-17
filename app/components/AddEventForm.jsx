import React from "react";
import { View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { DatePickerModal } from "react-native-paper-dates";

const AddEventForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [numGuests, setNumGuests] = useState(0);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState();
  
  return (
    <View style={styles.container}>
      <View style={styles.closeButton}>
        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="close" size={30} color="back" />
        </TouchableOpacity>
      </View>

      <Text style={styles.verticalDivider}></Text>
      <Text h1 style={styles.title}>
        Create Activity
      </Text>
      <Text style={styles.verticalDivider}></Text>

      <TextInput
        style={{ alignSelf: "stretch" }}
        label="Title"
        value={title}
        mode="outlined"
        onChangeText={(title) => setTitle(title)}
      />

      <TextInput
        style={{ alignSelf: "stretch" }}
        label="Description"
        value={description}
        mode="outlined"
        onChangeText={(descrip) => setDescription(descrip)}
      />

      <TextInput
        style={{ alignSelf: "stretch" }}
        label="Location"
        value={location}
        mode="outlined"
        onChangeText={(location) => setLocation(location)}
      />

      <TextInput
        style={{ alignSelf: "stretch" }}
        label="Number of Guests"
        value={numGuests}
        mode="outlined"
        onChangeText={(numGuests) => setNumGuests(numGuests)}
      />

      <RNPickerSelect
        style={pickerSelectStyles}
        value={category}
        onValueChange={(value) => {
          setCategory(value);
        }}
        items={interestOptions}
      />

      <TextInput
        style={{ alignSelf: "stretch" }}
        label="Date"
        value={date}
        mode="outlined"
        onChangeText={(date) => setDate(date)}
      />

      <View style={{ flexDirection: "row", alignSelf: "stretch" }}>
        <TextInput style={{ flex: 1 }} mode="outlined" />
        <TextInput style={{ flex: 1 }} mode="outlined" />
      </View>

      <Button
        onPress={() =>
          postEvent(
            title,
            description,
            location,
            numGuests,
            category,
            date,
            startTime,
            endTime
          )
        }
        style={styles.postButton}
      >
        POST
      </Button>
    </View>
  );
};
