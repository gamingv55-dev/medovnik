import { useState } from 'react';
// import { useAuth } from '../context/AuthContext';
import { TESTIMONIALS } from '../data/testimonials';
import TestimonialCard from '../components/ui/TestimonialCard';

/**
 * Reviews page. Shows all testimonials and an auth-gated form
 * for submitting a new one. Logged-out users see a login wall.
 */
export default function ReviewsPage() {
  const [reviews, setReviews] = useState(TESTIMONIALS);

  return (
    <div style={{ paddingTop: '8rem', background: 'var(--bark)', minHeight: '100vh' }}>
      <div className="sec" style={{ paddingTop: '2rem' }}>
        <div className="sec-label">Обратна връзка</div>
        <h2 className="sec-h2">
          Те вече са го <span className="h2-accent">направили</span>
        </h2>
        <p className="sec-body" style={{ marginBottom: '4rem' }}>
          Реални хора, реални партиди, реален вкус. Ето какво казват нашите варители.
        </p>

        <div className="testi-grid">
          {reviews.map((t) => <TestimonialCard key={t.id} testimonial={t} />)}
        </div>

      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────── */

function ReviewForm({ onPost }) {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [text, setText]     = useState('');
  const [msg, setMsg]       = useState({ kind: '', text: '' });

  function submit() {
    const trimmed = text.trim();
    if (!trimmed) {
      setMsg({ kind: 'error', text: 'Напиши няколко изречения.' });
      return;
    }
    onPost({
      id: 'u' + Date.now(),
      text: trimmed,
      author: user.displayName || user.email,
      detail: 'Нов отзив · ' + new Date().toLocaleDateString('bg-BG'),
      avatar: '⭐',
      rating,
    });
    setText('');
    setMsg({ kind: 'success', text: 'Благодарим! Отзивът ти е публикуван.' });
  }

  return (
    <div className="review-form" style={{ display: 'block' }}>
      <h3>Сподели своя опит</h3>
      <div className="rf-user">
        {user.photoURL
          ? <img src={user.photoURL} alt="" referrerPolicy="no-referrer" />
          : <div style={avatarFallback}>{(user.displayName || user.email || '?')[0]}</div>
        }
        <div className="rf-name">{user.displayName || user.email}</div>
      </div>

      <div className="rf-stars">
        {[1,2,3,4,5].map((n) => (
          <button
            key={n}
            type="button"
            className={`rf-star${n <= rating ? ' lit' : ''}`}
            onClick={() => setRating(n)}
            aria-label={`${n} ${n === 1 ? 'звезда' : 'звезди'}`}
          >★</button>
        ))}
      </div>

      <textarea
        placeholder="Разкажи как мина първата ти партида…"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="rf-foot">
        <div className={`rf-msg ${msg.kind}`}>{msg.text}</div>
        <button className="btn-primary" type="button" onClick={submit}>
          Публикувай отзив
        </button>
      </div>
    </div>
  );
}

function LoginWall({ onClick }) {
  return (
    <div className="login-wall" style={{ display: 'block' }}>
      <div className="lw-ico">✍️</div>
      <h3>Сподели своя опит</h3>
      <p>Влез в профила си, за да публикуваш отзив. Профилната ти снимка и името ще се появят автоматично.</p>
      <button className="btn-primary" onClick={onClick}>Влез с Google</button>
    </div>
  );
}

const avatarFallback = {
  width: 36, height: 36, borderRadius: '50%',
  background: 'linear-gradient(135deg,#b8621a,#d4831f)',
  color: '#080603', display: 'flex',
  alignItems: 'center', justifyContent: 'center',
  fontFamily: 'UniSans, sans-serif', fontWeight: 900,
};
