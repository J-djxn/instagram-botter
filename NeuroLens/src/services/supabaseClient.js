import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://iiynvssfcgwrayejpklr.supabase.co';
export const SUPABASE_ANON_KEY = 'sb_publishable_0AjWStn328JnIUzGJ2pDdg_w2bllIYa';

export function createSupabaseClient() {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: true,
      storage: {
        getItem: (key) => AsyncStorage.getItem(key),
        setItem: (key, value) => AsyncStorage.setItem(key, value),
        removeItem: (key) => AsyncStorage.removeItem(key),
      },
      storageKey: 'supabase.auth.token',
      autoRefreshToken: true,
    },
  });
  return supabase;
}

