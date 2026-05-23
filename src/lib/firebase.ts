import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import appletConfig from '../../firebase-applet-config.json';

// Environment variables configured in Vercel or locally fallback
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || appletConfig.apiKey || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || appletConfig.authDomain || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || appletConfig.projectId || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || appletConfig.storageBucket || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || appletConfig.messagingSenderId || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || appletConfig.appId || "",
  firestoreDatabaseId: appletConfig.firestoreDatabaseId || undefined
};

const hasConfig = !!(firebaseConfig.apiKey && firebaseConfig.projectId);

let app: any;
let auth: any = null;
let db: any = null;
let isFirebaseEnabled = false;

if (hasConfig) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    // Explicitly pass firestoreDatabaseId to target the proper database instance
    db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
    isFirebaseEnabled = true;
    console.log("Firebase central database initialized successfully with custom database instance ID:", firebaseConfig.firestoreDatabaseId);
  } catch (error) {
    console.error("Failed to initialize Firebase:", error);
  }
} else {
  console.log("VITE_FIREBASE environment variables and applet configuration are missing. App falls back to local browser cache.");
}

export { auth, db, isFirebaseEnabled };

// Operation enums matching Firestore skill specifications
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

// Global secure error handler mandated by the firebase-integration skill
export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const currentUser = auth?.currentUser;
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: currentUser?.uid,
      email: currentUser?.email,
      emailVerified: currentUser?.emailVerified,
      isAnonymous: currentUser?.isAnonymous,
      providerInfo: currentUser?.providerData?.map((provider: any) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('[LACIF FIREBASE ERROR]: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Easy Google Auth Sign In helper
export async function signInWithGoogle() {
  if (!isFirebaseEnabled || !auth) {
    throw new Error("Firebase integration is not customized or enabled in this deployment yet.");
  }
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Google authentication error:", error);
    throw error;
  }
}

// Sign Out helper
export async function logOut() {
  if (!isFirebaseEnabled || !auth) return;
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }
}
