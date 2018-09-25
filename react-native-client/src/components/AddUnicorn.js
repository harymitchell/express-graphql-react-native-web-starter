import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Picker  } from 'react-native'
import Modal from 'modal-enhanced-react-native-web';

import { gql } from 'apollo-boost';
import { graphql, compose  } from 'react-apollo';
import { addUnicornMutation, getUnicornsQuery } from '../queries/queries';

        
class AddUnicorn extends Component {
    constructor(props) {
        super(props);
        this.state = { visibleModal: null, name: '...new unicorn' };
    }
    onAddUnicorn(){
        const name = this.state.name;
        this.props.addUnicornMutation({
            variables: {
                name: name,
            },
            refetchQueries: [{ query: getUnicornsQuery }]
        });
        this.setState({ visibleModal: false, name: '...new unicorn'});
    }
    _renderButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>{text}</Text>
          </View>
        </TouchableOpacity>
     );
    render() {
        return (
          <View>
            {this._renderButton("Add Unicorn", () => {this.setState({visibleModal: true})})}
            <Modal
              isVisible={this.state.visibleModal}
              onBackdropPress={() => this.setState({ visibleModal: false })}
            >
              <View style={styles.modalContent}>
                  <Text style={styles.h2text}>Add Unicorn</Text>
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
            </Modal>
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
  },
  modalContent: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  buttonText: {
    color: 'white'
  },
  button: {
    // color: 'white',
    backgroundColor: "blue",
    padding: 12,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
})