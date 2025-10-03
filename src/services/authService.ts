import { supabase } from '../config/supabase';

// Interfață pentru utilizator (compatibilă cu codul existent)
export interface AuthUser {
  uid: string;
  email: string;
  displayName?: string;
  phone?: string;
  isAdmin: boolean;
  createdAt: Date;
}

// Funcție pentru înregistrare utilizator
export const registerUser = async (
  email: string, 
  password: string, 
  displayName?: string, 
  phone?: string
): Promise<AuthUser> => {
  try {
    // Creează utilizatorul în Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('Eroare la crearea utilizatorului');

    // Verifică dacă este admin
    const isAdmin = email === 'admin@cofetaria-cristine.com';

    // Creează documentul utilizatorului în tabela users
    const userData = {
      id: authData.user.id,
      email: authData.user.email!,
      display_name: displayName || null,
      phone: phone || null,
      is_admin: isAdmin,
      created_at: new Date().toISOString()
    };

    const { error: insertError } = await supabase
      .from('users')
      .insert(userData);

    if (insertError) throw insertError;

    return {
      uid: authData.user.id,
      email: authData.user.email!,
      displayName: displayName || '',
      phone: phone || '',
      isAdmin,
      createdAt: new Date()
    };
  } catch (error: any) {
    console.error('Error registering user:', error);
    throw new Error(getAuthErrorMessage(error));
  }
};

// Funcție pentru login utilizator
export const loginUser = async (email: string, password: string): Promise<AuthUser> => {
  try {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('Eroare la autentificare');

    // Obține datele utilizatorului din tabela users
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (userError) {
      // Dacă nu există documentul, creează-l
      const isAdmin = email === 'admin@cofetaria-cristine.com';
      const newUserData = {
        id: authData.user.id,
        email: authData.user.email!,
        display_name: null,
        phone: null,
        is_admin: isAdmin,
        created_at: new Date().toISOString()
      };

      const { error: insertError } = await supabase
        .from('users')
        .insert(newUserData);

      if (insertError) throw insertError;

      return {
        uid: authData.user.id,
        email: authData.user.email!,
        displayName: '',
        phone: '',
        isAdmin,
        createdAt: new Date()
      };
    }

    return {
      uid: userData.id,
      email: userData.email,
      displayName: userData.display_name || '',
      phone: userData.phone || '',
      isAdmin: userData.is_admin,
      createdAt: new Date(userData.created_at)
    };
  } catch (error: any) {
    console.error('Error logging in user:', error);
    throw new Error(getAuthErrorMessage(error));
  }
};

// Funcție pentru logout
export const logoutUser = async (): Promise<void> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error: any) {
    console.error('Error logging out user:', error);
    throw new Error('Eroare la deconectare. Încearcă din nou.');
  }
};

// Funcție pentru a asculta schimbările de autentificare
export const onAuthStateChange = (callback: (user: AuthUser | null) => void) => {
  return supabase.auth.onAuthStateChange(async (_event, session) => {
    if (session?.user) {
      try {
        // Obține datele utilizatorului din tabela users
        const { data: userData, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error getting user data:', error);
          callback(null);
          return;
        }

        callback({
          uid: userData.id,
          email: userData.email,
          displayName: userData.display_name || '',
          phone: userData.phone || '',
          isAdmin: userData.is_admin,
          createdAt: new Date(userData.created_at)
        });
      } catch (error) {
        console.error('Error processing auth state change:', error);
        callback(null);
      }
    } else {
      callback(null);
    }
  });
};

// Funcție pentru a obține utilizatorul curent
export const getCurrentUser = async (): Promise<AuthUser | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) return null;

    const { data: userData, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) return null;

    return {
      uid: userData.id,
      email: userData.email,
      displayName: userData.display_name || '',
      phone: userData.phone || '',
      isAdmin: userData.is_admin,
      createdAt: new Date(userData.created_at)
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Funcție pentru a obține datele utilizatorului curent
export const getCurrentUserData = async (): Promise<AuthUser | null> => {
  return getCurrentUser();
};

// Funcție pentru traducerea erorilor Supabase
const getAuthErrorMessage = (error: any): string => {
  if (error.message) {
    const message = error.message.toLowerCase();
    
    if (message.includes('email already registered') || message.includes('already registered')) {
      return 'Acest email este deja înregistrat.';
    }
    if (message.includes('password') && message.includes('weak')) {
      return 'Parola este prea slabă. Folosește cel puțin 6 caractere.';
    }
    if (message.includes('invalid email') || message.includes('email')) {
      return 'Adresa de email nu este validă.';
    }
    if (message.includes('user not found') || message.includes('not found')) {
      return 'Nu există un cont cu acest email.';
    }
    if (message.includes('wrong password') || message.includes('invalid password')) {
      return 'Parola este incorectă.';
    }
    if (message.includes('too many requests')) {
      return 'Prea multe încercări. Încearcă din nou mai târziu.';
    }
    if (message.includes('network') || message.includes('connection')) {
      return 'Eroare de rețea. Verifică conexiunea la internet.';
    }
  }
  
  return 'A apărut o eroare. Încearcă din nou.';
};
