import { useEffect, useState } from 'react';
import { ShopContext } from './ShopContext';
import { products } from '../data/products';

const STORAGE_KEY = 'king-brandss-shop-v1';

function readSavedShop() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

    const cart = Array.isArray(saved?.cart)
      ? saved.cart.filter((item) => {
          const product = products.find((p) => p.id === item?.productId);

          return (
            product &&
            product.sizes.includes(item.size) &&
            Number.isInteger(item.quantity) &&
            item.quantity >= 1 &&
            item.quantity <= 10
          );
        })
      : [];

    const wishlist = Array.isArray(saved?.wishlist)
      ? [...new Set(saved.wishlist)].filter((id) =>
          products.some((product) => product.id === id),
        )
      : [];

    return { cart, wishlist };
  } catch {
    return { cart: [], wishlist: [] };
  }
}

function ShopProvider({ children }) {
  const [shop, setShop] = useState(readSavedShop);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(shop));
    } catch {
      // Shopping remains available even when storage is blocked.
      console.warn('Shopping data could not be saved on this device.');
    }
  }, [shop]);

  function addToCart(productId, size) {
    const product = products.find((item) => item.id === productId);

    if (!product || !product.sizes.includes(size)) {
      return false;
    }

    setShop((previous) => {
      const existing = previous.cart.find(
        (item) => item.productId === productId && item.size === size,
      );

      const cart = existing
        ? previous.cart.map((item) =>
            item.productId === productId && item.size === size
              ? { ...item, quantity: Math.min(item.quantity + 1, 10) }
              : item,
          )
        : [...previous.cart, { productId, size, quantity: 1 }];

      return { ...previous, cart };
    });

    setIsCartOpen(true);
    return true;
  }

  function removeFromCart(productId, size) {
    setShop((previous) => ({
      ...previous,
      cart: previous.cart.filter(
        (item) => !(item.productId === productId && item.size === size),
      ),
    }));
  }

  function updateQuantity(productId, size, quantity) {
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      return;
    }

    setShop((previous) => ({
      ...previous,
      cart: previous.cart.map((item) =>
        item.productId === productId && item.size === size
          ? { ...item, quantity }
          : item,
      ),
    }));
  }

  function toggleWishlist(productId) {
    if (!products.some((product) => product.id === productId)) return;

    setShop((previous) => ({
      ...previous,
      wishlist: previous.wishlist.includes(productId)
        ? previous.wishlist.filter((id) => id !== productId)
        : [...previous.wishlist, productId],
    }));
  }

  const cartItems = shop.cart.map((item) => ({
    ...item,
    product: products.find((product) => product.id === item.productId),
  }));

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  function clearCart() {
  setShop((previous) => ({
    ...previous,
    cart: [],
  }));
}

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        cartCount,
        subtotal,
        wishlist: shop.wishlist,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        clearCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export default ShopProvider;