/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
  ActivityIndicator,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
  RefreshControl,
  Row,
  TouchableOpacity,
} from 'react-native';
import Tabs from 'react-native-tabs';

type State = { animating: boolean; };
type Timer = number;

const propTypes = {
  onSelectMovie: PropTypes.func.isRequired,
}

class Movies extends Component {
  state: State;
  _timer: Timer;
  constructor(props) {
    super(props);
    this.state = {
      movies: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      loading: false,
      refreshing: false,
      page: 'playing',
    };
    this.getMovies = this.getMovies.bind(this);
    this.renderMovie = this.renderMovie.bind(this);
  }
  _onRefresh() {
    this.setState({refreshing: true});
    this.getMovies();
  }
  getMovies() {
    this.setState({ loading: true });
    const moviesEndpoint = this.state.page === 'playing' ? 'now_playing' : 'top_rated';
  return fetch(`https://api.themoviedb.org/3/movie/${moviesEndpoint}?api_key=030ab859193237f03ed76f36076a2a21`)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson.results);
      const newMovies = this.state.movies.cloneWithRows(responseJson.results);
      this.setState({ movies: newMovies, loading: false });
      clearTimeout(this._timer);
    })
    .catch((error) => {
      this.setState({ loading: false });
      console.error(error);
    });
  }
  componentWillReceiveProps(nextProps, nextState) {
    console.log(nextState.page);
    if(nextState.page !== this.state.page) {
      this.setState({ page: nextState.page });
      this.getMovies();
    }
  }
  componentDidMount() {
    this.getMovies();
  }
  renderMovie(movie) {
    const image_path = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}?api_key=030ab859193237f03ed76f36076a2a21`;
    console.log('IMAGEPATH',image_path);
    console.log(this.state.movies);
    return (
      <View
        style={styles.row}
      >
        <Image
          style={styles.image}
          source={{uri: image_path}}
        />
        <View
          style={styles.container}
        >
          <Text>
            {movie.title}
          </Text>
          <Text>
            {movie.overview}
          </Text>
        </View>
      </View>
    );
  }
  render() {
    if (this.state.loading) {
      return (<ActivityIndicator
        animating={true}
        style={[styles.centering, {height: 80}]}
        size="large"
      />)
    }
    if (this.state.movies === 0) {
      return (
        <View style={styles.container}>
          <Text>
            {"No movies to show"}
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ListView
          name='playing'
          dataSource={this.state.movies}
          renderRow={(movie) => (
            <TouchableOpacity onPress={() => this.props.onSelectMovie(movie)}>
              {this.renderMovie(movie)}
            </TouchableOpacity>
            )
          }
        />
        <Tabs
          selected={this.state.page}
          style={{backgroundColor:'white'}}
          selectedStyle={{color:'red'}}
          onSelect={el => {
              this.setState({page:el.props.name});
              this.getMovies();
            }
          }
        >
          <Text name="playing">Playing</Text>
          <Text name="popular">Popular</Text>
        </Tabs>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  row: {
    flexDirection: 'row',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  image: {
    width: 100,
    height: 100,
  }
});

Movies.propTypes = propTypes;

// AppRegistry.registerComponent('Movies', () => Movies);
export default Movies;
