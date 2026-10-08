import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { readOrders } from '../utils/orderStorage';
import { formatPrice } from '../utils/formatPrice';

function loadHistory() {
  try {
    return { orders: readOrders(), error: '' };
  } catch {
    return {
      orders: [],
      error: 'Order history could not be read from this browser.',
    };
  }
}

function formatDate(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return 'Date unavailable';

  return date.toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

function Account() {
  const [history, setHistory] = useState(loadHistory);
  const [searchParams] = useSearchParams();

  const confirmedOrder = history.orders.find(
    (order) => order.id === searchParams.get('order'),
  );

  return (
    <section className="home-section account-page">
      {confirmedOrder && (
        <div className="order-confirmation" role="status">
          <CheckCircle2 size={28} aria-hidden="true" />
          <div>
            <h2>Demo order saved</h2>
            <p>
              Reference: {confirmedOrder.id}. No payment was taken and
              nothing will be shipped.
            </p>
          </div>
        </div>
      )}

      <div className="section-heading">
        <h1 className="section-title">YOUR DEMO ORDERS</h1>
        <Link className="text-link" to="/shop">
          SHOP →
        </Link>
      </div>

      <p className="account-description">
        Orders saved in this browser only. No sign-in is required.
        Clearing browser data removes this history.
      </p>

      {history.error ? (
        <div className="page-empty">
          <p role="alert">{history.error}</p>
          <button
            className="primary-button"
            type="button"
            onClick={() => setHistory(loadHistory())}
          >
            TRY AGAIN
          </button>
        </div>
      ) : history.orders.length === 0 ? (
        <div className="page-empty">
          <h2>No orders yet</h2>
          <p>Complete the demo checkout to see your order here.</p>
          <Link className="primary-button" to="/shop">
            EXPLORE PRODUCTS
          </Link>
        </div>
      ) : (
        <div className="order-list">
          {history.orders.map((order) => (
            <article className="order-card" key={order.id}>
              <div className="order-card-heading">
                <div>
                  <h2>{order.id}</h2>
                  <p>{formatDate(order.createdAt)}</p>
                </div>
                <span className="order-status">DEMO ORDER</span>
              </div>

              <ul className="order-products">
                {order.items.map((item, index) => (
                  <li key={`${item.productId}-${item.size}-${index}`}>
                    <div>
                      <strong>{item.name}</strong>
                      <p>Size {item.size} · Qty {item.quantity}</p>
                    </div>
                    <span>
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="checkout-total-row checkout-grand-total">
                <strong>Total</strong>
                <strong>{formatPrice(order.total)}</strong>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Account;