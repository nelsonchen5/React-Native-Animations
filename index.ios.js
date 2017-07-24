import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";

export default class animations extends Component {
  state = {
    animation: new Animated.Value(0),
    opacity: new Animated.Value(1),
  };
  handlePress = () => {
    this.state.animation.setValue(0);
    this.state.opacity.setValue(1);

    Animated.timing(this.state.animation, {
      duration: 1500,
      toValue: 1,
    }).start(({ finished }) => {
      if (finished) {
        Animated.timing(this.state.opacity, {
          toValue: 0,
          duration: 200,
        }).start();
      }
    });
  };
  render() {
    const progressInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "100%"],
      extrapolate: "clamp",
    });

    const colorInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgb(71,255,99)", "rgb(99,71,255)"],
    });

    const progressStyle = {
      width: progressInterpolate,
      opacity: this.state.opacity,
      backgroundColor: colorInterpolate,
    };

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.handlePress}>
          <View style={styles.button}>
            <View style={StyleSheet.absoluteFill}>
              <Animated.View style={[styles.progress, progressStyle, styles.opacityBackground]} />
            </View>
            <Text style={styles.buttonText}>Get it!</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#e6537d",
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 60,
    paddingVertical: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 24,
    backgroundColor: "transparent",
  },
  progress: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
  },
  opacityBackground: {
    // backgroundColor: "rgba(255,255,255,.5)",
  },
});

AppRegistry.registerComponent("animations", () => animations);
