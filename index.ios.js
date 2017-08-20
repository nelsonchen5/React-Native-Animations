import React, { Component } from "react";
import { AppRegistry, StyleSheet, Button, View, Easing, Animated } from "react-native";

import {
  StackRouter,
  createNavigationContainer,
  createNavigator,
  Transitioner,
  addNavigationHelpers,
} from "react-navigation";

import Home from "./home";
import Profile from "./profile";

class CustomNavigationView extends Component {
  _configureTransition = (transitionProps, prevTransitionProps) => {
    const scene = transitionProps.scene;
    const route = scene && scene.route;
    const params = route && route.params;
    const duration = params && params.duration || 1000;

    return {
      duration,
      easing: Easing.back(5),
    };
  };
  _render = (transitionProps, prevTransitionProps) => {
    const scenes = transitionProps.scenes.map(scene => this._renderScene(transitionProps, scene));

    return (
      <View style={styles.container}>
        {scenes}
      </View>
    );
  };

  _renderScene = (transitionProps, scene) => {
    const { navigation, router } = this.props;
    const { routes } = navigation.state;
    const { position } = transitionProps;
    const { index } = scene;

    const animatedValue = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [0, 1, 0],
    });

    const rotateValue = position.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: ["-360deg", "0deg", "360deg"],
    });

    const animation = {
      opacity: animatedValue,
      transform: [{ scale: animatedValue }, { rotate: rotateValue }],
    };

    // The prop `router` is populated when we call `createNavigator`.
    const Scene = router.getComponentForRouteName(scene.route.routeName);
    return (
      <Animated.View key={index} style={[styles.view, animation]}>
        <Scene
          navigation={addNavigationHelpers({
            ...navigation,
            state: routes[index],
          })}
        />
      </Animated.View>
    );
  };

  render() {
    const { navigation, router } = this.props;

    return (
      <Transitioner
        configureTransition={this._configureTransition}
        navigation={navigation}
        render={this._render}
      />
    );
  }
}

const router = StackRouter({
  Home: {
    screen: Home,
  },
  Profile: {
    screen: Profile,
  },
});

const CustomRouter = StackRouter({
  Home: { screen: Home },
  Profile: { screen: Profile },
});

const CustomTransitioner = createNavigationContainer(
  createNavigator(CustomRouter)(CustomNavigationView),
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    ...StyleSheet.absoluteFillObject,
  },
});

AppRegistry.registerComponent("animations", () => CustomTransitioner);
