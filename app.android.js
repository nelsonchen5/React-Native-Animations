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
    Animated.parallel([
      Animated.timing(this.state.animation, {
        toValue: 12,
        duration: 3500,
      }),
    ]).start();
  };

  render() {
    const randomValue = 3;
    const newAnimation = Animated.modulo(this.state.animation, randomValue);

    const interpolated = newAnimation.interpolate({
      inputRange: [0, 3],
      outputRange: ["0deg", "270deg"]
    })

    const animatedStyles = {
      transform: [{ rotate: interpolated }],
    };
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.startAnimation}>
          <Animated.View style={[styles.box, animatedStyles]} />
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
  box: {
    width: 150,
    height: 150,
    backgroundColor: "tomato",
  },
});

AppRegistry.registerComponent("animations", () => animations);
