import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
  Dimensions,
  AsyncStorage
} from "react-native";
import { connect } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";

import {
  deleteSymbols,
  fetchSymbols,
  clearState
} from "../actions/stockActions";
import StockList from "../components/common/StockList";
import AddComponent from "./AddComponent";

const { width, height } = Dimensions.get("window");

class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settingsBounceValue: new Animated.Value(height),
      quotes: props.quotes
    };
  }

  componentDidMount() {
    this.props.fetchSymbols()
  }

  static getDerivedStateFromProps(props, state) {
    if (props.quotes.length !== state.quotes.length) {
      return {
        quotes: props.quotes
      };
    } else return null;
  }

  toggleSubview = () => {
    Animated.spring(this.state.settingsBounceValue, {
      toValue: 0,
      velocity: 3,
      tension: 2,
      friction: 6
    }).start();
  };

  closeSubview = () => {
    Animated.spring(this.state.settingsBounceValue, {
      toValue: height,
      velocity: 3,
      tension: 2,
      friction: 6
    }).start();
  };

  onPressDelete(symbol) {
    
    this.props.deleteSymbols(symbol);
  }

  renderItem = ({ item }) => (
    <StockList
      name={item.companyName}
      symbol={item.symbol}
      onPressDelete={() => this.onPressDelete(item.symbol)}
    />
  );
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.textContainer}>
            <TouchableOpacity onPress={this.props.closeSubview}>
              <Text style={[styles.text, styles.marginLeftText]}>Done</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Add</Text>
            <TouchableOpacity onPress={this.toggleSubview}>
              <Ionicons name="ios-add" size={32} color="blue" />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <FlatList
            data={this.state.quotes}
            keyExtractor={index => index.toString()}
            renderItem={this.renderItem}
          />
        </View>
        <Animated.View
          style={[
            styles.addComponentView,
            {
              transform: [
                { translateY: this.state.settingsBounceValue },
                { perspective: 1000 }
              ]
            }
          ]}
        >
          <AddComponent
            closeSubview={this.closeSubview}
            symbols={this.props.symbols}
            quotes={this.props.quotes}
            selectedSymbols={this.state.selectedSymbols}
          />
        </Animated.View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  symbols: state.stockReducer.symbols,
  quotes: state.stockReducer.quotes,
  selectedSymbols: state.stockReducer.selectedSymbols
});

export default connect(
  mapStateToProps,
  { deleteSymbols, fetchSymbols, clearState }
)(MainComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000"
  },
  headerContainer: {
    height: hp("12%"),
    backgroundColor: "#202020"
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: hp("5%"),
    marginRight: 16
  },
  text: {
    color: "#fff",
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
    backgroundColor: "#000000"
  },
  marginLeftText: { marginLeft: 10, color: 'blue' }
});
