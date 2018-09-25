import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import UnicornList from './components/UnicornList';
import AddUnicorn from './components/AddUnicorn';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'

const apolloClient = new ApolloClient({
    uri: 'https://unicorn-manager-harymitchell.c9users.io:8080/graphql'
});

export default class App extends Component {
  render() {
    return (
      
      <ApolloProvider client={apolloClient}>
        <View style={styles.app}>
          <View style={styles.appHeader}>
            <Text style={styles.appTitle}>Unicorn Manager ⚛️</Text>
          </View>
          <UnicornList></UnicornList>
          <AddUnicorn></AddUnicorn>
        </View>
      </ApolloProvider>
      
    )
  }
}
const styles = StyleSheet.create({
  app: {
    flex: 1
  },
  appHeader: {
    flex: 1,
    backgroundColor: '#222',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  appTitle: {
    fontSize: 16,
    color: 'white'
  },
  appIntro: {
    flex: 2,
    fontSize: 30,
    textAlign: 'center'
  }
})