import { Link } from 'react-router-dom';

function Help() {
  return (
    <section className="home-section information-page">
      <h1 className="section-title">CUSTOMER CARE</h1>

      <section className="information-section">
        <h2>Contact us</h2>
        <p>
          For product enquiries, call{' '}
          <a href="tel:+919769009076">+91 97690 09076</a>.
        </p>
      </section>

 <section className="information-section" id="orders">
  <h2>Order enquiries</h2>
  <p>
    Demo orders saved on this device are available in{' '}
    <Link to="/account">your order history</Link>.
    This demonstration does not place or track real orders.
    For a real KING BRANDSS order, contact the store directly.
  </p>
</section>

      <section className="information-section" id="returns">
        <h2>Returns & refunds</h2>
        <p>
          A detailed returns policy has not been supplied for this demo.
          Please confirm eligibility and timelines with the store before
          making a purchase.
        </p>
      </section>

      <section className="information-section" id="sizes">
        <h2>Size help</h2>
        <p>
          Available size options appear on each product page. The current
          sizes are sample data; contact the store to confirm measurements
          and fit.
        </p>
      </section>
    </section>
  );
}

export default Help;