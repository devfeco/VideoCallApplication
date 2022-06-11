import React, { Component } from 'react';
import { View , StyleSheet , TouchableOpacity , Text} from 'react-native';

export class LoginButton extends Component {
  constructor(props) {
    super(props);
    this.state={

    }
  }
  render() {
    return (
      <View>
        <TouchableOpacity style={styles.button} onPress={this.props.onSignInPress}>
          <Text style={styles.buttonText}>{this.props.title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button:{
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    margin:5,
    height:40,
    backgroundColor:'#6C5DD2',
    marginBottom:20
  },
  buttonText:{
    color:'white',
    fontWeight:'bold',
    letterSpacing:1,
    fontSize:16
  }
});
