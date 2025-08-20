import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

type Preferences = {
  theme: 'light' | 'dark' | 'system';
  gestureShortcutsEnabled: boolean;
};

type PreferencesContextType = {
  preferences: Preferences;
  updatePreferences: (p: Partial<Preferences>) => Promise<void>;
};

const defaultPrefs: Preferences = {
  theme: 'system',
  gestureShortcutsEnabled: true,
};

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const PreferencesProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const { supabase, session } = useAuth();
  const [preferences, setPreferences] = useState<Preferences>(defaultPrefs);

  useEffect(() => {
    const load = async () => {
      if (!session?.user) return;
      const { data } = await supabase.from('users').select('preferences, theme').eq('id', session.user.id).single();
      if (data) {
        setPreferences({
          theme: (data.theme as any) || 'system',
          gestureShortcutsEnabled: data.preferences?.gestureShortcutsEnabled ?? true,
        });
      }
    };
    load();
  }, [session?.user?.id]);

  const updatePreferences = async (p: Partial<Preferences>) => {
    setPreferences(prev => ({ ...prev, ...p }));
    if (!session?.user) return;
    await supabase.from('users').upsert({
      id: session.user.id,
      email: session.user.email,
      preferences: { ...preferences, ...p },
      theme: (p.theme ?? preferences.theme) as any,
    });
  };

  return (
    <PreferencesContext.Provider value={{ preferences, updatePreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error('usePreferences must be used within PreferencesProvider');
  return ctx;
};

