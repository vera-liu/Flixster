/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  ActivityIndicator,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  RefreshControl,
  Navigator,
  Row,
} from 'react-native';

export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePath: `https://image.tmdb.org/t/p/w500${props.movie.backdrop_path}?api_key=030ab859193237f03ed76f36076a2a21`,
    };
  }
  onLayout(event) {
    if(event.nativeEvent.layout.width > event.nativeEvent.layout.height*2) {
      this.setState({ imagePath: `https://image.tmdb.org/t/p/w500${this.props.movie.poster_path}?api_key=030ab859193237f03ed76f36076a2a21` })
    }
  }
  render() {
    console.log(this.state.imagePath);
    return (
      <View
        style={{
          marginBottom: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onLayout={this.onLayout.bind(this)}
      >
        <Image style={{
            width: 200,
            height: 200,
          }}
          source={{uri: this.state.imagePath}}
        />
        <Text>
            {this.props.movie.title}
        </Text>
        <Text style={{
            marginLeft: 10,
          }}>
          {this.props.movie.overview}
        </Text>
      </View>
    );
  }
}

// AppRegistry.registerComponent('Movie', () => Movie);
