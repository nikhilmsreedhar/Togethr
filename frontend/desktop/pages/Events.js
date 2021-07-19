import * as React from 'react';
import { Text, View, SafeAreaView} from 'react-native';

import NavigationBar from '../components/NavigationBar';

function Events() {
  return (
    <SafeAreaView style={{flex: 1}}>
    <NavigationBar/>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Events!</Text>
    </View>
    </SafeAreaView>
  );
}

export default Events;