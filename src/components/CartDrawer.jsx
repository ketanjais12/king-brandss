import { useEffect, useRef } from 'react';
import { Minus, Plus, ShoppingBag, X, Trash2 } from 'lucide-react';
import { useShop } from '../hooks/useShop';
import { formatPrice } from '../utils/formatPrice';
import { Link } from 'react-router-dom';

function CartDrawer() {
  const dialogRef = useRef(null);

  const {
    cartItems,
    cartCount,
    subtotal,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
  } = useShop();

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!isCartOpen) {
      if (dialog.open) dialog.close();
      return;
    }

    if (!dialog.open) dialog.showModal();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, [isCartOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="cart-dialog"
      aria-labelledby="cart-title"
      onCancel={(event) => {
        event.preventDefault();
        setIsCartOpen(false);
      }}
    >
      <div className="cart-header">
        <h2 id="cart-title">YOUR CART ({cartCount})</h2>

        <button
          className="icon-button"
          type="button"
          aria-label="Close cart"
          onClick={() => setIsCartOpen(false)}
        >
          <X size={24} aria-hidden="true" />
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <ShoppingBag size={44} aria-hidden="true" />
          <h3>Your cart is empty</h3>
          <p>Add something you like to get started.</p>

          <button
            className="primary-button"
            type="button"
            onClick={() => setIsCartOpen(false)}
          >
            CONTINUE SHOPPING
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(({ product, productId, size, quantity }) => (
              <article
                className="cart-item"
                key={`${productId}-${size}`}
              >
                <img src={product.image} alt={product.name} />

                <div className="cart-item-details">
                  <h3>{product.name}</h3>
                  <p>Size: {size}</p>
                  <p>{formatPrice(product.price)} each</p>

                  <div className="quantity-control">
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${product.name}, size ${size}`}
                      disabled={quantity === 1}
                      onClick={() =>
                        updateQuantity(productId, size, quantity - 1)
                      }
                    >
                      <Minus size={14} aria-hidden="true" />
                    </button>

                    <span aria-live="polite">{quantity}</span>

                    <button
                      type="button"
                      aria-label={`Increase quantity of ${product.name}, size ${size}`}
                      disabled={quantity === 10}
                      onClick={() =>
                        updateQuantity(productId, size, quantity + 1)
                      }
                    >
                      <Plus size={14} aria-hidden="true" />
                    </button>
                  </div>

                  <div className="cart-item-bottom">
                    <strong>
                      {formatPrice(product.price * quantity)}
                    </strong>

                   <button
  className="icon-button cart-delete-button"
  type="button"
  aria-label={`Remove ${product.name}, size ${size}`}
  title="Remove item"
  onClick={() => removeFromCart(productId, size)}
>
  <Trash2 size={18} aria-hidden="true" />
</button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="cart-summary">
            <div className="cart-subtotal" aria-live="polite">
              <span>SUBTOTAL</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>

            <p>Shipping calculated at checkout. Maximum 10 per size.</p>
<Link
  className="primary-button checkout-link"
  to="/checkout"
  onClick={() => setIsCartOpen(false)}
>
  PROCEED TO CHECKOUT
</Link>
            <button
              className="primary-button"
              type="button"
              onClick={() => setIsCartOpen(false)}
            >
              CONTINUE SHOPPING
            </button>
          </div>
        </>
      )}
    </dialog>
  );
}

export default CartDrawer;