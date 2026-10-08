import ProductCard from './ProductCard';
import { products } from '../data/products';
import { Link } from 'react-router-dom';

function NewArrivals() {
  const newArrivals = products
    .filter((product) => product.isNew)
    .slice(0, 6);

  return (
    <section
      className="home-section"
      id="new-arrivals"
      aria-labelledby="new-arrivals-title"
    >
      <div className="section-heading">
        <h2 className="section-title" id="new-arrivals-title">
          NEW ARRIVALS
        </h2>

        <Link className="text-link" to="/shop?collection=new">
  VIEW ALL →
</Link>
      </div>

      <div className="product-grid">
        {newArrivals.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default NewArrivals;