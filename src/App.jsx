import { Link, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import CartDrawer from './components/CartDrawer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Wishlist from './pages/Wishlist';
import ProductDetails from './pages/ProductDetails';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import Offers from './pages/Offers';
import Help from './pages/Help';
import About from './pages/About';
import Checkout from './pages/Checkout';
import Account from './pages/Account';

function App() {
  return (
    <>
      <ScrollToTop />
      <Header />

      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/search" element={<Shop />} />
          <Route path="/collections" element={<Shop />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/offers" element={<Offers />} />
<Route path="/help" element={<Help />} />
<Route path="/about" element={<About />} />
<Route path="/checkout" element={<Checkout />} />
<Route path="/account" element={<Account />} />

          <Route
            path="*"
            element={
              <section className="page-empty">
                <h1>Page not found</h1>
                <p>The page you requested is not available.</p>
                <Link className="primary-button" to="/">
                  BACK TO HOME
                </Link>
              </section>
            }
          />
        </Routes>
      </main>
<Newsletter />
<Footer />
      <CartDrawer />
    </>
  );
}

export default App;