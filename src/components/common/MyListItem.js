import React from "react";
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

function MyListItem(props) {
  return (
    <TouchableOpacity
      onPress={props.onPressAdd}
    >
      <View style={styles.container}>
        <View style={styles.stock}>
          <View style={styles.symbol}>
            <Text style={styles.symbolText}>{props.symbol}</Text>
          </View>
          <View style={styles.name}>
            <Text style={styles.nameText}>{props.name}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

MyListItem.propTypes = {
  onPressAdd: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
};

export default MyListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 65,
    
    backgroundColor: '#ffffff',
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  stock: {
    flex: 8,
    flexDirection: 'column',
  },
  symbol: {
    flex: 1,
    flexDirection: 'row',
  },
  symbolText: {
    fontSize: 15,
    fontFamily: 'campton',
    color: '#000000',
    textAlign: 'left',
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 15,
  },
  name: {
    flex: 1,
  },
  nameText: {
    fontSize: 10,
    color: '#000000',
    fontFamily: 'campton',
    textAlign: 'left',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 15,
  },
});