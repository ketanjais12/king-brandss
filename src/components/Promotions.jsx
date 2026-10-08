import { Link } from 'react-router-dom';
import { products } from '../data/products';

const promotions = [
  {
    id: 'denim',
    eyebrow: 'EXPLORE DENIM',
    title: 'COMFORT THAT LOOKS BETTER',
    image: '/images/hero-denim.jpg',
    to: '/shop?category=jeans',
  },
  {
    id: 'new',
    eyebrow: 'JUST LANDED',
    title: 'NEW DROP',
    image: products[1].image,
    to: '/shop?collection=new',
    red: true,
  },
  {
  id: 'tshirts',
  eyebrow: 'EVERYDAY ESSENTIALS',
  title: 'FRESH TEES. EVERYDAY STYLE.',
  image: '/images/products/promotion-tshirts.jpg',
  to: '/shop?category=t-shirts',
},
];

function Promotions() {
  return (
    <section
      className="promotions"
      id="offers"
      aria-label="Featured collections"
    >
      {promotions.map((promotion) => (
        <article
          className={`promotion-card ${promotion.red ? 'promotion-red' : ''}`}
          key={promotion.id}
        >
          <img
            src={promotion.image}
            alt=""
            width="600"
            height="400"
            loading="lazy"
            decoding="async"
          />

          <div className="promotion-content">
            <p>{promotion.eyebrow}</p>
            <h2>{promotion.title}</h2>

            <Link
              className="promotion-button"
              to={promotion.to}
              aria-label={`Shop ${promotion.title.toLowerCase()}`}
            >
              SHOP NOW
            </Link>
          </div>
        </article>
      ))}
    </section>
  );
}

export default Promotions;