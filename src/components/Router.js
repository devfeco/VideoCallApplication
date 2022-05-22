import React, {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

//Screens
import TabNavigation from './TabNavigation';
import Test from '../screens/Test';
import OnCalling from '../screens/OnCalling'
import InComingCall from '../screens/InComingCall'

export default class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const Stack = createNativeStackNavigator();
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name={'Navigation'} component={TabNavigation} />
          <Stack.Screen name={'OnCalling'} component={OnCalling}/>
          <Stack.Screen name={'InComingCall'} component={InComingCall}/>
          <Stack.Screen name={'Test'} component={Test} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
