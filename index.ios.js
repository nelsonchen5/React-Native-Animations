import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, Animated, ScrollView } from "react-native";

export default class animations extends Component {
  state = {
    animation: new Animated.Value(0),
  }
  render() {

    const backgroundInterpolate = this.state.animation.interpolate({
      inputRange: [0, 3000],
      outputRange: ["rgb(255,99,71)", "rgb(99,71,255)"]
    });

    const backgroundStyle = {
      backgroundColor: backgroundInterpolate
    }
    return (
      <View style={styles.container}>
        <ScrollView
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: this.state.animation
                },
              }
            }
          ])}
        >
          <Animated.View style={[styles.content, backgroundStyle]} />
        </ScrollView>
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    height: 3000,
  }
});

AppRegistry.registerComponent("animations", () => animations);
