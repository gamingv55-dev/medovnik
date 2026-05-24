import { useState } from 'react';
import { FAQS } from '../../data/faqs';

/**
 * FAQ accordion. Only one item open at a time to match the
 * single-question rhythm of the original page.
 */
export default function FAQ() {
  const [openIdx, setOpen] = useState(null);

  return (
    <div id="faq" style={{ background: 'linear-gradient(180deg, var(--ink) 0%, #100a04 100%)' }}>
      <div className="sec">
        <div className="sec-label">FAQ</div>
        <h2 className="sec-h2">
          Често задавани <span className="h2-accent">въпроси</span>
        </h2>

        <div className="faq-list">
          {FAQS.map((f, i) => {
            const open = openIdx === i;
            return (
              <div className={`faq-item${open ? ' open' : ''}`} key={i}>
                <div
                  className="faq-q"
                  onClick={() => setOpen(open ? null : i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(open ? null : i); } }}
                >
                  <div className="faq-question">{f.q}</div>
                  <div className="faq-icon">+</div>
                </div>
                <div className="faq-a">
                  <div className="faq-answer">{f.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
