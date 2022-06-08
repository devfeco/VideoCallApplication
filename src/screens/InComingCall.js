import React, { useEffect , useState } from 'react';
import { View, StyleSheet, Image, Pressable, Text } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {useRoute , useNavigation} from "@react-navigation/native";
import { Voximplant } from "react-native-voximplant";

const InComingCall = () => {

  const [caller,setCaller] = useState('');
  const route = useRoute();
  const navigation = useNavigation();
  const {call} = route?.params;

  useEffect(() => {
    setCaller(call.getEndpoints()[0].displayName);
    call.on(Voximplant.CallEvents.Disconnected,callEvent => {
      navigation.navigate('Contacts');
    });

    return() => {
      call.off(Voximplant.CallEvents.Disconnected);
    }
  },[]);

  const onDecline = () => {
    call.decline();
  }

  const onAccept = () => {
    navigation.navigate('OnCalling',{
      call,
      isIncomingCall:true,
    });
  }

  return (
    <>
      <View style={styles.background}>
        <Image source={{ uri : item.picture }} style={{height:'100%',width:'100%'}} blurRadius={1}/>
      </View>
      <View style={styles.container}>
        <View style={styles.nameGroup}>
          <Image source={{ uri : item.picture }} style={styles.avatar}/>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.inComingCall}>InComing Call</Text>
        </View>
        <View style={styles.buttonGroup}>
          <Pressable onPress={onDecline} style={[styles.iconButton,{backgroundColor:'#EF5461'}]}>
            <MaterialIcons name={'phone-hangup'} size={30} color={'white'}/>
          </Pressable>
          <Pressable onPress={onAccept} style={[styles.iconButton,{backgroundColor:'#0DCD73'}]}>
            <MaterialIcons name={'phone'} size={30} color={'white'}/>
          </Pressable>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  background:{
    position:'absolute',
    width:'100%',
    height:'100%',
    opacity:.9
  },
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  nameGroup:{
    flexDirection:'column',
    flex:7,
    alignItems:'center',
    justifyContent:'center',
  },
  avatar:{
    height:150,
    width:150,
    borderRadius:100,
    margin:10,
  },
  name:{
    color:'white',
    fontSize:30,
    letterSpacing:1,
    fontWeight:'bold',
  },
  inComingCall:{
    color:'white',
    fontSize:18,
    fontWeight:'500'
  },
  buttonGroup:{
    flex:3,
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
  },
  iconButton:{
    padding:15,
    borderRadius:50,
  },
});
export default InComingCall;
