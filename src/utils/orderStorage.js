const ORDERS_KEY = 'king-brandss-orders-v1';

export function readOrders() {
  const stored = localStorage.getItem(ORDERS_KEY);

  if (!stored) return [];

  const orders = JSON.parse(stored);

  if (
    !Array.isArray(orders) ||
    !orders.every(
      (order) =>
        typeof order?.id === 'string' &&
        typeof order.createdAt === 'string' &&
        Number.isFinite(order.total) &&
        order.total >= 0 &&
        Array.isArray(order.items) &&
        order.items.every(
          (item) =>
            typeof item?.name === 'string' &&
            typeof item.size === 'string' &&
            Number.isInteger(item.quantity) &&
            item.quantity > 0 &&
            Number.isFinite(item.price) &&
            item.price >= 0,
        ),
    )
  ) {
    throw new Error('Saved order history could not be read.');
  }

  return orders;
}

export function saveDemoOrder(cartItems) {
  if (cartItems.length === 0) {
    throw new Error('Your cart is empty.');
  }

  const items = cartItems.map(({ product, size, quantity }) => ({
    productId: product.id,
    name: product.name,
    price: product.price,
    size,
    quantity,
  }));

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const order = {
    id: `KB-${Date.now().toString(36).toUpperCase()}-${Math.random()
      .toString(36)
      .slice(2, 6)
      .toUpperCase()}`,
    createdAt: new Date().toISOString(),
    items,
    subtotal,
    shipping: 0,
    total: subtotal,
    status: 'Demo order',
  };

  const orders = readOrders();

  // Save before clearing the cart. A failed save leaves the cart intact.
  localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...orders]));

  return order;
}