import { Link } from 'react-router-dom';

const MEM_CSS = `
.mem * { box-sizing: border-box; }
.mem {
  background: #080603;
  padding: 2.8rem clamp(1.5rem,4vw,3.5rem);
}
.mem-inner {
  max-width: 1300px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: clamp(2.5rem, 4.5vw, 5rem);
  align-items: center;
}

.mem-label {
  font-family: 'UniSans', sans-serif;
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #d4831f;
  margin-bottom: 1rem;
}

.mem-h2 {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 600;
  font-size: clamp(1.7rem, 3.2vw, 2.7rem);
  color: #faf3e0;
  line-height: 1.15;
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
}
.mem-accent {
  background: linear-gradient(135deg, #f2c84e 0%, #b8621a 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.mem-text {
  font-family: 'Manrope', 'Cormorant Garamond', sans-serif;
  font-size: clamp(0.88rem, 1vw, 0.97rem);
  color: #b8997a;
  line-height: 1.7;
  margin-bottom: 1.8rem;
  max-width: 360px;
}

.mem-btn {
  display: inline-block;
  font-family: 'UniSans', sans-serif;
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #d4831f;
  border: 1px solid rgba(212,131,31,0.45);
  border-radius: 3px;
  padding: 0.75rem 1.7rem;
  text-decoration: none;
  transition: background 0.25s, border-color 0.25s;
  white-space: nowrap;
}
.mem-btn:hover {
  background: rgba(212,131,31,0.1);
  border-color: rgba(212,131,31,0.8);
}

.mem-photos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(0.5rem, 0.8vw, 0.9rem);
}
.mem-photo {
  width: 100%;
  aspect-ratio: 2 / 3;
  object-fit: cover;
  border-radius: 10px;
  display: block;
}

@media (max-width: 960px) {
  .mem-inner { grid-template-columns: 1fr; gap: 2.5rem; }
  .mem-text { max-width: 100%; }
}
@media (max-width: 500px) {
  .mem-photos { grid-template-columns: 1fr; }
  .mem-photo { aspect-ratio: 16 / 9; }
}
`;

export default function Memories() {
  return (
    <section className="mem">
      <style>{MEM_CSS}</style>
      <div className="mem-inner">
        <div>
          <div className="mem-label">Повече от питие</div>
          <h2 className="mem-h2">
            Създаваш спомени,<br />
            които <span className="mem-accent">остават</span>
          </h2>
          <p className="mem-text">
            Медовината е повод да забавиш темпото и да събереш хората около себе
            си. За разговори, смях и истински моменти.
          </p>
          <Link className="mem-btn" to="/shop">Разгледай комплектите</Link>
        </div>

        <div className="mem-photos">
          <img className="mem-photo" src="/why-friends.webp" alt="" loading="lazy" />
          <img className="mem-photo" src="/why-emotion.webp" alt="" loading="lazy" />
          <img className="mem-photo" src="/kit1.webp"        alt="" loading="lazy" />
        </div>
      </div>
    </section>
  );
}
