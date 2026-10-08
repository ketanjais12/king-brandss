import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link to="/" aria-label="KING BRANDSS home">
            <img
              src="/images/logo.jpg"
              alt="KING BRANDSS — The Perfect Man Shop"
              width="160"
              height="120"
              loading="lazy"
            />
          </Link>
          <p>THE PERFECT MAN SHOP</p>
        </div>

        <div className="footer-column">
          <h2>QUICK LINKS</h2>
          <Link to="/">Home</Link>
          <Link to="/shop?collection=new">New Arrivals</Link>
          <Link to="/collections">Collections</Link>
          <Link to="/offers">Offers</Link>
        </div>

        <div className="footer-column">
          <h2>CUSTOMER CARE</h2>
          <Link to="/help">Contact Us</Link>
          <Link to="/help#orders">Order Enquiries</Link>
          <Link to="/help#returns">Returns & Refunds</Link>
          <Link to="/help#sizes">Size Help</Link>
        </div>

        <div className="footer-column">
          <h2>ABOUT US</h2>
          <Link to="/about">Our Story</Link>
          <Link to="/about#demo">About This Demo</Link>
          <Link to="/about#privacy">Privacy Information</Link>
        </div>

        <div className="footer-column">
          <h2>GET IN TOUCH</h2>
          <a href="tel:+919769009076">+91 97690 09076</a>
          <p>For product and sizing enquiries.</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} KING BRANDSS</p>
        <p>Front-end demonstration</p>
      </div>
    </footer>
  );
}

export default Footer;