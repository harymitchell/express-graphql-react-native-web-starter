import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Picker } from 'react-native'
import Modal from 'modal-enhanced-react-native-web';

import { gql } from 'apollo-boost';
import { graphql, compose } from 'react-apollo';

import { getUnicornsQuery, updateUnicornMutation } from '../queries/queries';

class UpdateUnicorn extends Component {
    constructor(props) {
        super(props);
        console.log("update unicorn", this.props, this.state)
        this.state = { newLocation: this.props.selectedUnicorn && this.props.selectedUnicorn.location ? this.props.selectedUnicorn.location.id : "" };
    }
    _renderButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
          <View style={styles.button}>
            <Text style={styles.buttonText}> {text}</Text>
          </View>
        </TouchableOpacity>
     );
    _handleOnScroll = event => {
        this.setState({
          scrollOffset: event.nativeEvent.contentOffset.y
        });
    };
    _handleScrollTo = p => {
        if (this.scrollViewRef) {
          this.scrollViewRef.scrollTo(p);
        }
    };
    pickerVal(){
      console.log("pickerVal", this.state, this.props)
      if (this.state.newLocation){
        return this.state.newLocation;
      } else if (this.props.selectedUnicorn && this.props.selectedUnicorn.location){
        return this.props.selectedUnicorn.location.id;
      } else {
        return "1";
      }
    }
    componentDidUpdate(prevProps) {
        console.log("componentDidUpdate")
      if (this.props.selectedUnicorn !== prevProps.selectedUnicorn) {
       this.setState({ newLocation: null});
      }
    }
    _renderModalContent = () => (
        <View style={styles.modalContent}>
            <Text>{this.props.selectedUnicorn && this.props.selectedUnicorn.name}</Text>
            <Text>Change Location:</Text>
            <Picker
              selectedValue={this.pickerVal()}
              style={{ height: 50, width: 100 }}
              onValueChange={(itemValue, itemIndex) => {
                this.setState({newLocation: itemValue});
              }}>
              <Picker.Item label="Corral" value="1" />
              <Picker.Item label="Pasture" value="2" />
              <Picker.Item label="Barn" value="3" />
            </Picker>
            {this._renderButton("Save", () => {
                console.log("save")
                console.log("payload",{toLocationId: this.state.newLocation,unicornId: this.props.selectedUnicorn.id});
                this.props.updateUnicornMutation({
                    variables: {
                        toLocationId: this.pickerVal(),
                        unicornId: this.props.selectedUnicorn.id
                    },
                    refetchQueries: [{ query: getUnicornsQuery }]
                });
                this.setState({ visibleModal: false });
            })}
        </View>
    );
    render() {
        return (
              this._renderModalContent()
        )
    }
}

export default compose(
    graphql(getUnicornsQuery, { name: "getUnicornsQuery" }),
    graphql(updateUnicornMutation, { name: "updateUnicornMutation" }),
)(UpdateUnicorn);



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
    color: 'grey'
  },
  edit: {
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
    backgroundColor: "blue",
    padding: 12,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
})