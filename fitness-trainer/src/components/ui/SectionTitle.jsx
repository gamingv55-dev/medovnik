import './SectionTitle.css';

export default function SectionTitle({ label, title, subtitle, align = 'center' }) {
  return (
    <div className={`section-title section-title--${align}`}>
      {label && <span className="label-tag">{label}</span>}
      <h2 className="section-title__h2">{title}</h2>
      {subtitle && <p className="section-title__sub">{subtitle}</p>}
    </div>
  );
}
