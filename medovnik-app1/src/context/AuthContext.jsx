// import { createContext, useCallback, useContext, useState } from 'react';

// // ────────────────────────────────────────────────────────────
// // Auth context. The signInWithGoogle() body is a placeholder —
// // swap in Firebase / Supabase / Auth0 / anything when ready.
// // ────────────────────────────────────────────────────────────

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUser]       = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError]     = useState('');
//   const [modalOpen, setModal] = useState(false);

//   const openAuth  = useCallback(() => { setError(''); setModal(true);  }, []);
//   const closeAuth = useCallback(() => setModal(false), []);

//   /**
//    * Mock Google sign-in. Replace with the real SDK call.
//    *
//    * Firebase example:
//    *   const provider = new GoogleAuthProvider();
//    *   const result   = await signInWithPopup(auth, provider);
//    *   setUser(result.user);
//    */
//   const signInWithGoogle = useCallback(async () => {
//     setError('');
//     setLoading(true);
//     try {
//       await new Promise(r => setTimeout(r, 700)); // pretend network
//       setUser({
//         displayName: 'Демо потребител',
//         email: 'demo@medovnik.bg',
//         photoURL: null,
//       });
//       setModal(false);
//     } catch (e) {
//       setError('Възникна грешка при входа. Опитай отново.');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   const signOut = useCallback(() => setUser(null), []);

//   return (
//     <AuthContext.Provider value={{
//       user, loading, error, modalOpen,
//       openAuth, closeAuth, signInWithGoogle, signOut,
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error('useAuth must be used within AuthProvider');
//   return ctx;
// }
