import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevice, useFrameProcessor } from 'react-native-vision-camera';
import { useEmotion } from '@utils/emotionStore';
import { usePreferences } from '@contexts/PreferencesContext';
import { sendLocalStressNotification } from '@services/notifications';

export default function CameraScreen() {
  const device = useCameraDevice('front');
  const [cameraPermission, setCameraPermission] = useState<'authorized'|'not-determined'|'denied'>('not-determined');
  const { setEmotion, setGesture } = useEmotion();
  const { preferences } = usePreferences();

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setCameraPermission(status);
    })();
  }, []);

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    // Placeholder: In a real app, integrate mediapipe or a frame processor plugin
    // to detect face landmarks, blinks, gaze direction and classify emotion.
    // For now we do nothing here. The UI shows placeholders being updated optionally from native modules.
  }, []);

  const onSimulate = () => {
    const samples = ['Happy', 'Sad', 'Stressed', 'Neutral'] as const;
    const randomEmotion = samples[Math.floor(Math.random() * samples.length)];
    setEmotion(randomEmotion);
    const gestures = ['DoubleBlink','SingleBlink','LookLeft','LookRight'] as const;
    setGesture(gestures[Math.floor(Math.random()*gestures.length)]);
    if (randomEmotion === 'Stressed') {
      // Simulate notifying after prolonged stress detection
      setTimeout(() => {
        sendLocalStressNotification();
      }, 2000);
    }
  };

  if (!device || cameraPermission !== 'authorized') {
    return (
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <Text style={{marginBottom:12}}>Requesting camera permission...</Text>
        <TouchableOpacity onPress={onSimulate} style={{padding:12, backgroundColor:'#6C63FF', borderRadius:8}}>
          <Text style={{color:'#fff'}}>Simulate Detection</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{flex:1}}>
      <Camera style={{flex:1}} device={device} isActive={true} frameProcessor={frameProcessor} frameProcessorFps={2} />
      {preferences.gestureShortcutsEnabled ? (
        <View style={{position:'absolute', bottom:24, left:0, right:0, alignItems:'center'}}>
          <TouchableOpacity onPress={onSimulate} style={{padding:12, backgroundColor:'#6C63FF', borderRadius:8}}>
            <Text style={{color:'#fff'}}>Simulate Detection</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

