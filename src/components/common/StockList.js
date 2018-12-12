import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function StockList(props) {
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
        <TouchableOpacity style={styles.deleteIcon} onPress={props.onPressDelete}>
          <Ionicons
            name="ios-close-circle-outline"
            size={25}
            color="red"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default StockList;

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
  deleteIcon: {justifyContent: 'center', marginRight: 10}
});
