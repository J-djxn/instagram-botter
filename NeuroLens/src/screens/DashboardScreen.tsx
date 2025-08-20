import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '@contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { useEmotion } from '@utils/emotionStore';

export default function DashboardScreen() {
  const { session, signOut } = useAuth();
  const navigation = useNavigation<any>();
  const { currentEmotion, lastGesture, isPlaying, lastAction } = useEmotion();

  return (
    <View style={{flex:1, padding:24}}>
      <Text style={{fontSize:24, fontWeight:'700', marginBottom:8}}>Dashboard</Text>
      <Text style={{marginBottom:16}}>Signed in as {session?.user?.email}</Text>

      <View style={{padding:16, backgroundColor:'#f5f5f5', borderRadius:12, marginBottom:16}}>
        <Text style={{fontWeight:'700'}}>Emotion</Text>
        <Text style={{fontSize:18}}>{currentEmotion || 'Neutral'}</Text>
        <Text style={{marginTop:8}}>Last gesture: {lastGesture || 'None'}</Text>
        <Text style={{marginTop:8}}>Playback: {isPlaying ? 'Playing' : 'Paused'}</Text>
        <Text style={{marginTop:4}}>Last action: {lastAction || 'None'}</Text>
      </View>

      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <TouchableOpacity onPress={() => navigation.navigate('Camera')} style={{backgroundColor:'#6C63FF', padding:16, borderRadius:12, flex:1, marginRight:8}}>
          <Text style={{color:'#fff', textAlign:'center'}}>Open Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Writing')} style={{backgroundColor:'#6C63FF', padding:16, borderRadius:12, flex:1, marginHorizontal:8}}>
          <Text style={{color:'#fff', textAlign:'center'}}>Writing Assistant</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{backgroundColor:'#6C63FF', padding:16, borderRadius:12, flex:1, marginLeft:8}}>
          <Text style={{color:'#fff', textAlign:'center'}}>Profile</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={signOut} style={{marginTop:24}}>
        <Text style={{color:'red'}}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

