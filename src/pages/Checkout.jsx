import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../hooks/useShop';
import { formatPrice } from '../utils/formatPrice';
import { saveDemoOrder } from '../utils/orderStorage';

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
};

function Checkout() {
  const { cartItems, subtotal, clearCart } = useShop();
  const navigate = useNavigate();
  const submittingRef = useRef(false);

  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError('');
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (submittingRef.current) return;

    if (Object.values(form).some((value) => !value.trim())) {
      setError('Please complete every field with valid details.');
      return;
    }

    if (form.fullName.trim().length < 2) {
      setError('Please enter a name with at least two characters.');
      return;
    }

    if (form.address.trim().length < 10) {
      setError('Please enter a complete address of at least 10 characters.');
      return;
    }

    submittingRef.current = true;

    let order;

    try {
      order = saveDemoOrder(cartItems);
    } catch {
      submittingRef.current = false;
      setError(
        'The demo order could not be saved in this browser. Your cart has been kept.',
      );
      return;
    }

    clearCart();

    navigate(`/account?order=${encodeURIComponent(order.id)}`, {
      replace: true,
    });
  }

  if (cartItems.length === 0) {
    return (
      <section className="page-empty">
        <h1>Your cart is empty</h1>
        <p>Add a product before proceeding to checkout.</p>
        <Link className="primary-button" to="/shop">
          CONTINUE SHOPPING
        </Link>
      </section>
    );
  }

  return (
    <section className="home-section">
      <div className="section-heading">
        <h1 className="section-title">CHECKOUT</h1>
      </div>

      <p className="demo-notice">
        Demo checkout only. No payment is collected and no products will
        be shipped. Use sample contact details.
      </p>

      <div className="checkout-grid">
        <form
          className="checkout-form"
          onSubmit={handleSubmit}
          aria-describedby={error ? 'checkout-error' : undefined}
        >
          <h2>Delivery details</h2>

          <div className="checkout-fields">
            <div className="checkout-field field-full">
              <label htmlFor="checkout-name">Full name</label>
              <input
                id="checkout-name"
                name="fullName"
                autoComplete="name"
                value={form.fullName}
                onChange={handleChange}
                minLength={2}
                maxLength={80}
                required
              />
            </div>

            <div className="checkout-field">
              <label htmlFor="checkout-email">Email</label>
              <input
                id="checkout-email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                maxLength={254}
                required
              />
            </div>

            <div className="checkout-field">
              <label htmlFor="checkout-phone">Phone — 10 digits</label>
              <input
                id="checkout-phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                value={form.phone}
                onChange={handleChange}
                pattern="[6-9][0-9]{9}"
                maxLength={10}
                title="Enter a 10-digit Indian mobile number starting with 6, 7, 8 or 9."
                required
              />
            </div>

            <div className="checkout-field field-full">
              <label htmlFor="checkout-address">Address</label>
              <textarea
                id="checkout-address"
                name="address"
                autoComplete="street-address"
                value={form.address}
                onChange={handleChange}
                rows={3}
                minLength={10}
                maxLength={300}
                required
              />
            </div>

            <div className="checkout-field">
              <label htmlFor="checkout-city">City</label>
              <input
                id="checkout-city"
                name="city"
                autoComplete="address-level2"
                value={form.city}
                onChange={handleChange}
                maxLength={80}
                required
              />
            </div>

            <div className="checkout-field">
              <label htmlFor="checkout-state">State / Union territory</label>
              <input
                id="checkout-state"
                name="state"
                autoComplete="address-level1"
                value={form.state}
                onChange={handleChange}
                maxLength={80}
                required
              />
            </div>

            <div className="checkout-field">
              <label htmlFor="checkout-pincode">PIN code</label>
              <input
                id="checkout-pincode"
                name="pincode"
                inputMode="numeric"
                autoComplete="postal-code"
                value={form.pincode}
                onChange={handleChange}
                pattern="[1-9][0-9]{5}"
                maxLength={6}
                title="Enter a six-digit PIN code that does not start with zero."
                required
              />
            </div>
          </div>

          <p className="checkout-note">
            These details are only validated for this demo. They are not
            saved or sent to a server. Format validation does not verify
            an address or delivery availability.
          </p>

          {error && (
            <p className="form-error" id="checkout-error" role="alert">
              {error}
            </p>
          )}

          <button className="primary-button" type="submit">
            PLACE DEMO ORDER
          </button>
        </form>

        <aside className="checkout-summary" aria-labelledby="summary-title">
          <h2 id="summary-title">Order summary</h2>

          <div className="checkout-summary-items">
            {cartItems.map(({ product, size, quantity }) => (
              <div
                className="checkout-summary-item"
                key={`${product.id}-${size}`}
              >
                <div>
                  <h3>{product.name}</h3>
                  <p>Size {size} · Qty {quantity}</p>
                </div>

                <strong>
                  {formatPrice(product.price * quantity)}
                </strong>
              </div>
            ))}
          </div>

          <div className="checkout-total-row">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <div className="checkout-total-row">
            <span>Shipping — demo</span>
            <span>{formatPrice(0)}</span>
          </div>

          <div className="checkout-total-row checkout-grand-total">
            <strong>Total</strong>
            <strong>{formatPrice(subtotal)}</strong>
          </div>

          <p className="checkout-note">
            Shipping is set to ₹0 for demonstration. No payment required.
          </p>
        </aside>
      </div>
    </section>
  );
}

export default Checkout;