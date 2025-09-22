# 🔥 Configurarea Firebase pentru Cofetăria Cristine

## 📋 Pași pentru configurare:

### 1. Creează un proiect Firebase
1. Mergi la [Firebase Console](https://console.firebase.google.com/)
2. Apasă "Create a project" sau "Add project"
3. Numele proiectului: `cofetaria-cristine`
4. Dezactivează Google Analytics (opțional)
5. Apasă "Create project"

### 2. Activează serviciile Firebase

#### 🔐 Authentication
1. În Firebase Console, mergi la "Authentication"
2. Apasă "Get started"
3. În tab-ul "Sign-in method", activează "Email/Password"
4. Salvează

#### 📊 Firestore Database
1. Mergi la "Firestore Database"
2. Apasă "Create database"
3. Alege "Start in test mode" (pentru dezvoltare)
4. Alege o locație (ex: europe-west1)
5. Apasă "Done"

#### 🗄️ Storage (opțional pentru imagini)
1. Mergi la "Storage"
2. Apasă "Get started"
3. Alege "Start in test mode"
4. Alege aceeași locație ca Firestore

### 3. Adaug aplicația web
1. În Firebase Console, apasă pe iconița web (</>)
2. Numele aplicației: `cofetaria-cristine-web`
3. Nu bifa "Also set up Firebase Hosting"
4. Apasă "Register app"
5. Copiază configurația

### 4. Actualizează configurația Firebase
Înlocuiește configurația din `src/config/firebase.ts` cu datele tale:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "cofetaria-cristine.firebaseapp.com",
  projectId: "cofetaria-cristine",
  storageBucket: "cofetaria-cristine.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnop"
};
```

### 5. Configurează regulile Firestore
În Firebase Console > Firestore Database > Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Utilizatorii autentificați pot citi produsele
    match /products/{productId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        request.auth.token.email == "admin@cofetaria-cristine.com";
    }
    
    // Utilizatorii pot citi și scrie în propriile comenzi
    match /orders/{orderId} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == resource.data.userId || 
         request.auth.token.email == "admin@cofetaria-cristine.com");
    }
  }
}
```

### 6. Configurează regulile Storage (dacă folosești)
În Firebase Console > Storage > Rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        request.auth.token.email == "admin@cofetaria-cristine.com";
    }
  }
}
```

## 🚀 Funcționalități configurate:

### ✅ Autentificare
- Login/Register cu email și parolă
- Verificare admin automată
- Persistență sesiune

### ✅ Produse
- CRUD pentru produse
- Filtrare după categorie
- Produse populare
- Imagini pentru produse

### ✅ Comenzi
- Creare comenzi
- Status tracking
- Istoric comenzi
- Management admin

### ✅ Admin Dashboard
- Gestionare produse
- Vizualizare comenzi
- Control magazin (deschis/închis)
- Statistici

## 🔧 Conturi de test:

### Admin:
- Email: `admin@cofetaria-cristine.com`
- Parolă: `admin123`

### Utilizator normal:
- Poți crea orice cont cu email valid

## 📝 Note importante:

1. **Pentru producție:** Schimbă regulile Firestore din "test mode" la reguli de securitate
2. **Backup:** Configurează backup-uri automate pentru Firestore
3. **Monitoring:** Activează Firebase Analytics pentru statistici
4. **Hosting:** Poți folosi Firebase Hosting pentru a găzdui site-ul

## 🆘 Suport:

Dacă ai probleme cu configurarea:
1. Verifică că toate serviciile sunt activate
2. Verifică că configurația este corectă
3. Verifică regulile Firestore
4. Verifică console-ul browser pentru erori










