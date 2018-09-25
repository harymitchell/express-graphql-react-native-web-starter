import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

import { getUnicornsQuery } from '../queries/queries';

class UnicornList extends Component {
    onAddUnicorn(){
        
    }
    renderFlatListItem(item) {
        return (
            <View style={styles.flatview}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.location}>{item.location ? item.location.name : 'Location Unknown!'}</Text>
            </View>
    	   );
    }
    showUnicorns(){
        const data = this.props.data;
        console.log(data);
        if(data.loading){
            return (<Text>Loading unicorns...</Text>);
        } else {
            return (
                // <View>
                    <FlatList
                      data={data.unicorns}
                      renderItem={({item}) => this.renderFlatListItem(item)}
                    />
                // </View>
            );
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {this.showUnicorns()}
            </View>
        )
    }
}

export default graphql(getUnicornsQuery)(UnicornList);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  h2text: {
    marginTop: 10,
    fontFamily: 'Helvetica',
    fontSize: 36,
    fontWeight: 'bold',
  },
  flatview: {
    justifyContent: 'center',
    paddingTop: 30,
    borderRadius: 2,
  },
  name: {
    fontFamily: 'Verdana',
    fontSize: 18
  },
  location: {
    color: 'blue'
  }
})