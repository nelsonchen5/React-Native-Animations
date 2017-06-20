import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, Animated } from "react-native";

export default class animations extends Component {
  render() {
    return (
      <View style={styles.container}>
      
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent("animations", () => animations);
