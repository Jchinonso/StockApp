import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {bindActionCreators} from 'redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { addQuotes } from "../actions/stockActions";
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
      onPressAdd={() => {
        return Promise.resolve(this.onPressAdd(item)).then(() => {
          this.props.navigation.goBack();
        });
      }}
    />
  );

  onPressAdd(quote) {
    this.props.addQuotes(quote.symbol);
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
              clearIcon={<Ionicons name="md-close" size={20} />}
              icon={{
                type: "font-awesome",
                name: "search"
              }}
            />
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
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

const mapStateToProps = state => ({
  selectedSymbols: state.stockReducer.selectedSymbols,
  symbols: state.stockReducer.symbols
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { addQuotes },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  headerContainer: {
    height: hp("17%"),
    backgroundColor: "#CCCCCC"
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp("5%"),
    marginRight: 16
  },
  text: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "bold",
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
  cancelText: { color: "#000000", fontFamily: "campton" },
  searchBarInputStyle: {
    height: 36,
    backgroundColor: "#fff"
  },
  searchSection: { flex: 1, flexDirection: "row", alignItems: "center" }
});
