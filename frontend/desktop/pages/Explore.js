import * as React from 'react';
import { Text, View, SafeAreaView } from 'react-native';

import NavigationBar from '../components/NavigationBar';

function Explore() {
  return (
    <SafeAreaView style={{flex: 1}}>
    <NavigationBar/>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Explore!</Text>
    </View>
    </SafeAreaView>
  );
}

export default Explore;