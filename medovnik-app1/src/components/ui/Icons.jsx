// Central SVG icon library — all icons use currentColor and accept size/className/style props

const S = (size) => ({ width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1.5', strokeLinecap: 'round', strokeLinejoin: 'round' });

export function CartIcon({ size = 22, className, style }) {
  return (
    <svg {...S(size)} className={className} style={style}>
      <circle cx="9" cy="21" r="1" fill="currentColor" stroke="none" />
      <circle cx="20" cy="21" r="1" fill="currentColor" stroke="none" />
      <path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6" />
    </svg>
  );
}

export function LockIcon({ size = 22, className, style }) {
  return (
    <svg {...S(size)} className={className} style={style}>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
      <circle cx="12" cy="16" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function HoneyJarIcon({ size = 22, className, style }) {
  return (
    <svg {...S(size)} className={className} style={style}>
      <path d="M9 3h6v2l1.5 2v11a2 2 0 01-2 2H9.5a2 2 0 01-2-2V7L9 5V3z" />
      <line x1="7.5" y1="7" x2="16.5" y2="7" />
      <path d="M10 12c0 1.1.9 2 2 2s2-.9 2-2" />
      <line x1="12" y1="14" x2="12" y2="16" />
    </svg>
  );
}

export function PhoneIcon({ size = 22, className, style }) {
  return (
    <svg {...S(size)} className={className} style={style}>
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 12a19.79 19.79 0 01-3.07-8.67A2 2 0 013.6 1.17h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L7.91 9.91a16 16 0 006.07 6.07l1.97-1.34a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

export function MailIcon({ size = 22, className, style }) {
  return (
    <svg {...S(size)} className={className} style={style}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

export function BoxIcon({ size = 22, className, style }) {
  return (
    <svg {...S(size)} className={className} style={style}>
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="3.27,6.96 12,12.01 20.73,6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

export function BookIcon({ size = 22, className, style }) {
  return (
    <svg {...S(size)} className={className} style={style}>
      <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
      <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
    </svg>
  );
}

export function HandshakeIcon({ size = 22, className, style }) {
  return (
    <svg {...S(size)} className={className} style={style}>
      <path d="M3 11l4-4 3 3 4-4 4 4" />
      <path d="M3 17l4-4 3 3 4-4 4 4" />
    </svg>
  );
}

export function TrophyIcon({ size = 22, className, style }) {
  return (
    <svg {...S(size)} className={className} style={style}>
      <path d="M8 21h8M12 17v4" />
      <path d="M7 4H4a1 1 0 00-1 1v3a5 5 0 005 5h1" />
      <path d="M17 4h3a1 1 0 011 1v3a5 5 0 01-5 5h-1" />
      <path d="M8 4h8v9a4 4 0 01-4 4 4 4 0 01-4-4V4z" />
    </svg>
  );
}

export function TargetIcon({ size = 22, className, style }) {
  return (
    <svg {...S(size)} className={className} style={style}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ScrollIcon({ size = 22, className, style }) {
  return (
    <svg {...S(size)} className={className} style={style}>
      <path d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
      <path d="M5 3a2 2 0 100 4 2 2 0 000-4z" />
      <path d="M19 3a2 2 0 100 4 2 2 0 000-4z" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="8" y1="16" x2="13" y2="16" />
    </svg>
  );
}

export function StarIcon({ size = 22, className, style }) {
  return (
    <svg {...S(size)} fill="currentColor" stroke="none" className={className} style={style}>
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

export function SparkleIcon({ size = 22, className, style }) {
  return (
    <svg {...S(size)} fill="currentColor" stroke="none" className={className} style={style}>
      <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z" />
    </svg>
  );
}

export function CrownIcon({ size = 22, className, style }) {
  return (
    <svg {...S(size)} className={className} style={style}>
      <path d="M2 19l3.5-11L12 14l6.5-6L22 19H2z" />
      <line x1="2" y1="19" x2="22" y2="19" />
      <circle cx="12" cy="14" r="1" fill="currentColor" stroke="none" />
      <circle cx="5.5" cy="8" r="1" fill="currentColor" stroke="none" />
      <circle cx="18.5" cy="8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FlaskIcon({ size = 22, className, style }) {
  return (
    <svg {...S(size)} className={className} style={style}>
      <path d="M9 3h6" />
      <path d="M10 3v5.5L5 16a2 2 0 001.8 2.9h10.4A2 2 0 0019 16l-5-7.5V3" />
      <path d="M7.5 14h9" />
    </svg>
  );
}

export function JarIcon({ size = 22, className, style }) {
  return (
    <svg {...S(size)} className={className} style={style}>
      <rect x="9" y="2" width="6" height="3" rx="1" />
      <path d="M7 5h10v1.5a4 4 0 011 2.6V20a2 2 0 01-2 2H8a2 2 0 01-2-2V9.1A4 4 0 017 6.5V5z" />
      <path d="M9.5 14c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5" />
    </svg>
  );
}

export function QuillIcon({ size = 22, className, style }) {
  return (
    <svg {...S(size)} className={className} style={style}>
      <path d="M20 4C12 4 4 12 4 20" />
      <path d="M4 20l4-1-3-3z" fill="currentColor" />
      <path d="M20 4c0 8-4 12-8 14" />
      <path d="M15 7c-2 3-4 7-4 10" />
    </svg>
  );
}

// ── Testimonial Avatars ──────────────────────────────────────

export function AvatarFarmerIcon({ size = 44, className, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" className={className} style={style}>
      <circle cx="22" cy="22" r="22" fill="rgba(184,98,26,0.18)" />
      <circle cx="22" cy="17" r="7" fill="rgba(242,200,78,0.25)" stroke="#b8621a" strokeWidth="1.2" />
      {/* Straw hat */}
      <ellipse cx="22" cy="13" rx="9" ry="2.5" fill="rgba(184,98,26,0.55)" stroke="#b8621a" strokeWidth="1" />
      <path d="M16 13 Q22 8 28 13" fill="rgba(184,98,26,0.4)" stroke="#b8621a" strokeWidth="1" />
      {/* Body */}
      <path d="M13 40 Q13 30 22 27 Q31 30 31 40" fill="rgba(242,200,78,0.18)" stroke="#b8621a" strokeWidth="1.2" />
    </svg>
  );
}

export function AvatarWomanIcon({ size = 44, className, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" className={className} style={style}>
      <circle cx="22" cy="22" r="22" fill="rgba(184,98,26,0.18)" />
      <circle cx="22" cy="17" r="7" fill="rgba(242,200,78,0.25)" stroke="#b8621a" strokeWidth="1.2" />
      {/* Hair */}
      <path d="M15 17 Q14 10 22 10 Q30 10 29 17" fill="rgba(184,98,26,0.5)" />
      <path d="M15 17 Q13 22 15 25" stroke="#b8621a" strokeWidth="1.2" fill="none" />
      <path d="M29 17 Q31 22 29 25" stroke="#b8621a" strokeWidth="1.2" fill="none" />
      {/* Body */}
      <path d="M13 40 Q13 30 22 27 Q31 30 31 40" fill="rgba(242,200,78,0.18)" stroke="#b8621a" strokeWidth="1.2" />
    </svg>
  );
}

export function AvatarBeardedIcon({ size = 44, className, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none" className={className} style={style}>
      <circle cx="22" cy="22" r="22" fill="rgba(184,98,26,0.18)" />
      <circle cx="22" cy="17" r="7" fill="rgba(242,200,78,0.25)" stroke="#b8621a" strokeWidth="1.2" />
      {/* Beard */}
      <path d="M15 19 Q15 27 22 27 Q29 27 29 19" fill="rgba(184,98,26,0.4)" stroke="#b8621a" strokeWidth="1" />
      {/* Mustache */}
      <path d="M18 20 Q20 22 22 21 Q24 22 26 20" stroke="#b8621a" strokeWidth="1.2" fill="none" />
      {/* Body */}
      <path d="M13 40 Q13 30 22 27 Q31 30 31 40" fill="rgba(242,200,78,0.18)" stroke="#b8621a" strokeWidth="1.2" />
    </svg>
  );
}

// Icon lookup by avatar type (for testimonials)
export const AVATAR_ICONS = {
  farmer:  AvatarFarmerIcon,
  woman:   AvatarWomanIcon,
  bearded: AvatarBeardedIcon,
};

// Icon lookup by product iconType (for cart items)
export const PRODUCT_ICONS = {
  jar:     JarIcon,
  flask:   FlaskIcon,
  crown:   CrownIcon,
  sparkle: SparkleIcon,
  box:     BoxIcon,
};
