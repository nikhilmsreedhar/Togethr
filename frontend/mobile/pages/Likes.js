import React, { useState } from 'react';
import { Button, View } from 'react-native';
import { Chip } from 'react-native-paper';

const interestList = [
  {value: "Animals", isSelected: false},
  {value: "Beauty", isSelected: false},
  {value: "Cars", isSelected: false},
  {value: "Fine Arts", isSelected: false},
  {value: "Food", isSelected: false},
  {value: "DIY", isSelected: false},
  {value: "Gaming", isSelected: false},
  {value: "Lifestyle", isSelected: false},
  {value: "Movies", isSelected: false},
  {value: "Music", isSelected: false},
  {value: "Outdoors", isSelected: false},
  {value: "Performing Arts", isSelected: false},
  {value: "Photography", isSelected: false},
  {value: "Shopping", isSelected: false},
  {value: "Sight Seeing", isSelected: false},
  {value: "Sports", isSelected: false},
  {value: "Technology", isSelected: false},
  {value: "Travel", isSelected: false}
]

const Tags = () => {
  //for setting selection state of chips
  const [selected, setSelection] = useState([]);
  const [tags, setTags] = useState([]);

  const handlePress = () => {
    console.log("Test")
  };

  const getTagList = async () => {

  }

  return (
    <View style = {{flex:1}}>
      <View style = {{padding: 50}}>
      {interestList.map((item, index) => {
        return (
            <Chip
              key={index}
              //mode={selected}
              selected={item.isSelected}
              style={{width:''}}
              onPress={() => {
                // const updatedList = tags.map(val =>
                //   (val.value === item.value)
                //     ? {...val, isSelected: !val.isSelected}
                //     : val);
                setSelection(updatedList);
               }}
            >
              {item.value}
            </Chip>
        );
      })}
      </View>

      <Button>SUBMIT</Button>
    </View>
  );
}

export default Tags;