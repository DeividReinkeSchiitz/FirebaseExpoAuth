import React, { Component } from "react";
import { View, Text, ActivityIndicator } from "react-native";

class Loading extends Component {
  render() {
    return (
      <View
        style={{
          container: {
            flex: 1,
            backgroundColor: Color.pretoFraco,
            justifyContent: "center",
            alignItems: "center",
            alignItems: "stretch"
          }
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

export default Loading;
