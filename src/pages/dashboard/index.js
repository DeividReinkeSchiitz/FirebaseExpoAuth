import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Color from "../../components/Colors";

class Dashboard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text> componentText </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.pretoFraco,
    justifyContent: "center",
    alignItems: "center",
    alignItems: "stretch"
  }
});

export default Dashboard;
