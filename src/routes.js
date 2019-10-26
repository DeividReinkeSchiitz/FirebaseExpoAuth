import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import DropdownAlert from "react-native-dropdownalert";
import React from "react";

//Pages
import Main from "./pages/Main";
import Loading from "./pages/Loading";
import Dashboard from "./pages/dashboard";

const swith = createStackNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        header: null
      }
    },
    Main: {
      screen: Main,
      navigationOptions: {
        header: null
      }
    },
    Loading: {
      screen: Loading,
      navigatorOptions: {
        header: null
      }
    }
  },
  {
    initialRouteName: "Main",
    defaultNavigationOptions: () => {
      return {
        headerStyle: {},
        headerTintColor: "white",
        headerTitleStyle: {}
      };
    }
  }
);

const routes = createAppContainer(swith);

export default routes;
