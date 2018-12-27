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
    const colorInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1, 2],
      outputRange: ["rgb(71,255,99)", "rgb(255,99,71)", "rgb(99,71,255)"],
    });

    const bgStyle = {
      backgroundColor: this.state.animation.interpolate({
        inputRange: [0, 2],
        outputRange: ["rgba(255,99,71, 1)", "rgba(255,99,71, 0)"]
      })
    }

    const animatedStyles = {
      backgroundColor: colorInterpolate
    }
    return (
      <Animated.View style={[styles.container, bgStyle]}>
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          <Animated.View style={[styles.box, animatedStyles]} />
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
