import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User as FirebaseUser,
} from 'firebase/auth';

import app from './index';

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export async function getFirebaseToken(): Promise<string | undefined> {
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
