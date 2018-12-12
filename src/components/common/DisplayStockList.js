import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

function DisplayStockList(props) {
  return (
    <View underlayColor="#202020">
      <View style={styles.container}>
        <View style={styles.stock}>
          <View style={styles.symbol}>
            <Text style={styles.symbolText}>{props.symbol}</Text>
          </View>
          <View style={styles.name}>
            <Text style={styles.nameText}>{props.name}</Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceText}> {props.latestPrice}</Text>
          <Text style={styles.priceText}>  {props.timeUpdated} </Text>
        </View>
      </View>
    </View>
  );
}

export default DisplayStockList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    height: 65,
    marginLeft: 15,
    backgroundColor: "black",
    borderBottomColor: "#CCCCCC",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  stock: {
    flex: 8,
    flexDirection: "column"
  },
  symbol: {
    flex: 1,
    flexDirection: "row"
  },
  symbolText: {
    fontSize: 15,
    color: "white",
    textAlign: "left",
    marginTop: 10,
    marginBottom: 5,
    marginRight: 10
  },
  marketText: {
    fontSize: 15,
    color: "#A6A6A6",
    textAlign: "left",
    marginTop: 10,
    marginBottom: 5,
    marginRight: 10
  },
  name: {
    flex: 1
  },
  nameText: {
    fontSize: 10,
    color: "white",
    textAlign: "left",
    marginTop: 5,
    marginBottom: 5,
    marginRight: 10
  },

  priceContainer: { flexDirection: "row", alignItems: 'center' },

  priceText:{ color: "#fff" }
});
