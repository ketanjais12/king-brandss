import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { products } from '../data/products';
import { useShop } from '../hooks/useShop';
import { formatPrice } from '../utils/formatPrice';

function ProductContent({ product }) {
  const { addToCart, wishlist, toggleWishlist } = useShop();
  const [selectedSize, setSelectedSize] = useState('');
  const [error, setError] = useState('');

  const isWishlisted = wishlist.includes(product.id);

  function handleAddToCart(event) {
    event.preventDefault();

    if (!selectedSize) {
      setError('Please select a size.');
      return;
    }

    setError('');
    addToCart(product.id, selectedSize);
  }

  return (
    <section className="home-section product-details-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/shop">Shop</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{product.name}</span>
      </nav>

      <div className="product-details-grid">
        <div className="product-detail-image">
          <img
            src={product.image}
            alt={product.name}
            width="600"
            height="730"
            fetchPriority="high"
          />
        </div>

        <div className="product-detail-info">
          <p className="eyebrow">KING BRANDSS</p>

          <h1>{product.name}</h1>

          <p className="detail-price">
            {formatPrice(product.price)}
          </p>

          <p className="detail-description">
            {product.description ||
              'Explore this style from the KING BRANDSS collection. Choose your preferred size to add it to your bag.'}
          </p>

          <form className="product-purchase-form" onSubmit={handleAddToCart}>
            <fieldset
              className="size-fieldset"
              aria-describedby={error ? 'size-error' : undefined}
            >
<legend>
  SELECT {(product.sizeLabel || 'waist size').toUpperCase()}
</legend>
              <div className="size-options">
                {product.sizes.map((size) => (
                  <label className="size-option" key={size}>
                    <input
                      type="radio"
                      name="product-size"
                      value={size}
                      checked={selectedSize === size}
                      onChange={() => {
                        setSelectedSize(size);
                        setError('');
                      }}
                    />
                    <span>{size}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {error && (
              <p className="form-error" id="size-error" role="alert">
                {error}
              </p>
            )}

            <button className="primary-button detail-add" type="submit">
              ADD TO CART
            </button>
          </form>

          <button
            className={`detail-wishlist ${
              isWishlisted ? 'is-active' : ''
            }`}
            type="button"
            aria-pressed={isWishlisted}
            onClick={() => toggleWishlist(product.id)}
          >
            <Heart
              size={19}
              fill={isWishlisted ? 'currentColor' : 'none'}
              aria-hidden="true"
            />
            {isWishlisted ? 'SAVED TO WISHLIST' : 'SAVE TO WISHLIST'}
          </button>

          <div className="product-information">
            <details open>
              <summary>Product details</summary>
              <dl>
                <div>
                  <dt>Category</dt>
                  <dd>{product.category}</dd>
                </div>
                <div>
                  <dt>Available sizes</dt>
                  <dd>{product.sizes.join(', ')}</dd>
                </div>
                <div>
                  <dt>Product code</dt>
                  <dd>{product.id}</dd>
                </div>
              </dl>
            </details>

            <details>
              <summary>Need help choosing?</summary>
              <p>
                For sizing and product enquiries, call{' '}
                <a href="tel:+919769009076">+91 97690 09076</a>.
              </p>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductDetails() {
  const { productId } = useParams();
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return (
      <section className="page-empty">
        <h1>Product not found</h1>
        <p>This product is not available in the current collection.</p>
        <Link className="primary-button" to="/shop">
          EXPLORE PRODUCTS
        </Link>
      </section>
    );
  }

  return <ProductContent key={product.id} product={product} />;
}

export default ProductDetails;