import React from "react";
import { ActivityIndicator } from "react-native-paper";

const Loading = () => {
  return (
    <View style={{ flex:1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator animating={true} color={Colors.red800} />
    </View>
  );
};

export default Loading;
