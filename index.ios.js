import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, Animated, TouchableWithoutFeedback, Dimensions } from "react-native";

export default class animations extends Component {
  state = {
    animation: new Animated.ValueXY(),
  };
  startAnimation = () => {
    const { width, height } = Dimensions.get("window");

    Animated.sequence([
      Animated.spring(this.state.animation.y, {
        toValue: height - 150
      }),
      Animated.spring(this.state.animation.x, {
        toValue: width - 150,
      }),
      Animated.spring(this.state.animation.y, {
        toValue: 0
      }),
      Animated.spring(this.state.animation.x, {
        toValue: 0
      })
    ]).start();
  }
  
  render() {
    const animatedStyles = {
      transform: this.state.animation.getTranslateTransform()
    }
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
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: "tomato",
    position: "absolute",
    top: 0,
    left: 0,
  }
});

AppRegistry.registerComponent("animations", () => animations);
