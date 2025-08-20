import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { fetchSuggestionsFromHuggingFace } from '@services/huggingface';
import Voice from 'react-native-voice';

export default function WritingAssistantScreen() {
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [recording, setRecording] = useState(false);
  const [hfKey, setHfKey] = useState<string>('');

  useEffect(() => {
    const onSpeechResults = (e: any) => {
      const value = e.value?.[0];
      if (value) {
        setText(prev => prev + (prev ? ' ' : '') + value);
      }
    };
    Voice.onSpeechResults = onSpeechResults;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (!hfKey || text.trim().length === 0) {
        setSuggestions([]);
        return;
      }
      const sgs = await fetchSuggestionsFromHuggingFace(text.slice(-400), hfKey);
      setSuggestions(sgs);
    }, 600);
    return () => clearTimeout(handler);
  }, [text, hfKey]);

  const toggleRecording = async () => {
    if (recording) {
      await Voice.stop();
      setRecording(false);
    } else {
      try {
        await Voice.start('en-US');
        setRecording(true);
      } catch (e) {}
    }
  };

  const insertSuggestion = (s: string) => {
    if (!s) return;
    setText(prev => (prev.endsWith(' ') || prev.length === 0) ? prev + s : prev + ' ' + s);
  };

  return (
    <View style={{flex:1, padding:16}}>
      <Text style={{fontSize:22, fontWeight:'700', marginBottom:8}}>Writing Assistant</Text>
      <TextInput
        placeholder="Paste your Hugging Face API key"
        value={hfKey}
        onChangeText={setHfKey}
        secureTextEntry
        style={{borderWidth:1, borderColor:'#ddd', borderRadius:8, padding:10, marginBottom:10}}
      />
      <TextInput
        placeholder="Start typing..."
        value={text}
        onChangeText={setText}
        multiline
        style={{flex:1, borderWidth:1, borderColor:'#ddd', borderRadius:12, padding:12, textAlignVertical:'top'}}
      />
      <View style={{marginTop:12}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {suggestions.map((s, idx) => (
            <TouchableOpacity key={idx} onPress={() => insertSuggestion(s)} style={{paddingVertical:8, paddingHorizontal:12, backgroundColor:'#f0f0f0', borderRadius:16, marginRight:8}}>
              <Text>{s}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:12}}>
        <TouchableOpacity onPress={toggleRecording} style={{backgroundColor:'#6C63FF', padding:12, borderRadius:8, flex:1, marginRight:8}}>
          <Text style={{color:'#fff', textAlign:'center'}}>{recording ? 'Stop Mic' : 'Start Mic'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSuggestions([])} style={{backgroundColor:'#6C63FF', padding:12, borderRadius:8, flex:1, marginLeft:8}}>
          <Text style={{color:'#fff', textAlign:'center'}}>Clear Suggestions</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

