import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Search,
  UserRound,
  Heart,
  ShoppingCart,
} from 'lucide-react';
import { useShop } from '../hooks/useShop';

const navigation = [
  { label: 'Home', href: '/' },
  { label: 'New Arrivals', href: '/shop?collection=new' },
  { label: 'Jeans', href: '/shop?category=jeans' },
  { label: 'Topwear', href: '/shop?category=topwear' },
  { label: 'Bottomwear', href: '/shop?category=bottomwear' },
  { label: 'Collections', href: '/collections' },
  { label: 'Offers', href: '/offers' },
  {
  label: 'My Orders',
  href: '/account',
  mobileOnly: true,
},
];

function Header() {
  const location = useLocation();
  const { cartCount, wishlist, setIsCartOpen } = useShop();

  // Recording the location also closes the menu on Back/Forward.
  const [menuLocation, setMenuLocation] = useState(null);
  const menuOpen = menuLocation === location.key;

  function closeMenu() {
    setMenuLocation(null);
  }

  useEffect(() => {
    if (!menuOpen) return;

    function handleEscape(event) {
      if (event.key === 'Escape') {
        setMenuLocation(null);
        document.getElementById('mobile-menu-toggle')?.focus();
      }
    }

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [menuOpen]);

  function isActive(href) {
    const [pathname, search = ''] = href.split('?');

    if (location.pathname !== pathname) return false;

    const current = new URLSearchParams(location.search);
    const target = new URLSearchParams(search);

    return (
      current.get('category') === target.get('category') &&
      current.get('collection') === target.get('collection')
    );
  }

  function renderNavigation() {
    return navigation.map((item) => (
      <Link
        className={item.mobileOnly ? 'mobile-only-link' : undefined}
        key={item.label}
        to={item.href}
        aria-current={isActive(item.href) ? 'page' : undefined}
        onClick={closeMenu}
      >
        {item.label}
      </Link>
    ));
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <div className="announcement-bar" role="region" aria-label="Store announcements" tabIndex={0}>
        <div className="announcement-track">
          <div className="announcement-group">
            <span>ALL OVER INDIA SHIPPING</span>
            <span>NO COD | ALL PAYMENT METHODS ACCEPTED</span>
            <a href="tel:+919769009076">FOR INQUIRY: +91 97690 09076</a>
          </div>
          <div className="announcement-group announcement-copy" aria-hidden="true">
            <span>ALL OVER INDIA SHIPPING</span>
            <span>NO COD | ALL PAYMENT METHODS ACCEPTED</span>
            <a href="tel:+919769009076" tabIndex={-1}>FOR INQUIRY: +91 97690 09076</a>
          </div>
        </div>
      </div>

      <header className="site-header">
        <div className="header-inner">
          <button
            id="mobile-menu-toggle"
            className="icon-button mobile-menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() =>
              setMenuLocation(menuOpen ? null : location.key)
            }
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <Link
            className="brand-link"
            to="/"
            aria-label="KING BRANDSS home"
            onClick={closeMenu}
          >
            <img
              className="brand-logo"
              src="/images/logo.jpg"
              alt="KING BRANDSS — The Perfect Man Shop"
              width="160"
              height="96"
            />
          </Link>

          <nav
            className="desktop-navigation"
            aria-label="Main navigation"
          >
            {renderNavigation()}
          </nav>

          <div className="header-actions">
            <Link
              className="icon-button"
              to="/search"
              aria-label="Search"
              onClick={closeMenu}
            >
              <Search size={21} />
            </Link>

            <Link
              className="icon-button account-link"
              to="/account"
              aria-label="My account"
              onClick={closeMenu}
            >
              <UserRound size={21} />
            </Link>

            <Link
              className="icon-button"
              to="/wishlist"
              aria-label={`Wishlist, ${wishlist.length} saved products`}
              onClick={closeMenu}
            >
              <Heart size={21} />

              {wishlist.length > 0 && (
                <span className="cart-count" aria-hidden="true">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button
              className="icon-button cart-link"
              type="button"
              aria-label={`Shopping cart, ${cartCount} items`}
              onClick={() => {
                closeMenu();
                setIsCartOpen(true);
              }}
            >
              <ShoppingCart size={21} />
              <span className="cart-count" aria-hidden="true">
                {cartCount}
              </span>
            </button>
          </div>
        </div>

        <nav
          id="mobile-navigation"
          className="mobile-navigation"
          aria-label="Mobile navigation"
          hidden={!menuOpen}
        >
          {renderNavigation()}
        </nav>
      </header>
    </>
  );
}

export default Header;