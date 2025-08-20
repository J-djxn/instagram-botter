import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuth } from '@contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function SignupScreen() {
  const { signUp } = useAuth();
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSignup = async () => {
    setLoading(true);
    setError(null);
    const { error } = await signUp(email.trim(), password);
    if (error) setError(error.message);
    else setMessage('Check your email to confirm your account.');
    setLoading(false);
  };

  return (
    <View style={{flex:1, justifyContent:'center', padding:24}}>
      <Text style={{fontSize:28, fontWeight:'700', marginBottom:16}}>Create an account</Text>
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
      {message ? <Text style={{color:'green', marginBottom:12}}>{message}</Text> : null}
      <TouchableOpacity onPress={onSignup} disabled={loading} style={{backgroundColor:'#6C63FF', padding:14, borderRadius:12, alignItems:'center'}}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={{color:'#fff', fontWeight:'700'}}>Sign up</Text>}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{marginTop:16, alignItems:'center'}}>
        <Text>Back to login</Text>
      </TouchableOpacity>
    </View>
  );
}

