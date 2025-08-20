import React from 'react';
import { View, Text, Switch } from 'react-native';
import { useAuth } from '@contexts/AuthContext';
import { usePreferences } from '@contexts/PreferencesContext';

export default function ProfileScreen() {
  const { session } = useAuth();
  const { preferences, updatePreferences } = usePreferences();

  return (
    <View style={{flex:1, padding:16}}>
      <Text style={{fontSize:22, fontWeight:'700', marginBottom:8}}>Profile & Settings</Text>
      <View style={{padding:12, borderRadius:12, borderWidth:1, borderColor:'#eee', marginBottom:16}}>
        <Text style={{fontWeight:'700'}}>Email</Text>
        <Text>{session?.user?.email}</Text>
      </View>

      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginBottom:12}}>
        <Text>Dark Mode</Text>
        <Switch
          value={preferences.theme === 'dark'}
          onValueChange={(v) => updatePreferences({ theme: v ? 'dark' : 'light' })}
        />
      </View>
      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
        <Text>Enable Gesture Shortcuts</Text>
        <Switch
          value={preferences.gestureShortcutsEnabled}
          onValueChange={(v) => updatePreferences({ gestureShortcutsEnabled: v })}
        />
      </View>
    </View>
  );
}

