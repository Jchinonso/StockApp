import React from "react";
import { createStackNavigator } from "react-navigation";

import AddComponent from "../components/AddComponent";
import MainComponent from "../components/MainComponent";

const AppNavigator = createStackNavigator({
  Main: { screen: MainComponent },
  Add: {screen: AddComponent}
});

export default AppNavigator;
