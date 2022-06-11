import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, PermissionsAndroid, Alert, Platform, Pressable } from "react-native";
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
  const [isMicOn,setMicOn] = useState(false);
  const [isCameraOn,setCameraOn] = useState(false);

  const route = useRoute();
  const navigation = useNavigation();
  const client = Voximplant.getInstance();

  const {item:user , call:inComingCall , isIncomingCall , name} = route?.params;

  const call = useRef(inComingCall);
  const endpoint = useRef(null);

  const goBack = () => {
    navigation.pop();
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
      subscribeToEndpointEvent();
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
          console.log("remote : "+remoteVideoStreamId);
          console.log('local : '+localVideoStreamId);
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
          console.log("remote : "+remoteVideoStreamId);
          console.log('local : '+localVideoStreamId);
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

  const onToggleAudio = () => {
    call.current.sendAudio(isMicOn);
    setMicOn(!isMicOn);
  }

  const onToggleCamera = () => {
    call.current.sendVideo(isCameraOn);
    setCameraOn(!isCameraOn);
  }

  return (
    <View style={styles.page}>
      <Pressable onPress={goBack} style={styles.backButton}>
          <Icon name={'chevron-back'} color={'white'} size={25}/>
      </Pressable>

      <Voximplant.VideoView
        videoStreamId={localVideoStreamId}
        style={styles.localVideo}
        scaleType={Voximplant.RenderScaleType.SCALE_FIT}
        showOnTop={true}
      />
      <Voximplant.VideoView
        videoStreamId={remoteVideoStreamId}
        style={styles.remoteVideo}
        scaleType={Voximplant.RenderScaleType.SCALE_FIT}
      />


      <CallActionBox
        onHangupPress={onHangupPress}
        onToggleAudio={onToggleAudio}
        onToggleCamera={onToggleCamera}
        mic={isMicOn ? 'microphone-off' : 'microphone'}
        camera={isCameraOn ? 'camera-off' : 'camera'}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  page:{
    flex:1,
    alignContent:'flex-end',
  },
  localVideo: {
    width: 100,
    height: 150,
    borderRadius: 10,
    position: 'absolute',
    right: 10,
    top: 100,
    zIndex:0,
  },
  remoteVideo: {
    backgroundColor: '#988bf7',
    borderRadius: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 100,
    zIndex:-1
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 10,
    zIndex: 10,
  },
});
export default OnCalling;
