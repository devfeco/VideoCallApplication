import React, { Component } from 'react';
import { View, StyleSheet, Pressable, Dimensions , Text} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {WaveBox} from '../index'

export class CallActionBox extends Component {
  constructor(props) {
    super(props);
    this.state={
      isCameraOn:true,
      isMicOn:true,
    }
  }
  render() {
    return (
      <>
        <WaveBox customStyles={styles.svgCurve}/>
        <View style={styles.container}>
          <Pressable onPress={this.props.onToggleCamera} style={styles.iconButton}>
            <MaterialIcons name={this.props.camera} size={30} color={'white'}/>
          </Pressable>
          <Pressable onPress={this.props.onHangupPress} style={[styles.iconButton,{backgroundColor:'#FF4D50'}]}>
            <MaterialIcons name={'phone-hangup'} size={30} color={'white'}/>
          </Pressable>
          <Pressable onPress={this.props.onToggleAudio} style={styles.iconButton}>
            <MaterialIcons name={this.props.mic} size={30} color={'white'}/>
          </Pressable>
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 1,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  iconButton: {
    backgroundColor: '#A098E3',
    padding: 15,
    borderRadius: 50,
    marginBottom:25
  },
  svgCurve:{
    position:'absolute',
    width:Dimensions.get('window').width,
    bottom:0,
  },
  nameContainer:{
    justifyContent:'center',
    alignItems:'center',
    marginVertical:10
  },
  name:{
    color:'white',
    fontWeight:'bold',
    fontSize:16,
    letterSpacing:1,
    fontFamily:''
  }
});
