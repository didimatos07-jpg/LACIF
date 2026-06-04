import { createClient } from '@supabase/supabase-js';

// Dynamically check config from localStorage or fallback to import.meta.env
export function getSupabaseCredentials() {
  const localUrl = localStorage.getItem('lacif_supabase_url');
  const localKey = localStorage.getItem('lacif_supabase_anon_key');

  const url = localUrl?.trim() || import.meta.env.VITE_SUPABASE_URL?.trim() || 'https://ibjgurdmjgzyrvmrnivv.supabase.co';
  const anonKey = localKey?.trim() || import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || 'sb_publishable_obN0qgcLQ1Rti5PNRKlW3w_TWJvjvhq';

  return { url, anonKey, source: localUrl ? 'local' : 'env' };
}

const { url, anonKey } = getSupabaseCredentials();

export const isSupabaseEnabled = !!(url && anonKey);

export let supabase: any = null;

if (isSupabaseEnabled) {
  try {
    supabase = createClient(url, anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      }
    });
    console.log("Supabase Client initialized successfully!");
  } catch (error) {
    console.error("Failed to create Supabase Client:", error);
  }
}

// Update Supabase credentials dynamically in-app (very useful for sandboxes!)
export function updateSupabaseConfig(newUrl: string, newKey: string) {
  if (newUrl.trim() && newKey.trim()) {
    localStorage.setItem('lacif_supabase_url', newUrl.trim());
    localStorage.setItem('lacif_supabase_anon_key', newKey.trim());
    window.location.reload();
  }
}

// Clear Supabase credentials
export function clearSupabaseConfig() {
  localStorage.removeItem('lacif_supabase_url');
  localStorage.removeItem('lacif_supabase_anon_key');
  window.location.reload();
}

/**
 * ==========================================================
 * AUTHENTICATION HELPERS
 * ==========================================================
 */

export interface SupabaseUser {
  uid: string;
  email: string;
  displayName: string;
}

// Register user with Email/Password 
export async function registerWithEmail(email: string, password: string, displayName: string): Promise<SupabaseUser> {
  if (!isSupabaseEnabled || !supabase) {
    throw new Error("Supabase não está configurado.");
  }
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName,
        displayName: displayName
      }
    }
  });

  if (error) throw error;
  if (!data.user) throw new Error("Erro no registro.");

  return {
    uid: data.user.id,
    email: data.user.email || '',
    displayName: displayName
  };
}

// Log in user with Email/Password
export async function loginWithEmail(email: string, password: string): Promise<SupabaseUser> {
  if (!isSupabaseEnabled || !supabase) {
    throw new Error("Supabase não está configurado.");
  }
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
  if (!data.user) throw new Error("Erro de login.");

  const displayName = data.user.user_metadata?.display_name || 
                      data.user.user_metadata?.displayName || 
                      data.user.email?.split('@')[0] || 
                      'Agente';

  return {
    uid: data.user.id,
    email: data.user.email || '',
    displayName
  };
}

// Log out active user
export async function logOut(): Promise<void> {
  if (!isSupabaseEnabled || !supabase) return;
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// Sign in with Google (OAuth flow)
export async function signInWithGoogle(): Promise<void> {
  if (!isSupabaseEnabled || !supabase) {
    throw new Error("Supabase não está configurado.");
  }
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin
    }
  });
  if (error) throw error;
}

/**
 * ==========================================================
 * REAL-TIME DATABASE HELPERS (PostgreSQL)
 * ==========================================================
 */

// Save central site content in Supabase
export async function saveConfig(contentJsonString: string, updatedBy: string = 'Admin'): Promise<void> {
  if (!isSupabaseEnabled || !supabase) return;
  
  const { error } = await supabase
    .from('lacif_config')
    .upsert({
      id: 'lacif',
      content_json: JSON.parse(contentJsonString),
      updated_at: new Date().toISOString(),
      updated_by: updatedBy
    }, { onConflict: 'id' });

  if (error) {
    console.error("Error saving central config to Supabase:", error);
    throw error;
  }
}

// Fetch central site content from Supabase once
export async function fetchConfig(): Promise<any> {
  if (!isSupabaseEnabled || !supabase) return null;

  const { data, error } = await supabase
    .from('lacif_config')
    .select('*')
    .eq('id', 'lacif')
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Document not found/row does not exist yet
      return null;
    }
    console.error("Error reading central config from Supabase:", error);
    throw error;
  }

  return data;
}

// Save Quiz score in Supabase
export async function saveQuizResult(
  uid: string, 
  email: string, 
  displayName: string, 
  score: number, 
  totalQuestions: number,
  percentage: number
): Promise<void> {
  if (!isSupabaseEnabled || !supabase) return;

  const { error } = await supabase
    .from('quiz_results')
    .insert({
      id: `${uid}_${Date.now()}`,
      uid,
      email,
      display_name: displayName,
      score,
      total_questions: totalQuestions,
      percentage,
      created_at: new Date().toISOString()
    });

  if (error) {
    console.error("Error saving quiz result to Supabase:", error);
    throw error;
  }
}

// Fetch latest Quiz results
export async function fetchQuizResults(): Promise<any[]> {
  if (!isSupabaseEnabled || !supabase) return [];

  const { data, error } = await supabase
    .from('quiz_results')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    console.error("Error fetching quiz results from Supabase:", error);
    return [];
  }

  return data || [];
}
