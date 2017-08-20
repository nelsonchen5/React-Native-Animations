import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "tomato",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
})

class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate("Profile")}>
          <Text>Home</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Home;