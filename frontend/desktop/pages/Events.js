import * as React from 'react';
import { Text, View, SafeAreaView, ScrollView} from 'react-native';
import Card from "../components/Card";
import { Grid } from "@material-ui/core";
import NavigationBar from '../components/NavigationBar';
import { makeStyles } from "@material-ui/core/styles";
import Accordion from '@material-ui/core/Accordion';

import Data from '../assets/data.js'


function Events() {
  return (
    <SafeAreaView style={{flex: 1}}>
    <NavigationBar/>
    <ScrollView>
    {Data.map((item, index) => (
    <Accordion
      key={index}
    >
      
        <Card 
         title={item.title}
         description={item.description}
         startDate={item.startDate}
         endDate={item.endDate}
         attendees={item.attendees}/>
      
    </Accordion> 
    ))}
    </ScrollView>
    </SafeAreaView>
  );
}

export default Events;