import { HONEY_SVG, YEAST_SVG, FERMENT_SVG, BOTTLE_SVG } from '../../data/stepIllustrations';

const HIW_CSS = `
.hiw * { box-sizing: border-box; }
.hiw {
  background: linear-gradient(180deg, rgba(8,6,3,0.88) 0%, rgba(16,10,4,0.78) 50%, rgba(8,6,3,0.88) 100%), url('/background-proccess.webp') center/cover no-repeat;
  border-top: 1px solid rgba(184,98,26,0.12);
  border-bottom: 1px solid rgba(184,98,26,0.12);
  padding: 2.8rem clamp(1.5rem,4vw,3.5rem);
}
.hiw-inner { max-width: 1300px; margin: 0 auto; }
.hiw-intro { padding-left: clamp(1.5rem, 10vw, 9rem); margin-bottom: 2rem; }

.hiw-label {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 0.68rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: #d4831f;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.9rem;
}

.hiw-h2 {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 600;
  font-size: clamp(2.4rem, 5vw, 4rem);
  color: #faf3e0;
  line-height: 1.05;
  letter-spacing: -0.01em;
  margin-bottom: 0.7rem;
  font-variant-numeric: lining-nums;
  font-style: normal;
}
.hiw-accent {
  background: linear-gradient(135deg, #f2c84e 0%, #b8621a 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hiw-sub {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 400;
  font-size: clamp(1rem, 1.15vw, 1.15rem);
  color: #b8997a;
  line-height: 1.65;
  max-width: 520px;
}

.hiw-steps {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
  align-items: start;
}

.hiw-arrow {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0 clamp(0.5rem, 1.2vw, 1.2rem);
  padding-top: 84px;
  color: rgba(212,131,31,0.7);
  flex-shrink: 0;
}
.hiw-arrow svg { width: 22px; height: 22px; }

.hiw-step {
  min-width: 0;
  background: rgba(184,98,26,0.1);
  border: 1px solid rgba(212,131,31,0.25);
  border-radius: 12px;
  padding: clamp(1rem, 2vw, 1.6rem) clamp(0.8rem, 1.5vw, 1.2rem);
  backdrop-filter: blur(4px);
}

.hiw-n {
  font-family: 'UniSans', sans-serif;
  font-size: 0.82rem;
  color: #d4831f;
  letter-spacing: 0.2em;
  margin-bottom: 0.55rem;
}

.hiw-illus {
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}
.hiw-illus svg { max-width: 100%; max-height: 100%; }

.hiw-title {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: clamp(0.68rem, 0.82vw, 0.84rem);
  color: #faf3e0;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  line-height: 1.3;
  margin-bottom: 0.5rem;
}

.hiw-desc {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 400;
  font-size: clamp(0.95rem, 1.05vw, 1.05rem);
  color: #c7b08a;
  line-height: 1.6;
}

@media (max-width: 1024px) {
  .hiw-steps { grid-template-columns: 1fr 1fr; gap: 2.5rem 2rem; }
  .hiw-arrow { display: none; }
}
@media (max-width: 540px) {
  .hiw-steps { grid-template-columns: 1fr; gap: 2rem; }
}
`;

const STEPS = [
  { svg: HONEY_SVG,   num: '01', title: 'Добавяш мед и вода',  desc: 'Разтваряш меда в хладка вода в 5-литровия съд. Пропорцията определя силата и вкуса на медовината.' },
  { svg: YEAST_SVG,   num: '02', title: 'Слагаш дрождите',     desc: 'Малките организми се събуждат и започват да хапят захарта. Те ще работят за теб следващите седмици.' },
  { svg: FERMENT_SVG, num: '03', title: 'Ферментацията тече',  desc: 'Дрождите превръщат захарта в алкохол. Виждаш как мехурчетата излизат през въздушния клапан.' },
  { svg: BOTTLE_SVG,  num: '04', title: 'Бутилираш и опитваш', desc: 'Прехвърляш медовината в бутилки за вторична ферментация. След няколко дни е готова за наздравица.' },
];

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" /><path d="M13 6l6 6-6 6" />
  </svg>
);

export default function HowItWorks() {
  const items = [];
  STEPS.forEach(({ svg, num, title, desc }, i) => {
    items.push(
      <div className="hiw-step" key={num}>
        <div className="hiw-n">{num}</div>
        <div className="hiw-illus" dangerouslySetInnerHTML={{ __html: svg }} />
        <div className="hiw-title">{title}</div>
        <p className="hiw-desc">{desc}</p>
      </div>
    );
    if (i < STEPS.length - 1) {
      items.push(<div className="hiw-arrow" key={`arr-${i}`}><ArrowIcon /></div>);
    }
  });

  return (
    <div className="hiw" id="how">
      <style>{HIW_CSS}</style>
      <div className="hiw-inner">
        <div className="hiw-intro">
          <div className="hiw-label"><span>—</span><span>КАК РАБОТИ</span></div>
          <h2 className="hiw-h2">
            4 стъпки до<br />твоята <span className="hiw-accent">първа медовина</span>
          </h2>
          <p className="hiw-sub">
            Без химия, без опит, без скъпо оборудване. Само следваш наръчника
            и природата свърши останалото.
          </p>
        </div>
        <div className="hiw-steps">{items}</div>
      </div>
    </div>
  );
}
