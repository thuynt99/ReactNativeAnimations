import React, {Component} from 'react';
import { View, StyleSheet, Animated, PanResponder, Dimensions, Button} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THREHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_DURATION = 250;

class Deck extends Component {
  
  static defaultProps = {
    onSwipeRight: () => {},
    onSwipeLeft: () => {}
  }
  constructor(props) {
    super(props);
    const position = new Animated.ValueXY();
    const _panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gesture) => {
        console.log(gesture);
        position.setValue({x: gesture.dx, y: gesture.dy});
      },
      onPanResponderRelease: (evt, gesture) => {
        if( gesture.dx > SWIPE_THREHOLD) {
          this.forceSwipeDirection('right');
        } else if (gesture.dx < - SWIPE_THREHOLD) {
          this.forceSwipeDirection('left');
        } else {
          this.resetPosition();
        }    
      }
    });
    this.state = {_panResponder, position, index: 0};
  }

  renderCard(){
    if(this.state.index >= this.props.data.length) {
      return this.props.renderNoMoreCard();
    }
    return this.props.data.map((item, i) => {
      if(i < this.state.index) {
        return null;
      }
      if(i === this.state.index){

        return (
          <Animated.View 
            key={item.id}
            style={[this.getCardStyle()]}
            {...this.state._panResponder.panHandlers}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        );
      } 
      return(
          <Animated.View
            key={item.id}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        );       
    });
  }

  forceSwipeDirection(direction) {
    const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.state.position, {
      toValue: {x, y: 0},
      duration: SWIPE_DURATION
    }).start( () => this.onCompeleteSwipe(direction));
  }
  onCompeleteSwipe(direction) {
    const { onSwipeRight, onSwipeLeft, data } = this.props;
    const item = data[this.state.index];

    direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);
    this.state.position.setValue({ x: 0, y: 0});
    this.setState({ index: this.state.index + 1});
  }
  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: {x: 0, y: 0}
    }).start();
  }
  getCardStyle(){

    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    })
    return {
        ...position.getLayout(),
        transform: [{rotate}],
      };
  }
  
    render() {
        return (
            <View style={styles.cardStyleNormal}>
            {this.renderCard()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH
  },
  cardStyleNormal: {
    position: "relative",
    width: SCREEN_WIDTH,
  },
  dNone: {
    display: "none"
  }
});
export default Deck;