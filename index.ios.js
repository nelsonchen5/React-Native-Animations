import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, Animated, TouchableWithoutFeedback } from "react-native";

export default class animations extends Component {
  state = {
    animation: new Animated.Value(0),
    opacity: new Animated.Value(1)
  };
  startAnimation = () => {
    Animated.parallel([
      Animated.timing(this.state.animation, {
        toValue: 300,
        duration: 1500
      }),
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: 1500
      })
    ]
    // , { stopTogether: false }
  ).start(({ finished }) => {
      // if (!finished) {
      //   // RESET
      //   setTimeout(() => {

      //     Animated.spring(this.state.animation, {
      //       toValue: 0,
      //     }).start();
      //     Animated.spring(this.state.opacity, {
      //       toValue: 1, 
      //     }).start();
          
      //   }, 0)
      // }
    });

    setTimeout(() => {
      this.state.opacity.setValue(1);
    }, 500)
  }
  
  render() {
    const animatedStyles = {
      opacity: this.state.opacity,
      transform: [
        { translateY: this.state.animation }
      ]
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
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: "tomato",
  }
});

AppRegistry.registerComponent("animations", () => animations);
