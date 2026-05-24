// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { useClickOutside } from '../../hooks/useClickOutside';

// /**
//  * Logged-in user pill in the navbar — avatar + name + dropdown menu.
//  */
// export default function UserChip({ onNavigate }) {
//   const { user, signOut } = useAuth();
//   const [open, setOpen] = useState(false);
//   const ref = useClickOutside(() => setOpen(false));
//   const navigate = useNavigate();

//   if (!user) return null;
//   const initial = (user.displayName || user.email || '?').trim()[0];

//   return (
//     <div className="user-chip" ref={ref} onClick={() => setOpen(o => !o)}>
//       {user.photoURL
//         ? <img src={user.photoURL} alt="" referrerPolicy="no-referrer" />
//         : <div style={avatarFallback}>{initial}</div>
//       }
//       <span className="user-name">{user.displayName || user.email}</span>
//       <span className="chev">▾</span>

//       <div className={`user-menu${open ? ' open' : ''}`}>
//         <button
//           type="button"
//           onClick={(e) => {
//             e.stopPropagation();
//             setOpen(false);
//             onNavigate?.();
//             navigate('/my-mead');
//           }}
//         >☕ Моята медовина</button>
//         <button
//           type="button"
//           onClick={(e) => { e.stopPropagation(); signOut(); setOpen(false); }}
//         >↪ Изход</button>
//       </div>
//     </div>
//   );
// }

// const avatarFallback = {
//   width: 32, height: 32, borderRadius: '50%',
//   background: 'linear-gradient(135deg,#b8621a,#d4831f)',
//   color: '#080603', display: 'flex',
//   alignItems: 'center', justifyContent: 'center',
//   fontFamily: 'UniSans, sans-serif', fontWeight: 900, fontSize: '0.85rem',
// };
