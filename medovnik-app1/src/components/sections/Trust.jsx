/**
 * Trust strip — four headline stats sandwiched between hairlines.
 */
export default function Trust() {
  return (
    <div className="trust">
      <div className="trust-inner">
        <Stat num="2,400+" label={<>Домашни<br />варители</>} />
        <div className="trust-div" />
        <Stat num="30"     label={<>Дни до<br />първата партида</>} />
        <div className="trust-div" />
        <Stat num="4.9★"   label={<>Средна оценка<br />от клиенти</>} />
        <div className="trust-div" />
        <Stat num="0"      label={<>Опит<br />необходим</>} />
      </div>
    </div>
  );
}

function Stat({ num, label }) {
  return (
    <div className="trust-item">
      <div className="trust-num">{num}</div>
      <div className="trust-lbl">{label}</div>
    </div>
  );
}
