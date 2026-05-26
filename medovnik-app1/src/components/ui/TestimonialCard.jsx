import { AVATAR_ICONS } from './Icons';

export default function TestimonialCard({ testimonial }) {
  const AvatarIcon = AVATAR_ICONS[testimonial.avatar];
  return (
    <article className="testi">
      <div className="stars">★★★★★</div>
      <div className="testi-text">"{testimonial.text}"</div>
      <div className="testi-author">
        <div className="author-av">{AvatarIcon ? <AvatarIcon size={44} /> : testimonial.avatar}</div>
        <div>
          <div className="author-name">{testimonial.author}</div>
          <div className="author-detail">{testimonial.detail}</div>
        </div>
      </div>
    </article>
  );
}
