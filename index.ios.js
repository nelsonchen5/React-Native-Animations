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
  };
  handlePress = () => {
    Animated.timing(this.state.animation, {
      duration: 500,
      toValue: 1,
    }).start();
  };
  render() {
    const opacityInterpolate = this.state.animation.interpolate({
      inputRange: [.2, .7],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });

    const backgroundColorInterpolate = this.state.animation.interpolate({
      inputRange: [0, .5],
      outputRange: ["rgba(255,255,255,0)", "rgba(255,255,255,.5)"],
      extrapolate: "clamp",
    });

    const spinnerStyle = {
      opacity: opacityInterpolate,
      backgroundColor: backgroundColorInterpolate,
    };

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.handlePress}>
          <View>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Get it!</Text>
            </View>
            <Animated.View
              style={[StyleSheet.absoluteFill, styles.spinner, spinnerStyle]}
            >
              <ActivityIndicator size="small" animating />
            </Animated.View>
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
  },
  spinner: {
    alignItems: "center",
    justifyContent: "center",
  },
});

AppRegistry.registerComponent("animations", () => animations);
