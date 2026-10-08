import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { useShop } from '../hooks/useShop';

function Wishlist() {
  const { wishlist } = useShop();

  const savedProducts = products.filter((product) =>
    wishlist.includes(product.id),
  );

  return (
    <section className="home-section">
      <div className="section-heading">
        <h1 className="section-title">YOUR WISHLIST</h1>
        <span className="saved-count" role="status">
          {savedProducts.length} saved
        </span>
      </div>

      {savedProducts.length > 0 ? (
        <div className="product-grid">
          {savedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="page-empty">
          <Heart size={40} aria-hidden="true" />
          <h2>Your wishlist is empty</h2>
          <p>Tap the heart on a product to save it here.</p>

          <Link className="primary-button" to="/shop">
            EXPLORE PRODUCTS
          </Link>
        </div>
      )}
    </section>
  );
}

export default Wishlist;