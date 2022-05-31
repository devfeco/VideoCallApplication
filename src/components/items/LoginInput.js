import React, { Component } from 'react';
import { View  , StyleSheet , TextInput} from 'react-native';

export class LoginInput extends Component {
  constructor(props) {
    super(props);
    this.state={
    }
  }
  render() {
    return (
      <View>
        <TextInput {...this.props} style={styles.input}/>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  input:{
    height:40,
    paddingHorizontal:5,
    borderWidth:2,
    borderRadius:4,
    borderColor:'#f1f1f1',
    color:'#999',
    marginBottom:14,
  }
});
