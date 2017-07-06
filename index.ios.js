import React, { Component } from "react";
import { AppRegistry, Button, StyleSheet, Text, View, Animated, TouchableWithoutFeedback } from "react-native";


const AnimatedButton = Animated.createAnimatedComponent(Button);

export default class animations extends Component {
  state = {
    animation: new Animated.Value(0),
  };
  startAnimation = () => {
    Animated.timing(this.state.animation, {
      toValue: 1,
      duration: 1500
    }).start(() => {
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 300
      }).start();
    });
  }
  
  render() {
    const animatedColor = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgb(255,99,71)", "rgb(99,71,255)"]
    });

    return (
      <View style={styles.container}>
        <AnimatedButton
          title="Press Me"
          onPress={this.startAnimation}
          color={animatedColor}
        />
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
});

AppRegistry.registerComponent("animations", () => animations);
