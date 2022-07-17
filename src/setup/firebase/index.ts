import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User as FirebaseUser,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export async function getFirebaseToken() {
  return auth.currentUser?.getIdToken(false);
}

export function onFirebaseAuthStateChanged(
  callback: (user: FirebaseUser | null) => void
) {
  onAuthStateChanged(auth, callback);
}

export async function loginWithGoogle() {
  const result = await signInWithPopup(auth, provider);
  console.log({ result });

  const credential = GoogleAuthProvider.credentialFromResult(result);
  console.log({ credential });

  if (!credential) throw new Error('Auth Error');

  const token = credential.accessToken;
  console.log({ token });

  // The signed-in user info.
  const user = result.user;
  console.log({ user });
}

export async function logout() {
  await signOut(auth);

  console.log('signOut');
}
