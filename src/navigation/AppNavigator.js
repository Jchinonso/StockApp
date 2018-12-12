import React from "react";
import { createStackNavigator } from "react-navigation";

import AddComponent from "../components/AddComponent";
import MainComponent from "../components/MainComponent";
import DisplayComponent from '../components/DisplayComponent';

const AppNavigator = createStackNavigator(
  {
    Display: {screen: DisplayComponent},
    Main: { screen: MainComponent },
    Add: {screen: AddComponent}
  },
  {headerMode: 'none', initialRouteName: 'Display'}
);

export default AppNavigator;
