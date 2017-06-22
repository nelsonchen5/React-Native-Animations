import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

import WonderWoman from "./wonder_woman.jpg";

export default class animations extends Component {
  state = {
    selected: false,
    backdrop: false,
    transition: new Animated.Value(0),
    opacity: new Animated.Value(0),
    position: new Animated.ValueXY(),
  };
  handleHide = () => {
    Animated.parallel([
      Animated.timing(this.state.transition, {
        toValue: 0,
        duration: 500,
      }),
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: 500,
      }),
    ]).start(() => {
      this.setState({
        selected: false,
        backdrop: false,
      });
    });
  };

  handleShow = () => {
    this.setState(
      {
        backdrop: true,
      },
      () => {
        this._view.getNode().measure((x, y, width, height, pageX, pageY) => {
          this.state.position.x.setValue(x);
          this.state.position.y.setValue(y);
          Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 500,
          }).start();

          this.setState(
            {
              x,
              y,
              selected: true,
            },
            () => {
              Animated.timing(this.state.transition, {
                toValue: 1,
                duration: 500,
              }).start();
            }
          );
        });
      }
    );
  };
  render() {
    const { selected, backdrop } = this.state;

    const backdropStyle = {
      opacity: this.state.opacity,
    };

    const closeOpacity = {
      opacity: this.state.transition,
    };

    const heightInterpolate = this.state.transition.interpolate({
      inputRange: [0, 1],
      outputRange: [150, 300],
    });

    const translateInterpolate = this.state.transition.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -150],
    });

    const infoTranslate = this.state.transition.interpolate({
      inputRange: [0, 1],
      outputRange: [-150, 0],
    });

    const infoStyles = {
      opacity: this.state.transition,
      transform: [
        {
          translateY: infoTranslate,
        },
      ],
    };

    const paddingInterpolate = this.state.transition.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 15],
    });

    const wrapStyle = {
      padding: paddingInterpolate,
    };

    const viewStyle = {
      position: "absolute",
      top: this.state.position.y,
      left: this.state.position.x,
      right: 0,
      height: heightInterpolate,
      shadowColor: "#FFF",
      shadowOpacity: 0.5,
      shadowRadius: 5,
      shadowOffset: { x: 0, y: 0 },
      transform: [
        {
          translateY: translateInterpolate,
        },
      ],
    };

    const itemStyle = !selected ? styles.item : viewStyle;
    const touchCall = selected ? undefined : this.handleShow;

    return (
      <View style={styles.container}>
        {backdrop &&
          <Animated.View
            style={[StyleSheet.absoluteFill, styles.backdrop, backdropStyle]}
          />}
        <TouchableWithoutFeedback onPress={touchCall}>
          <Animated.View style={wrapStyle}>
            <Animated.View style={itemStyle} ref={view => this._view = view}>
              <TouchableOpacity
                onPress={this.handleHide}
                style={styles.closePosition}
              >
                <Animated.Text style={[styles.closeText, closeOpacity]}>
                  X
                </Animated.Text>
              </TouchableOpacity>
              <Animated.Image
                source={WonderWoman}
                resizeMode="cover"
                style={styles.image}
              >
                <Animated.Text style={styles.title}>
                  WONDER WOMAN (2017)
                </Animated.Text>
              </Animated.Image>

              <Animated.View style={[styles.infoContainer, infoStyles]}>
                <Text style={styles.infoTitle}>Wonder Woman</Text>
                <Text style={styles.rating}>Rotten Tomatoes: 92%</Text>
                <Text style={styles.description}>
                  In present-day Paris, Diana Prince receives a World War I-era
                  photographic plate couriered by Wayne Enterprises and recalls
                  her past.

                  Diana was born and raised on the hidden island of Themyscira,
                  home to the Amazon race of warrior women created by the gods
                  of Mount Olympus to protect humankind. In the distant past,
                  Ares, the god of war, slew all his fellow gods, but his
                  father, Zeus, struck him down. Before succumbing to his
                  injuries, Zeus left the Amazons a weapon capable of killing
                  his renegade son: the "Godkiller", which Diana believes to be
                  a ceremonial sword. Queen Hippolyta, Diana's mother, believes
                  that Ares will never return and forbids Diana from training as
                  a warrior, but Diana and her aunt General Antiope defy the
                  queen and begin training in secret. When the two are
                  discovered by Hippolyta, Antiope convinces her sister to allow
                  Diana's training to continue.
                </Text>
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 250,
  },
  backdrop: {
    backgroundColor: "rgba(0,0,0,.5)",
  },
  item: {
    height: 150,
    width: "100%",
  },
  closePosition: {
    zIndex: 3,
    position: "absolute",
    top: 10,
    right: 10,
  },
  closeText: {
    fontSize: 20,
    color: "#FFF",
    backgroundColor: "transparent",
  },
  title: {
    color: "#FFF",
    backgroundColor: "rgba(0,0,0,.25)",
    fontSize: 40,
    padding: 15,
  },
  image: {
    zIndex: 2,
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    backgroundColor: "#FFF",
    padding: 10,
  },
  infoTitle: {
    fontSize: 24,
  },
  rating: {
    fontSize: 16,
  },
  description: {
    marginTop: 10,
    fontSize: 12,
  },
});

AppRegistry.registerComponent("animations", () => animations);
