import React, {Component} from 'react';
import {View} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

//Screens
import {Home , Settings , Contacts} from "../../screens";

export class TabNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const Tab = createMaterialBottomTabNavigator();
    return (
      <Tab.Navigator
        initialRouteName="Contacts"
        screenOptions={{headerShown: true}}
        activeColor="#212121"
        inactiveColor="#A098E3"
        barStyle={{backgroundColor: '#6C5DD2',fontWeight:'bold'}}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({color}) => (
              <View>
                <Icon name="home" size={24} color={color} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Contacts"
          component={Contacts}
          options={{
            tabBarIcon: ({color}) => (
              <View>
                <Icon name="person" size={24} color={color} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({color}) => (
              <View>
                <Icon name="settings" size={24} color={color} />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}
