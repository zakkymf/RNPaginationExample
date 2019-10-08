/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import API from './api'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this)
    this.onScrollEnd = this.onScrollEnd.bind(this)
    this.state = {
      data: [],
      page: 1,
      loading: false
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    return fetch(API + this.state.page)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          loading: false,
          data: [...this.state.data, ...responseJson.results]
        })
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          loading: false
        })
      });
  }

  onScrollEnd() {
    this.setState({
      loading: true,
      page: this.state.page + 1
    }, () => this.fetchData())
  }

  renderItem({ item }) {
    return (
      <View style={styles.content}>
        <Text>{item.id}</Text>
        <Text>{item.title}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <FlatList
            data={this.state.data}
            keyExtractor={item => item.id.toString()}
            onEndReached={this.onScrollEnd}
            onEndReachedThreshold={0}
            renderItem={this.renderItem.bind(this)}
          />
          {
            this.state.loading ? <ActivityIndicator size="small" /> : null
          }
        </SafeAreaView>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    margin: 10,
    marginTop: 10,
    flexDirection: 'row',
    borderBottomWidth: 1
  }
})
