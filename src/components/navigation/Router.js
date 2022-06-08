import React, {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import { Voximplant } from "react-native-voximplant";

//Screens
import {TabNavigation} from '../index'
import {Login , Test} from "../../screens";
import InComingCall from "../../screens/InComingCall";
import OnCalling from "../../screens/OnCalling";
import Call from "../../screens/Call";

export class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.client = Voximplant.getInstance();
    this.status = null;
  }

  async componentDidMount() {
    this.status = await this.client.getClientState();
    console.log(this.status);
  }

  render() {
    const Stack = createNativeStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={this.status === Voximplant.ClientState.LOGGED_IN ? 'navigation' : 'Login'}>
          <Stack.Screen name={'Login'} component={Login} />
          <Stack.Screen name={'navigation'} component={TabNavigation} />
          <Stack.Screen name={'OnCalling'} component={OnCalling} />
          <Stack.Screen name={'InComingCall'} component={InComingCall} />
          <Stack.Screen name={'Call'} component={Call} />
          <Stack.Screen name={'Test'} component={Test} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
