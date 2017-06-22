import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Animated } from "react-native";

import Background from "./background.jpg";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const createAnimationStyle = (animation) => {
  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-5, 0]
  });

  return {
    opacity: animation,
    transform: [
      { 
        translateY
      }
    ]
  }

}

export default class animations extends Component {
  state = {
    email: new Animated.Value(0),
    password: new Animated.Value(0),
  };

  componentDidMount() {
    Animated.stagger(200, [
      Animated.timing(this.state.email, {
        toValue: 1,
        duration: 200
      }),
      Animated.timing(this.state.password, {
        toValue: 1,
        duration: 200
      })
    ]).start(() => {
      this._email.getNode().focus();
    });
  }
  
  render() {

    const emailStyle = createAnimationStyle(this.state.email);
    const passwordStyle = createAnimationStyle(this.state.password);

    return (
      <View style={styles.container}>
        <Image source={Background} resizeMode="cover" style={StyleSheet.absoluteFill} />
        <View style={styles.container} />
        <View style={styles.form}>
          <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <AnimatedTextInput
              ref={(email) => this._email = email}
              style={[styles.input, emailStyle]}
              placeholder="Email"
              keyboardType="email-address"
            />
            <AnimatedTextInput
              placeholder="Password"
              style={[styles.input, passwordStyle]}
              secureTextEntry
            />
            <TouchableOpacity>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container} />
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    color: "#FFF",
    backgroundColor: "transparent",
    textAlign: "center",
    marginBottom: 10,
  },
  form: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,.25)",
    paddingVertical: 10,
  },
  input: {
    width: 250,
    height: 35,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#FFF",
    color: "#333",
    backgroundColor: "#FFF"
  },
  button: {
    marginTop: 10,
    backgroundColor: "tomato",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontSize: 16,
  }
});

AppRegistry.registerComponent("animations", () => animations);
