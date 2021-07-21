import * as React from 'react';
import { Text, View, SafeAreaView} from 'react-native';
import Card from "../components/Card";
import { Grid } from "@material-ui/core";
import NavigationBar from '../components/NavigationBar';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  gridContainer: {
    padding: '40px'
  }
});

function Events() {
const classes = useStyles();
  return (
    <SafeAreaView style={{flex: 1}}>
    <NavigationBar/>
    <Grid
      container
      className={classes.gridContainer}
      spacing={4}
      justify="center"
    >
      <Grid item xs={12} sm={6} md={4}>
        <Card />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Card />
      </Grid>
    </Grid>
    </SafeAreaView>
  );
}

export default Events;