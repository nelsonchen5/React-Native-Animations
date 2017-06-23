import React, { Component } from "react";

import "art/modes/svg.js";

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";

import Svg, { Path } from "react-native-svg";

import SVGPath from "art/modes/svg/path";
import CorePath from "art/core/path";
import { Tween } from "art/morph/path";

const startPath = `M32,16.009c0-0.267-0.11-0.522-0.293-0.714  l-9.899-9.999c-0.391-0.395-1.024-0.394-1.414,0c-0.391,0.394-0.391,1.034,0,1.428l8.193,8.275H1c-0.552,0-1,0.452-1,1.01  s0.448,1.01,1,1.01h27.586l-8.192,8.275c-0.391,0.394-0.39,1.034,0,1.428c0.391,0.394,1.024,0.394,1.414,0l9.899-9.999  C31.894,16.534,31.997,16.274,32,16.009z`;
const endPath = `M27.704,8.397c-0.394-0.391-1.034-0.391-1.428,0  L11.988,22.59l-6.282-6.193c-0.394-0.391-1.034-0.391-1.428,0c-0.394,0.391-0.394,1.024,0,1.414l6.999,6.899  c0.39,0.386,1.039,0.386,1.429,0L27.704,9.811C28.099,9.421,28.099,8.787,27.704,8.397C27.31,8.006,28.099,8.787,27.704,8.397z`;

export default class animations extends Component {
  state = {
    animation: new Animated.Value(0),
  };

  handlePress = () => {
    const pathInterpolate = Tween(startPath, endPath);
    const p = new SVGPath();

    this.state.animation.addListener(({ value }) => {
      pathInterpolate.tween(value);
      pathInterpolate.applyToPath(p);

      this._path.setNativeProps({
        d: p.toSVG()
      })
    });

    Animated.sequence([
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 500,
      }),
      Animated.delay(1500),
      Animated.timing(this.state.animation, {
        toValue: 0,
        duration: 500,
      }),
    ]).start();
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.handlePress}>
          <Svg width={150} height={150}>
            <Path
              d={startPath}
              stroke="black"
              ref={path => (this._path = path)}
            />
          </Svg>
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
});

AppRegistry.registerComponent("animations", () => animations);
