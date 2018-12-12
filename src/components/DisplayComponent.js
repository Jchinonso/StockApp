import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  AsyncStorage,
  Dimensions,
  FlatList,
  RefreshControl
} from "react-native";
import { connect } from "react-redux";
import { addListQuotes, clearState } from "../actions/stockActions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons";

import MainComponent from "./MainComponent";
import DisplayStockList from "./common/DisplayStockList";
const { height } = Dimensions.get("window");

class DisplayComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: props.quotes,
      selectedSymbols: props.selectedSymbols,
      refreshing: false,
      settingsBounceValue: new Animated.Value(height)
    };
    this.onRefresh = this.onRefresh.bind(this);
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


  static getDerivedStateFromProps(props, state) {
    if (props.quotes.length !== state.quotes.length) {
      return {
        quotes: props.quotes
      };
    } else return null;
  }

  renderItem = ({ item }) => (
    <DisplayStockList
      name={item.companyName}
      symbol={item.symbol}
      latestPrice={item.latestPrice}
      timeUpdated={item.latestUpdate}
    />
  );

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

  render() {
    console.log(this.props.selectedSymbols)
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.textContainer}>
            <TouchableOpacity>
              <Text style={[styles.text, styles.marginLeftText]}>Sort</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Stock App</Text>
            <TouchableOpacity onPress={this.toggleSubview}>
              <Ionicons name="md-reorder" size={32} color="blue" />
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
          <MainComponent closeSubview={this.closeSubview} />
        </Animated.View>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  quotes: state.stockReducer.quotes,
  selectedSymbols: state.stockReducer.selectedSymbols
});
export default connect(
  mapStateToProps,
  { addListQuotes, clearState }
)(DisplayComponent);

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
  marginLeftText: { marginLeft: 10, color: "blue" }
});
