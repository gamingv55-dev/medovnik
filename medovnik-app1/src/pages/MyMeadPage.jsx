// import { useMemo, useState } from 'react';
// import { useAuth } from '../context/AuthContext';

// /**
//  * "Моята медовина" — personal dashboard for logged-in users.
//  * Two tabs: live batches you're tracking, and a recipe-ratio
//  * calculator sized for the 5L jar. Logged-out users hit a wall.
//  */
// export default function MyMeadPage() {
//   const { user, openAuth } = useAuth();
//   const [tab, setTab] = useState('batches');

//   if (!user) {
//     return (
//       <div style={{ paddingTop: '8rem', background: 'var(--bark)', minHeight: '100vh' }}>
//         <div className="sec" style={{ paddingTop: '2rem' }}>
//           <div className="login-wall" style={{ display: 'block' }}>
//             <div className="lw-ico">☕</div>
//             <h3>Твоите партиди те чакат</h3>
//             <p>Влез в профила си, за да свалиш до 3 партиди, да следиш ферментацията и да ползваш калкулатора за съотношения.</p>
//             <button className="btn-primary" onClick={openAuth}>Влез с Google</button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={{ paddingTop: '8rem', background: 'var(--bark)', minHeight: '100vh' }}>
//       <div className="sec" style={{ paddingTop: '2rem' }}>
//         <div className="mead-page-head">
//           <div className="greeting">
//             <div className="sec-label">Моята медовина</div>
//             <h2 className="sec-h2">
//               Здравей, <span className="h2-accent">{(user.displayName || user.email || 'приятел').split(' ')[0]}</span>
//             </h2>
//             <p>Твоите партиди и калкулатор за съотношения, събрани на едно място.</p>
//           </div>
//           <div className="mead-tabs">
//             <button
//               className={`mead-tab${tab === 'batches' ? ' active' : ''}`}
//               onClick={() => setTab('batches')}
//             >Партиди</button>
//             <button
//               className={`mead-tab${tab === 'calc' ? ' active' : ''}`}
//               onClick={() => setTab('calc')}
//             >Калкулатор</button>
//           </div>
//         </div>

//         {tab === 'batches' && <BatchesSection />}
//         {tab === 'calc'    && <CalculatorSection />}
//       </div>
//     </div>
//   );
// }

// /* ── Batches ─────────────────────────────────────────────── */

// function BatchesSection() {
//   // Demo entries — replace with Firestore/Supabase data when ready.
//   const [batches, setBatches] = useState([
//     {
//       id: 1, name: 'Партида #1', recipe: 'Класическа сухa', status: 'fermenting',
//       startedAt: new Date(Date.now() - 12 * 86400000),
//       duration: 30,
//       honey: 1.5, water: 3.5, yeast: 5, notes: '',
//     },
//   ]);

//   if (!batches.length) {
//     return (
//       <div className="mead-section active">
//         <div className="batches-grid">
//           <div className="batch-empty">
//             <span className="icon">🫙</span>
//             Все още нямаш партида. Стартирай първата си с няколко клика.
//             <br />
//             <button onClick={() => setBatches([demoBatch()])}>Започни първа партида</button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   function updateNote(id, notes) {
//     setBatches((prev) => prev.map((b) => b.id === id ? { ...b, notes } : b));
//   }
//   function remove(id) {
//     setBatches((prev) => prev.filter((b) => b.id !== id));
//   }

//   return (
//     <div className="mead-section active">
//       <div className="batches-grid">
//         {batches.map((b) => <BatchCard key={b.id} batch={b} onNotes={updateNote} onRemove={remove} />)}
//       </div>
//     </div>
//   );
// }

// function BatchCard({ batch, onNotes, onRemove }) {
//   const day = Math.max(1, Math.floor((Date.now() - batch.startedAt.getTime()) / 86400000));
//   const pct = Math.min(100, Math.round((day / batch.duration) * 100));
//   const statusLabel =
//     batch.status === 'fermenting' ? 'Ферментира' :
//     batch.status === 'bottling'   ? 'Бутилиране' : 'Готова';

//   return (
//     <div className="batch-card">
//       <div className="b-head">
//         <div>
//           <div className="b-name">{batch.name}</div>
//           <div className="b-recipe">{batch.recipe}</div>
//         </div>
//         <button className={`b-status ${batch.status}`}>{statusLabel}</button>
//       </div>

//       <div className="b-progress">
//         <div className="row">
//           <span className="day-num">{day}</span>
//           <div>
//             <div className="day-lbl">Ден от ферментацията</div>
//             <div className="day-date">от {batch.startedAt.toLocaleDateString('bg-BG')}</div>
//           </div>
//         </div>
//         <div className="b-bar"><div style={{ width: `${pct}%` }} /></div>
//       </div>

//       <div className="b-ingredients">
//         <div className="b-ing"><div className="v">{batch.honey} кг</div><div className="k">Мед</div></div>
//         <div className="b-ing"><div className="v">{batch.water} л</div><div className="k">Вода</div></div>
//         <div className="b-ing"><div className="v">{batch.yeast} г</div><div className="k">Дрожди</div></div>
//       </div>

//       <textarea
//         className="b-notes"
//         placeholder="Бележки за тази партида…"
//         value={batch.notes}
//         onChange={(e) => onNotes(batch.id, e.target.value)}
//       />

//       <div className="b-actions">
//         <button className="b-act">Промени статус</button>
//         <button className="b-act danger" onClick={() => onRemove(batch.id)}>Изтрий</button>
//       </div>
//     </div>
//   );
// }

// function demoBatch() {
//   return {
//     id: Date.now(), name: 'Партида #1', recipe: 'Класическа сухa',
//     status: 'fermenting', startedAt: new Date(),
//     duration: 30, honey: 1.5, water: 3.5, yeast: 5, notes: '',
//   };
// }

// /* ── Calculator ──────────────────────────────────────────── */

// const RECIPES = [
//   { id: 'dry',    cat: 'Класика',   name: 'Сухa',         abv: '12–14% алк.', honey: 1.3, water: 3.6, yeast: 5 },
//   { id: 'semi',   cat: 'Класика',   name: 'Полусладка',   abv: '13–15% алк.', honey: 1.6, water: 3.4, yeast: 5 },
//   { id: 'sweet',  cat: 'Класика',   name: 'Сладка',       abv: '14–16% алк.', honey: 2.0, water: 3.1, yeast: 5 },
//   { id: 'fruit',  cat: 'Експерт',   name: 'Плодова',      abv: '11–13% алк.', honey: 1.4, water: 3.3, yeast: 5 },
// ];

// function CalculatorSection() {
//   const [active, setActive] = useState(null);
//   const recipe = useMemo(() => RECIPES.find(r => r.id === active), [active]);
//   const okVolume = recipe ? (recipe.honey + recipe.water) <= 4.2 : true;

//   return (
//     <div className="mead-section active">
//       <div className="calc-card">
//         <div className="sec-label" style={{ marginBottom: '0.5rem' }}>Съотношения</div>
//         <h3 style={{
//           fontFamily: "'UniSans', sans-serif",
//           fontSize: '1.6rem',
//           color: 'var(--cream)',
//           textTransform: 'uppercase',
//           letterSpacing: '0.05em',
//           marginBottom: '0.4rem',
//         }}>Избери рецепта</h3>
//         <p style={{
//           color: 'var(--text)',
//           fontFamily: "'Cormorant Garamond', serif",
//           fontStyle: 'italic',
//           fontSize: '1.05rem',
//         }}>Съотношенията са пресметнати за нашия 5L буркан (max fill 4.2L).</p>

//         <div className="calc-grid">
//           {RECIPES.map((r) => (
//             <button
//               key={r.id}
//               className={`calc-recipe${active === r.id ? ' active' : ''}`}
//               onClick={() => setActive(r.id)}
//             >
//               <div className="r-cat">{r.cat}</div>
//               <div className="r-name">{r.name}</div>
//               <div className="r-abv">{r.abv}</div>
//             </button>
//           ))}
//         </div>

//         {recipe && (
//           <div className="calc-output" style={{ display: 'block' }}>
//             <div className="calc-ingredients">
//               <div className="calc-ing"><div className="iv">{recipe.honey} кг</div><div className="il">Мед</div></div>
//               <div className="calc-ing"><div className="iv">{recipe.water} л</div><div className="il">Вода</div></div>
//               <div className="calc-ing"><div className="iv">{recipe.yeast} г</div><div className="il">Дрожди</div></div>
//               <div className="calc-ing"><div className="iv">{(recipe.honey + recipe.water).toFixed(1)} л</div><div className="il">Обем</div></div>
//             </div>

//             <div className="calc-checks">
//               <div className={`calc-check ${okVolume ? 'ok' : 'warn'}`}>
//                 <span className="ico">{okVolume ? '✓' : '!'}</span>
//                 <span>Обем <b>{okVolume ? 'в норма' : 'твърде голям'}</b> за 5L буркан.</span>
//               </div>
//               <div className="calc-check ok">
//                 <span className="ico">✓</span>
//                 <span>Очаквана сила: <b>{recipe.abv}</b>.</span>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
