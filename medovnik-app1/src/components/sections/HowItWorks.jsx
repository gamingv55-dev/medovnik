import { HONEY_SVG, YEAST_SVG, FERMENT_SVG, BOTTLE_SVG } from '../../data/stepIllustrations';

/**
 * "Как работи" — 4-step grid with the animated SVG illustrations.
 * Heading + body, then four <Step /> cards.
 */
export default function HowItWorks() {
  return (
    <div className="how-bg" id="how">
      <div className="sec">
        <div className="sec-label">Как работи</div>
        <h2 className="sec-h2">
          4 стъпки до твоята <span className="h2-accent">първа медовина</span>
        </h2>
        <p className="sec-body">
          Без химия, без опит, без скъпо оборудване. Само следваш наръчника
          и природата свърши останалото.
        </p>

        <div className="steps">
          <Step
            svg={HONEY_SVG}
            num="01" day="Ден 1"
            title="Добавяш мед и вода"
            desc="Разтваряш меда в хладка вода в 5-литровия съд. Пропорцията определя силата и вкуса на медовината."
            descSize={20} descWeight={500}
          />
          <Step
            svg={YEAST_SVG}
            num="02" day="Ден 1-2"
            title="Слагаш дрождите"
            desc="Малките организми се събуждат и започват да хапят захарта. Те ще работят за теб следващите седмици."
            descSize={20}
          />
          <Step
            svg={FERMENT_SVG}
            num="03" day="Ден 3-25"
            title="Ферментацията тече"
            desc="Дрождите превръщат захарта в алкохол. Виждаш как мехурчетата излизат през въздушния клапан."
            descSize={20}
          />
          <Step
            svg={BOTTLE_SVG}
            num="04" day="Ден 30+"
            title="Бутилираш и опитваш"
            desc="Прехвърляш медовината в бутилки за вторична ферментация. След няколко дни е готова за наздравица."
            descSize={20}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * One step card. SVG is injected as raw HTML to preserve the
 * exact attributes that the CSS keyframes hook into.
 */
function Step({ svg, num, day, title, desc, descSize = 16, descWeight }) {
  return (
    <div className="step">
      <div
        className="step-illustration"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
      <div className="step-n">{num}</div>
      <div className="step-day">{day}</div>
      <div className="step-title">{title}</div>
      <div
        className="step-desc"
        style={{
          fontFamily: '"Cormorant Garamond"',
          fontWeight: descWeight,
          fontSize: descSize,
        }}
      >{desc}</div>
    </div>
  );
}
