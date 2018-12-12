import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  AsyncStorage
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { getSelectedSymbols, addQuotes } from "../actions/stockActions";
import { connect } from "react-redux";
import { SearchBar } from "react-native-elements";
import MyListItem from "../components/common/MyListItem";

class AddComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredSymbols: [],
      selectedSymbols: props.selectedSymbols,
      search: false,
      text: "",
      helpText: "Type a company name or stock symbol.",
      loaded: false
    };
    this.onChangeText = this.onChangeText.bind(this);
  }

  onChangeText(text) {
    if (text.trim().length === 0) {
      this.setState({
        search: false
      });
      return;
    }
    this.setState({
      search: true,
      filteredSymbols: this.props.symbols.filter(item => {
        return item.symbol.toLowerCase().includes(text.toLowerCase());
      })
    });
  }
  renderItem = ({ item }) => (
    <MyListItem
      id={item.id}
      name={item.name}
      symbol={item.symbol}
      onPressAdd={() => this.onPressAdd(item)}
    />
  );

 
  onPressAdd(quote) {
    this.props.addQuotes(quote.symbol)
  }
  
  render() {
    
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{this.state.helpText}</Text>
          </View>
          <View style={styles.searchSection}>
            <SearchBar
              round
              containerStyle={styles.searchBarContainer}
              onChangeText={this.onChangeText}
              inputStyle={styles.searchBarInputStyle}
              icon={{
                type: "font-awesome",
                name: "search"
              }}
            />
            <TouchableOpacity onPress={this.props.closeSubview}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <FlatList
            data={
              this.state.search
                ? this.state.filteredSymbols
                : this.props.symbols.slice(0, 10)
            }
            keyExtractor={index => index.toString()}
            renderItem={this.renderItem}
            removeClippedSubviews={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
}

export default connect(
  null,
  { getSelectedSymbols, addQuotes }
)(AddComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000"
  },
  headerContainer: {
    height: hp("17%"),
    backgroundColor: "#202020"
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("5%"),
    marginRight: 16
  },
  text: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "500",
    fontFamily: "campton"
  },
  searchBarContainer: {
    backgroundColor: null,
    borderTopWidth: null,
    borderBottomWidth: null,
    marginTop: 5,
    marginLeft: 5,
    width: wp("80%")
  },
  cancelText: { color: "#fff" },
  searchBarInputStyle: {
    height: 36,
    backgroundColor: "#fff"
  },
  searchSection: { flex: 1, flexDirection: "row", alignItems: "center" }
});
