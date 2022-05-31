import React, { Component } from 'react';
import { View , StyleSheet , Text} from 'react-native';
import {LoginInput} from "../index";

export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state={
    }
  }
  render() {
    return (
      <View>
        <Text style={styles.title}>Sign In</Text>
        <LoginInput autoCapitalize={'none'} placeholder={'Username'}/>
        <LoginInput secureTextEntryt={true} placeholder={'Password'}/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  title:{
    marginVertical:10,
    fontSize:18,
    color:'#333'
  }
});
