import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

// Interfață pentru utilizator
export interface UserData {
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
): Promise<UserData> => {
  try {
    // Creează utilizatorul în Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Actualizează profilul utilizatorului
    if (displayName) {
      await updateProfile(user, { displayName });
    }

    // Verifică dacă este admin
    const isAdmin = email === 'admin@cofetaria-cristine.com';

    // Creează documentul utilizatorului în Firestore
    const userData: UserData = {
      uid: user.uid,
      email: user.email!,
      displayName: displayName || user.displayName || '',
      phone: phone || '',
      isAdmin,
      createdAt: new Date()
    };

    await setDoc(doc(db, 'users', user.uid), userData);

    return userData;
  } catch (error: any) {
    console.error('Error registering user:', error);
    throw new Error(getAuthErrorMessage(error.code));
  }
};

// Funcție pentru login utilizator
export const loginUser = async (email: string, password: string): Promise<UserData> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Obține datele utilizatorului din Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    } else {
      // Dacă nu există documentul, creează-l
      const isAdmin = email === 'admin@cofetaria-cristine.com';
      const userData: UserData = {
        uid: user.uid,
        email: user.email!,
        displayName: user.displayName || '',
        phone: '',
        isAdmin,
        createdAt: new Date()
      };

      await setDoc(doc(db, 'users', user.uid), userData);
      return userData;
    }
  } catch (error: any) {
    console.error('Error logging in user:', error);
    throw new Error(getAuthErrorMessage(error.code));
  }
};

// Funcție pentru logout
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error('Error logging out user:', error);
    throw new Error('Eroare la deconectare. Încearcă din nou.');
  }
};

// Funcție pentru a asculta schimbările de autentificare
export const onAuthStateChange = (callback: (user: UserData | null) => void) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      try {
        // Obține datele utilizatorului din Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (userDoc.exists()) {
          callback(userDoc.data() as UserData);
        } else {
          // Dacă nu există documentul, creează-l
          const isAdmin = user.email === 'admin@cofetaria-cristine.com';
          const userData: UserData = {
            uid: user.uid,
            email: user.email!,
            displayName: user.displayName || '',
            phone: '',
            isAdmin,
            createdAt: new Date()
          };

          await setDoc(doc(db, 'users', user.uid), userData);
          callback(userData);
        }
      } catch (error) {
        console.error('Error getting user data:', error);
        callback(null);
      }
    } else {
      callback(null);
    }
  });
};

// Funcție pentru a obține utilizatorul curent
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Funcție pentru a obține datele utilizatorului curent din Firestore
export const getCurrentUserData = async (): Promise<UserData | null> => {
  const user = getCurrentUser();
  if (!user) return null;

  try {
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    }
    return null;
  } catch (error) {
    console.error('Error getting current user data:', error);
    return null;
  }
};

// Funcție pentru traducerea erorilor Firebase
const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'Acest email este deja înregistrat.';
    case 'auth/weak-password':
      return 'Parola este prea slabă. Folosește cel puțin 6 caractere.';
    case 'auth/invalid-email':
      return 'Adresa de email nu este validă.';
    case 'auth/user-not-found':
      return 'Nu există un cont cu acest email.';
    case 'auth/wrong-password':
      return 'Parola este incorectă.';
    case 'auth/too-many-requests':
      return 'Prea multe încercări. Încearcă din nou mai târziu.';
    case 'auth/network-request-failed':
      return 'Eroare de rețea. Verifică conexiunea la internet.';
    default:
      return 'A apărut o eroare. Încearcă din nou.';
  }
};




