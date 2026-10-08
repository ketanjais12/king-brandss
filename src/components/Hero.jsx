import { ArrowRight } from 'lucide-react';

function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">THE PERFECT MAN SHOP</p>

        <h1 id="hero-title">
          KING
          <span>BRANDSS</span>
        </h1>

        <p className="hero-description">
          Trending styles. Premium quality. Best prices.
        </p>

        <a className="primary-button" href="#categories">
          SHOP NOW
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>

      <div className="hero-image">
        <img
          src="/images/hero-denim.jpg"
          alt="Collection of blue denim jeans"
          width="1200"
          height="1000"
          fetchPriority="high"
        />

        <div className="hero-label">
          <strong>DENIM</strong>
          <span>BUILT TO<br />STAND OUT</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;