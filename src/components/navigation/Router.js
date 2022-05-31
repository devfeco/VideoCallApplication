import React, {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

//Screens
import {TabNavigation} from '../index'
import {Login , OnCalling , InComingCall , Call , Test} from "../../screens";

export class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const Stack = createNativeStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={'Login'}>
          <Stack.Screen name={'Login'} component={Login}/>
          <Stack.Screen name={'navigation'} component={TabNavigation} />
          <Stack.Screen name={'OnCalling'} component={OnCalling}/>
          <Stack.Screen name={'InComingCall'} component={InComingCall}/>
          <Stack.Screen name={'Call'} component={Call}/>
          <Stack.Screen name={'Test'} component={Test} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
