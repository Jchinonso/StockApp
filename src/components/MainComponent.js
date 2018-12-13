import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  RefreshControl
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";

import {
  deleteSymbols,
  fetchSymbols,
  clearState,
  addListQuotes
} from "../actions/stockActions";
import StockList from "../components/common/StockList";

const {height } = Dimensions.get("window");

class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: props.quotes,
      refreshing: false,
    };
    this.onRefresh = this.onRefresh.bind(this);
    this.sortListByPrice = this.sortListByPrice.bind(this)
  }

  componentDidMount() {
    this.props.fetchSymbols();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.quotes.length !== state.quotes.length) {
      return {
        quotes: props.quotes
      };
    } else return null;
  }

  async onRefresh() {
    console.log("starting");
    const { selectedSymbols } = this.props;
    await this.setState({ refreshing: true }),
      await this.props.addListQuotes(selectedSymbols).then(() =>
        this.setState({
          refreshing: false
        })
      );
  }

  sortListByPrice() {
    const sortedQuote = this.state.quotes.sort((a, b) => a > b)
    this.setState({
      quotes: sortedQuote
    })
  }
  onPressDelete(symbol) {
    this.props.deleteSymbols(symbol);
  }

  renderItem = ({ item }) => (
    <StockList
      name={item.companyName}
      symbol={item.symbol}
      latestPrice={item.latestPrice}
      timeUpdated={item.latestUpdate}
      onPressDelete={() => this.onPressDelete(item.symbol)}
    />
  );
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.textContainer}>
            <TouchableOpacity onPress={this.sortListByPrice}>
              <Text style={[styles.text, styles.marginLeftText]}>Sort</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Stock App</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Add")}
            >
              <Ionicons name="ios-add" size={32} color="blue" />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <FlatList
            data={this.state.quotes}
            keyExtractor={index => index.toString()}
            renderItem={this.renderItem}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
            removeClippedSubviews={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  symbols: state.stockReducer.symbols,
  quotes: state.stockReducer.quotes,
  selectedSymbols: state.stockReducer.selectedSymbols
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deleteSymbols,
      fetchSymbols,
      clearState,
      addListQuotes
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffff"
  },
  headerContainer: {
    height: hp("12%"),
    backgroundColor: "#CCCCCC"
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: hp("5%"),
    marginRight: 16
  },
  text: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "campton"
  },
  searchBarContainer: {
    backgroundColor: null,
    borderTopWidth: null,
    borderBottomWidth: null,
    marginTop: 14,
    marginBottom: 14
  },
  searchBarInputStyle: {
    height: 36,
    backgroundColor: "#fff"
  },
  addComponentView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flex: 1,
    backgroundColor: "#000000",
    height
  },
  marginLeftText: { marginLeft: 10, color: "blue" }
});
