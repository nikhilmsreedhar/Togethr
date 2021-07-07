import * as React from 'react';
import { Text, View , SafeAreaView} from 'react-native';

import NavigationBar from '../components/NavigationBar';

function Profile() {
  return (
    <SafeAreaView style={{flex: 1}}>
    <NavigationBar/>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile!</Text>
    </View>
    </SafeAreaView>
  );
}

export default Profile;