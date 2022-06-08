import React, { useEffect, useRef, useState } from "react";
import { View, Image, StyleSheet, PermissionsAndroid, Alert, Platform, Pressable } from "react-native";
import {CallActionBox} from '../components'
import { Voximplant } from "react-native-voximplant";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons'

const permissions = [
  PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  PermissionsAndroid.PERMISSIONS.CAMERA,
]

const OnCalling = () => {
  const[permissionsGranted,setPermissionsGranted] = useState(false);
  const [callStatus,setCallStatus] = useState('Initializing...');
  const [localVideoStreamId,setLocalVideoStreamId] = useState('');
  const [remoteVideoStreamId,setRemoteVideoStreamId] = useState('');

  const route = useRoute();
  const navigation = useNavigation();
  const client = Voximplant.getInstance();

  const {item:user , call:inComingCall , isIncomingCall} = route?.params;

  const call = useRef(inComingCall);
  const endpoint = useRef(null);

  const goBack = () => {
    navigation.goBack();
  }

  useEffect(() => {
    const getPermissions = async () => {
      const granted = await PermissionsAndroid.requestMultiple(permissions);
      const recordAudioGranted =
        granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === 'granted';
      const cameraGranted =
        granted[PermissionsAndroid.PERMISSIONS.CAMERA] === 'granted';
      if (!cameraGranted || !recordAudioGranted)
        Alert.alert('Error','Permissions not granted');
      else
        setPermissionsGranted(true);
    };
    if(Platform.OS === 'android')
      getPermissions();
    else
      setPermissionsGranted(true);
  },[]);

  useEffect(() => {
    if(!permissionsGranted)
      return;

    const callSettings = {
      video : {
        sendVideo : true,
        receiveVideo : true
      },
    }

    const makeCall = async () => {
      call.current = await client.call(user._id,callSettings);
      subscribeToCallEvents();
    }

    const answerCall = async () => {
      subscribeToCallEvents();
      endpoint.current = call.current.getEndpoints()[0];
      subscribeToCallEvents();
      call.current.answer(callSettings);
    }

    const subscribeToCallEvents = () => {
      call.current.on(Voximplant.CallEvents.Failed,callEvent => {
        showError(callEvent.reason);
      });
      call.current.on(Voximplant.CallEvents.ProgressToneStart, callEvent => {
        setCallStatus('Calling...');
      });
      call.current.on(Voximplant.CallEvents.Connected, callEvent => {
        setCallStatus('Connected');
      });
      call.current.on(Voximplant.CallEvents.Disconnected, callEvent => {
        navigation.navigate('Contacts');
      });
      call.current.on(
        Voximplant.CallEvents.LocalVideoStreamAdded,
        callEvent => {
          setLocalVideoStreamId(callEvent.videoStream.id);
        },
      );
      call.current.on(Voximplant.CallEvents.EndpointAdded, callEvent => {
        endpoint.current = callEvent.endpoint;
        subscribeToEndpointEvent();
      });
    }

    const subscribeToEndpointEvent = async () => {
      endpoint.current.on(
        Voximplant.EndpointEvents.RemoteVideoStreamAdded,
        endpointEvent => {
          setRemoteVideoStreamId(endpointEvent.videoStream.id);
        },
      );
    };

    const showError = reason => {
      Alert.alert('Call failed', `Reason: ${reason}`, [
        {
          text: 'Ok',
          onPress: navigation.navigate('Contacts'),
        },
      ]);
    };

    if (isIncomingCall) {
      answerCall();
    } else {
      makeCall();
    }

    return () => {
      call.current.off(Voximplant.CallEvents.Failed);
      call.current.off(Voximplant.CallEvents.ProgressToneStart);
      call.current.off(Voximplant.CallEvents.Connected);
      call.current.off(Voximplant.CallEvents.Disconnected);
    };
  },[permissionsGranted]);

  const onHangupPress = () => {
    call.current.hangup();
  }

  return (
    <View style={styles.page}>
      <Pressable onPress={goBack} style={styles.backButton}>
          <Icon name={'chevron-back'} color={'white'} size={25}/>
      </Pressable>

      <Voximplant.VideoView videoStreamId={remoteVideoStreamId} style={styles.remoteVideo}/>
      <Voximplant.VideoView videoStreamId={localVideoStreamId} style={styles.localVideo}/>


      <CallActionBox onHangupPress={onHangupPress} name={user.name}/>
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
export default OnCalling;
