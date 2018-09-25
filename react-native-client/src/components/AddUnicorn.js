import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, TextInput } from 'react-native'

import { gql } from 'apollo-boost';
import { graphql, compose  } from 'react-apollo';
import { addUnicornMutation, getUnicornsQuery } from '../queries/queries';

        
class AddUnicorn extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '...new unicorn' };
    }
    onAddUnicorn(){
        const name = this.state.name;
        this.props.addUnicornMutation({
            variables: {
                name: name,
            },
            refetchQueries: [{ query: getUnicornsQuery }]
        });
        this.setState({ name: '...new unicorn'});
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>Add Unicorn:</Text>
                <TextInput
                    style={{height: 20, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(name) => this.setState({ name: name})}
                    value={this.state.name}
                />
                <Button
                  onPress={this.onAddUnicorn.bind(this)}
                  title="Add Unicorn"
                  color="blue"
                  accessibilityLabel="Add a unicorn."
                />
            </View>
        )
    }
}

export default compose(
    graphql(addUnicornMutation, { name: "addUnicornMutation" }),
)(AddUnicorn);

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