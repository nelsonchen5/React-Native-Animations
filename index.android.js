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
    position: new Animated.Value(0),
  };
  startAnimation = () => {
    Animated.parallel([
      Animated.timing(this.state.animation, {
        toValue: 100,
        duration: 1500,
      }),
      Animated.timing(this.state.position, {
        toValue: 24,
        duration: 1500,
      }),
    ]).start();
  };

  render() {
    const randomValue = 3;
    const newAnimation = Animated.multiply(
      this.state.position,
      Animated.modulo(this.state.animation, randomValue)
    );

    const animatedStyles = {
      transform: [{ translateY: newAnimation }],
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
