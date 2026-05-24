// import { useAuth } from '../../context/AuthContext';

// /**
//  * Sign-in modal. Renders the Google CTA, an error slot, and
//  * the privacy fine print. Click the backdrop or × to close.
//  */
// export default function AuthModal() {
//   const { modalOpen, closeAuth, signInWithGoogle, loading, error } = useAuth();

//   return (
//     <div
//       className={`auth-modal${modalOpen ? ' open' : ''}`}
//       onClick={(e) => { if (e.target === e.currentTarget) closeAuth(); }}
//     >
//       <div className="auth-card">
//         <button
//           className="auth-close"
//           type="button"
//           onClick={closeAuth}
//           aria-label="Затвори"
//         >✕</button>

//         <h3>Добре дошъл</h3>
//         <p>Влез с Google, за да следиш партидите си, да виждаш калкулатора и да публикуваш отзиви.</p>

//         <button
//           className="google-btn"
//           type="button"
//           onClick={signInWithGoogle}
//           disabled={loading}
//         >
//           <svg viewBox="0 0 24 24">
//             <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
//             <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
//             <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z" fill="#FBBC05" />
//             <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.83C6.71 7.31 9.14 5.38 12 5.38z" fill="#EA4335" />
//           </svg>
//           {loading ? 'Зареждане…' : 'Продължи с Google'}
//         </button>

//         <div className="auth-error">{error}</div>
//         <div className="auth-fine">
//           С влизане приемаш да съхраняваме името, профилната ти снимка и партидите ти в облака. Никога не споделяме данни с трети страни.
//         </div>
//       </div>
//     </div>
//   );
// }
