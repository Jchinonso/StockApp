import React from "react";
import PropTypes from 'prop-types'
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function StockList(props) {
  return (
    <View underlayColor="#202020">
      <View style={styles.container}>
        <View style={styles.symbolStock}>
          <Text style={styles.symbolText}>{props.symbol}</Text>
        </View>
        <View style={styles.stock}>
          <View style={styles.symbol}>
            <Text style={styles.priceText}>{props.latestPrice}</Text>
          </View>
          <View style={styles.name}>
            <Text style={styles.nameText}>{props.timeUpdated}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.deleteIcon}
          onPress={props.onPressDelete}
        >
          <Ionicons name="ios-close-circle-outline" size={25} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

StockList.propTypes = {
  onPressDelete: PropTypes.func.isRequired,
  timeUpdated: PropTypes.string.isRequired,
  latestPrice: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
};

export default StockList;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: "row",
    height: 65,
    backgroundColor: "#ffffff",
    borderBottomColor: "#CCCCCC",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  stock: {
    flexDirection: "column"
  },
  symbolStock: {
    alignSelf: 'center'
  },
  symbol: {
    flex: 1,
    flexDirection: "row"
  },
  symbolText: {
    fontFamily: 'campton',
    fontSize: 18,
    marginLeft: 10
  },
   priceText: {
    fontSize: 15,
    fontFamily: 'campton',
    color: "#000000",
    textAlign: "left",
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 10
  },
  name: {
    flex: 1
  },
  nameText: {
    fontSize: 10,
    fontFamily: 'campton',
    color: "#000000",
    textAlign: "left",
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10
  },
  deleteIcon: { justifyContent: "center", marginRight: 10 }
});
