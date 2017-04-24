/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
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
  BackAndroid,
} from 'react-native';
import React, { Component } from 'react';
import Movies from './Movies';
import Movie from './Movie';

let navRef = null;

BackAndroid.addEventListener('hardwareBackPress', () => {
 // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
 // Typically you would use the navigator here to go to the last state.
 if(navRef && navRef.getCurrentRoutes().length > 1) {
  navRef.pop();
  return true;
 }
 return false;
});

const Flixster = () => (
  <Navigator
    initialRoute={{ key: 'movies' }}
    renderScene={(route, navigator) => {
      navRef = navigator;
      if(route.key === 'movies') {
        return (<Movies
          onSelectMovie={(movie) => {
            console.log('onSelectMovie');
            navigator.push({key: 'details', movie });
          }}
        />);
      } else {
        return (<Movie
          movie={route.movie}
          />);
      }
    }}
  />
);
export default Flixster;

AppRegistry.registerComponent('Flixster', () => Flixster);
