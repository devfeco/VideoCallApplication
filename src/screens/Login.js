import React, { Component } from 'react';
import { View , StyleSheet , Text , KeyboardAvoidingView , ScrollView , TouchableOpacity} from 'react-native';

import { LoginButton, LoginForm } from "../components";

export class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerBackground}/>
        <View style={styles.mainLogo}>
          <Text style={styles.logo}>Video Call App</Text>
          <Text style={styles.logoDescription}>Feyzullah Ardahan</Text>
        </View>
        <KeyboardAvoidingView behavior={'position'}>
          <ScrollView>
            <View style={styles.loginArea}>
              <LoginForm/>
              <LoginButton title={'Sign In Now'}/>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>Got an Account</Text>
          <TouchableOpacity>
            <Text style={styles.signupButton}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'space-around'
  },
  headerBackground:{
    position:'absolute',
    top:-500,
    right:-500,
    width:1000,
    height:1000,
    borderRadius:5000,
    backgroundColor:'#6C5DD2'
  },
  mainLogo:{
    alignItems:'center',
    justifyContent:'center'
  },
  logo:{
    color:'white',
    fontSize:36,
    letterSpacing:2,
    fontWeight:'bold',
  },
  logoDescription:{
    color:'#f2f2f2',
    fontSize:20,
    letterSpacing:1,
    fontWeight:'bold'
  },
  loginArea:{
    backgroundColor:'#fff',
    padding:20,
    marginHorizontal:40,
    marginBottom:30,
    borderRadius:10,
    elevation:20,
    justifyContent:'center',
  },
  footer:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'flex-end',
  },
  footerTitle:{
    marginVertical:10
  },
  signupButton:{
    fontWeight:'bold',
    color:'black',
    marginVertical:10
  }
});
