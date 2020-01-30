import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Button, Card } from 'react-native-elements';

import Ball from './src/Ball';
import Deck from './src/Deck';

const Data = [
  {
    id: 1,
    text: 'Card#1',
    uri: 'https://developer.github.com/assets/images/gundamcat.png',
  },
  {
    id: 2,
    text: 'Card#2',
    uri: 'https://developer.github.com/assets/images/gundamcat.png',
  },
  {
    id: 3,
    text: 'Card#3',
    uri: 'https://facebook.github.io/react-native/img/tiny_logo.png',
  },
  {
    id: 4,
    text: 'Card#4',
    uri: 'https://facebook.github.io/react-native/img/tiny_logo.png',
  },
  {
    id: 5,
    text: 'Card#5',
    uri: 'https://facebook.github.io/react-native/img/tiny_logo.png',
  },
  {
    id: 6,
    text: 'Card#6',
    uri: 'https://facebook.github.io/react-native/img/tiny_logo.png',
  },
  {
    id: 7,
    text: 'Card#7',
    uri: 'https://facebook.github.io/react-native/img/tiny_logo.png',
  },
  {
    id: 8,
    text: 'Card#8',
    uri: 'https://facebook.github.io/react-native/img/tiny_logo.png',
  },
];
export default class App extends React.Component {
  renderCard(item) {
    return (
      <Card title={item.text} image={{ uri: item.uri }}>
        <Text style={{ margin: 10 }}>I love you 3000</Text>
        <Button
          title="View Now!"
        />
      </Card>
    );
  }

  renderNoMoreCard() {
    return(
      <Card
        title="All Done!"
      >
        <Text style={{margin: 10}}>
          "There no more content here!"
        </Text>
        <Button
          title="Get more!"
        />
      </Card>
    );
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Deck data={Data} renderCard={this.renderCard}
              renderNoMoreCard={this.renderNoMoreCard} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
});
