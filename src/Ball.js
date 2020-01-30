import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';

class Ball extends Component {

  componentWillMount() {
    this.position = new Animated.ValueXY(0, 0);
    Animated.spring(this.position, {
      toValue: {x: 200, y: 500}
    }).start();
      }
    render() {
        return (
          <Animated.View style={this.position.getLayout()}>
            <View style={styles.ball}>
            </View>
          </Animated.View>
        );
    }  
}


const styles = StyleSheet.create({
    ball : {
        height:50,
        width: 50,
        borderRadius: 30,
        borderWidth: 30,
        borderColor: 'black',
    }
});
export default Ball;