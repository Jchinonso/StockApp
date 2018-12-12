import React from "react";
import { createStackNavigator } from "react-navigation";

import DisplayComponent from '../components/DisplayComponent';

const AppNavigator = createStackNavigator(
  {
    Display: {screen: DisplayComponent},
  },
  {headerMode: 'none', initialRouteName: 'Display'}
);

export default AppNavigator;
