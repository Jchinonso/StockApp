import React from "react";
import { createStackNavigator } from "react-navigation";

import MainComponent from '../components/MainComponent';
import AddComponent from '../components/AddComponent';

const AppNavigator = createStackNavigator(
  {
    Main: {screen: MainComponent},
    Add: {screen: AddComponent }
  },
  {headerMode: 'none', initialRouteName: 'Main'}
);

export default AppNavigator;
