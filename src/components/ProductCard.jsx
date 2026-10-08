import { useId, useState } from 'react';
import { Heart, ChevronDown } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import { useShop } from '../hooks/useShop';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  const { wishlist, toggleWishlist, addToCart } = useShop();
  const [showSizes, setShowSizes] = useState(false);
  const [size, setSize] = useState('');
  const sizeId = useId();

  const isWishlisted = wishlist.includes(product.id);

  function handleSubmit(event) {
    event.preventDefault();

    if (addToCart(product.id, size)) {
      setShowSizes(false);
    }
  }

  return (
    <article className="product-card">
      <div className="product-image">
       <Link
  className="product-image-link"
  to={`/products/${product.id}`}
  aria-label={`View ${product.name}`}
>
  <img
    src={product.image}
    alt={product.name}
    width="600"
    height="730"
    loading="lazy"
    decoding="async"
  />
</Link>

        {product.isNew && (
          <span className="product-badge">NEW</span>
        )}

        <button
          className={`wishlist-button ${
            isWishlisted ? 'is-active' : ''
          }`}
          type="button"
          aria-label={`${isWishlisted ? 'Remove' : 'Save'} ${
            product.name
          } ${isWishlisted ? 'from' : 'to'} wishlist`}
          aria-pressed={isWishlisted}
          onClick={() => toggleWishlist(product.id)}
        >
          <Heart
            size={18}
            fill={isWishlisted ? 'currentColor' : 'none'}
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="product-info">
       <h3>
  <Link to={`/products/${product.id}`}>
    {product.name}
  </Link>
</h3>

        <p className="product-price">
          {formatPrice(product.price)}
        </p>

        {showSizes ? (
          <form className="size-form" onSubmit={handleSubmit}>
<label htmlFor={sizeId}>
  Select {product.sizeLabel || 'waist size'}
</label>
           <div className="select-wrapper">
  <select
    id={sizeId}
    value={size}
    onChange={(event) => setSize(event.target.value)}
    required
  >
    <option value="">Choose size</option>

    {product.sizes.map((value) => (
      <option key={value} value={value}>
        {value}
      </option>
    ))}
  </select>

  <ChevronDown
    className="select-arrow"
    size={18}
    aria-hidden="true"
  />
</div>

            <button className="add-to-cart-button" type="submit">
              CONFIRM & ADD
            </button>

            <button
              className="plain-button"
              type="button"
              onClick={() => setShowSizes(false)}
            >
              Cancel
            </button>
          </form>
        ) : (
          <button
            className="add-to-cart-button"
            type="button"
            aria-label={`Choose size for ${product.name}`}
            onClick={() => setShowSizes(true)}
          >
            ADD TO CART
          </button>
        )}
      </div>
    </article>
  );
}

export default ProductCard;