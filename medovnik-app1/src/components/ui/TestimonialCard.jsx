/**
 * Single testimonial card. Stars are fixed at 5 to match the
 * original presentation; tweak if you start collecting ratings.
 */
export default function TestimonialCard({ testimonial }) {
  return (
    <article className="testi">
      <div className="stars">★★★★★</div>
      <div className="testi-text">"{testimonial.text}"</div>
      <div className="testi-author">
        <div className="author-av">{testimonial.avatar}</div>
        <div>
          <div className="author-name">{testimonial.author}</div>
          <div className="author-detail">{testimonial.detail}</div>
        </div>
      </div>
    </article>
  );
}
