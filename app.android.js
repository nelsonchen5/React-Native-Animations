import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";

export default class animations extends Component {
  state = {
    animation: new Animated.Value(0),
  };
  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 2,
      duration: 1500,
    }).start(() => {
      this.state.animation.setValue(0);
    });
  };

  render() {
    return (
      <Animated.View style={[styles.container]}>
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          <Animated.View style={[styles.box]} />
        </TouchableWithoutFeedback>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: 150,
    height: 150,
  },
});

AppRegistry.registerComponent("animations", () => animations);
