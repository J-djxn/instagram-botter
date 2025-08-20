import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSupabaseClient } from '@services/supabaseClient';

type AuthContextType = {
  session: any;
  sessionInitialized: boolean;
  signIn: (email: string, password: string) => Promise<{error?: any}>;
  signUp: (email: string, password: string) => Promise<{error?: any}>;
  signOut: () => Promise<void>;
  supabase: ReturnType<typeof createSupabaseClient>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const supabase = createSupabaseClient();
  const [session, setSession] = useState<any>(null);
  const [sessionInitialized, setSessionInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (data?.session) setSession(data.session);
      } catch (e) {}
      setSessionInitialized(true);
    };
    init();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, currentSession) => {
      setSession(currentSession);
      // Session persistence handled by Supabase storage adapter in client config
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, sessionInitialized, signIn, signUp, signOut, supabase }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

