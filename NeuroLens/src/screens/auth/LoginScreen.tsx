import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuth } from '@contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const { signIn } = useAuth();
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onLogin = async () => {
    setLoading(true);
    setError(null);
    const { error } = await signIn(email.trim(), password);
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <View style={{flex:1, justifyContent:'center', padding:24}}>
      <Text style={{fontSize:28, fontWeight:'700', marginBottom:16}}>Welcome to NeuroLens</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{borderWidth:1, borderColor:'#ddd', borderRadius:12, padding:12, marginBottom:12}}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{borderWidth:1, borderColor:'#ddd', borderRadius:12, padding:12, marginBottom:12}}
      />
      {error ? <Text style={{color:'red', marginBottom:12}}>{error}</Text> : null}
      <TouchableOpacity onPress={onLogin} disabled={loading} style={{backgroundColor:'#6C63FF', padding:14, borderRadius:12, alignItems:'center'}}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={{color:'#fff', fontWeight:'700'}}>Login</Text>}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={{marginTop:16, alignItems:'center'}}>
        <Text>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

