import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, Image, Animated, PanResponder, Easing } from "react-native";

import Vjeux from "./vjeux.jpg";

export default class animations extends Component {
  state = {
    heads: [
      {
        image: Vjeux,
        animation: new Animated.ValueXY()
      },
      {
        image: Vjeux,
        animation: new Animated.ValueXY()
      },
      {
        image: Vjeux,
        animation: new Animated.ValueXY()
      },
      {
        image: Vjeux,
        animation: new Animated.ValueXY()
      }
    ]
  }
  
  componentWillMount() {

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.state.heads.map(({ animation }) => {
          animation.extractOffset()
          animation.setValue({ x: 0, y: 0});
        });
      },
      onPanResponderMove: (e, { dx, dy }) => {
        
        this.state.heads[0].animation.setValue({
          x: dx,
          y: dy
        });
        

        const animations = this.state.heads.slice(1).map(({ animation }, index) => {
          return (
            Animated.sequence([
              Animated.delay(index * 6),
              Animated.spring(animation, {
                toValue: { x: dx, y: dy },
              })
            ]).start()
          )
        })
      }
    });
  }
  
  render() {
    return (
      <View style={styles.container}>
        {
          this.state.heads.reverse().map((item, index) => {
            const pan = index === 3 ? this._panResponder.panHandlers : {};

            return (
              <Animated.Image
                {...pan}
                key={index}
                source={item.image}
                style={[styles.head, { zIndex: index, transform: item.animation.getTranslateTransform() }]}
              />
            )
          })
        }
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
  head: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: "absolute",
  }
});

AppRegistry.registerComponent("animations", () => animations);
