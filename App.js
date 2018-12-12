import React from "react";
import { Provider } from "react-redux";
import { Font, AppLoading } from 'expo';
import { store, persistor } from "./src/store";
import { PersistGate } from "redux-persist/integration/react";
import AppNavigator from "./src/navigation/AppNavigator";

export default class App extends React.Component {
  state = {
    fontLoaded: false
  }
  
  async componentDidMount() {
    await Font.loadAsync({
      mono: require('./assets/fonts/SpaceMono-Regular.ttf'),
      campton: require('./assets/fonts/Campton.ttf')
    })
    this.setState({ fontLoaded: true })
  }
  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />
    }
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    );
  }
}

