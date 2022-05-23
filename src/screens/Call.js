import React, { Component } from 'react';
import { View  , Image , StyleSheet} from 'react-native';
import {CallActionBox} from '../components'

export class Call extends Component {
  constructor(props) {
    super(props);
    this.state={
    }
  }
  render() {
    const {navigate} = this.props.navigation;
    const {params} = this.props.route;
    const {avatar,name} = params;

    const onHangupPress = () => {
      navigate('Contacts');
    }
    return (
      <View style={styles.page}>
        <View style={styles.avatarContainer}><Image source={{uri:avatar}} style={{width:'100%',height:'100%'}}/></View>
        <CallActionBox onHangupPress={onHangupPress} name={name}/>
      </View>
    );
  }
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
