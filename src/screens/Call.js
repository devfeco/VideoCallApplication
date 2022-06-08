import React, { Component } from 'react';
import { View  , Image , StyleSheet} from 'react-native';
import {CallActionBox} from '../components'

const Call = () => {
  return (
    <View style={styles.page}>
      <View style={styles.avatarContainer}><Image source={{uri:avatar}} style={{width:'100%',height:'100%'}}/></View>
      <CallActionBox/>
    </View>
  );
}
const styles = StyleSheet.create({
  page:{
    flex:1,
    alignContent:'flex-end',
  },
  avatarContainer:{
    position:'absolute',
    width:'100%',
    height:'87%',
    alignItems:'center',
    justifyContent:'center',
    opacity:0.8
  },
});
export default Call;
