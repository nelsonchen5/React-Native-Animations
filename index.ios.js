import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import clamp from "clamp";

import Cat1 from "./cat1.jpeg";
import Cat2 from "./cat2.jpeg";
import Cat3 from "./cat3.jpeg";
import Cat4 from "./cat4.jpeg";

const SWIPE_THRESHOLD = 120;
const { height } = Dimensions.get("window");

export default class animations extends Component {
  state = {
    items: [
      {
        image: Cat1,
        id: 1,
        text: "Sweet Cat",
      },
      {
        image: Cat2,
        id: 2,
        text: "Sweeter Cat",
      },
      {
        image: Cat3,
        id: 3,
        text: "Sweetest Cat",
      },
      {
        image: Cat4,
        id: 4,
        text: "Aww",
      },
    ],
    animation: new Animated.ValueXY(),
    opacity: new Animated.Value(1),
    next: new Animated.Value(.9)
  };

  componentWillMount() {
    this._x = 0;
    this.state.animation.addListener(({ x }) => {
      this._x = x;
    });

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.state.animation.extractOffset();
      },
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.animation.x,
          dy: this.state.animation.y,
        },
      ]),
      onPanResponderRelease: (e, { vx, vy }) => {
        this.state.animation.flattenOffset();
        var velocity;

        if (vx >= 0) {
          velocity = clamp(vx, 3, 5);
        } else if (vx < 0) {
          velocity = clamp(vx * -1, 3, 5) * -1;
        }

        if (Math.abs(this._x) > SWIPE_THRESHOLD) {
          Animated.decay(this.state.animation, {
            velocity: { x: velocity, y: vy },
            deceleration: 0.98,
          }).start(() => {
            Animated.parallel([
              Animated.timing(this.state.opacity, {
                toValue: 0,
                duration: 300,
              }),
              Animated.timing(this.state.next, {
                toValue: 1,
                duration: 300
              })
            ]).start(() => {
              this.setState(
                state => {
                  return {
                    items: state.items.slice(1),
                  };
                },
                () => {
                  this.state.next.setValue(.9);
                  this.state.opacity.setValue(1);
                  this.state.animation.setValue({ x: 0, y: 0 });
                }
              );
            });
          });
        } else {
          Animated.spring(this.state.animation, {
            toValue: { x: 0, y: 0 },
            friction: 4,
          }).start();
        }
      },
    });
  }
  componentWillUnmount() {
    this.state.animation.removeAllListeners();
  }

  render() {
    const { animation } = this.state;

    const rotate = animation.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: ["-30deg", "0deg", "30deg"],
    });

    const opacity = animation.x.interpolate({
      inputRange: [-200, 0, 200],
      outputRange: [0.5, 1, 0.5],
    });

    const yupOpacity = animation.x.interpolate({ inputRange: [0, 150], outputRange: [0, 1] });
    const yupScale = animation.x.interpolate({
      inputRange: [0, 150],
      outputRange: [0.5, 1],
      extrapolate: "clamp",
    });
    const animatedYupStyles = {
      transform: [{ scale: yupScale }, { rotate: "-30deg" }],
      opacity: yupOpacity,
    };

    const nopeOpacity = animation.x.interpolate({ inputRange: [-150, 0], outputRange: [1, 0] });
    const nopeScale = animation.x.interpolate({
      inputRange: [-150, 0],
      outputRange: [1, 0.5],
      extrapolate: "clamp",
    });
    const animatedNopeStyles = {
      transform: [{ scale: nopeScale }, { rotate: "30deg" }],
      opacity: nopeOpacity,
    };

    const animatedCardStyles = {
      transform: [{ rotate }, ...this.state.animation.getTranslateTransform()],
      opacity: this.state.opacity,
    };

    const animatedImageStyles = {
      opacity,
    };

    return (
      <View style={styles.container}>
        {this.state.items.slice(0, 2).reverse().map(({ image, id, text }, index, items) => {
          const isLastItem = index === items.length - 1;
          const isSecondToLast = index === items.length - 2;

          const panHandlers = isLastItem ? this._panResponder.panHandlers : {};
          const cardStyle = isLastItem ? animatedCardStyles : undefined;
          const imageStyle = isLastItem ? animatedImageStyles : undefined;
          const nextStyle = isSecondToLast ? { transform: [ { scale: this.state.next }]} : undefined;

          return (
            <Animated.View {...panHandlers} style={[styles.card, cardStyle, nextStyle]} key={id}>
              <Animated.Image
                source={image}
                style={[styles.image, imageStyle]}
                resizeMode="cover"
              />
              <View style={styles.lowerText}>
                <Text>
                  {text}
                </Text>
              </View>

              {isLastItem &&
                <Animated.View style={[styles.nope, animatedNopeStyles]}>
                  <Text style={styles.nopeText}>Nope!</Text>
                </Animated.View>}

              {isLastItem &&
                <Animated.View style={[styles.yup, animatedYupStyles]}>
                  <Text style={styles.yupText}>Yup!</Text>
                </Animated.View>}
            </Animated.View>
          );
        })}
      </View>
    );
  }
}

/*
  Add Yes/No buttons
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: 300,
    height: 300,
    position: "absolute",
    borderRadius: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { x: 0, y: 0 },
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: "#FFF",
  },
  lowerText: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 5,
  },
  image: {
    width: null,
    height: null,
    borderRadius: 2,
    flex: 3,
  },
  yup: {
    borderColor: "green",
    borderWidth: 2,
    position: "absolute",
    padding: 20,
    borderRadius: 5,
    top: 20,
    left: 20,
    backgroundColor: "#FFF",
  },
  yupText: {
    fontSize: 16,
    color: "green",
  },
  nope: {
    borderColor: "red",
    borderWidth: 2,
    position: "absolute",
    padding: 20,
    borderRadius: 5,
    right: 20,
    top: 20,
    backgroundColor: "#FFF",
  },
  nopeText: {
    fontSize: 16,
    color: "red",
  },
});

AppRegistry.registerComponent("animations", () => animations);
