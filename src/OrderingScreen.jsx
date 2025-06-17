import React, { useState } from 'react';
import './OrderingScreen.css';

const menu = {
  Burgers: [
    { name: 'Beef Burger', price: 5.06, image: 'https://picsum.photos/seed/beef/200' },
    { name: 'Beef Cheese Burger', price: 5.31, image: 'https://picsum.photos/seed/beefcheese/200' },
    { name: 'Chicken Burger', price: 5.57, image: 'https://picsum.photos/seed/chicken/200' },
  ],
  Pies: [
    { name: 'Steak & Kidney Pie', price: 8.47, image: 'https://picsum.photos/seed/pie/200' },
  ],
  Pizza: [
    { name: 'Margherita Pizza', price: 6.35, image: 'https://picsum.photos/seed/pizza/200' },
    { name: 'Spicy Chicken Pizza', price: 6.75, image: 'https://picsum.photos/seed/spicypizza/200' },
  ],
  Desserts: [
    { name: 'Choc Fudge Cake', price: 2.89, image: 'https://picsum.photos/seed/cake/200' },
  ],
};

export default function OrderingScreen() {
  const [cat, setCat] = useState(null);
  const [cart, setCart] = useState([]);

  const add = (item, delta = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.name === item.name);
      if (existing) {
        const newQty = existing.qty + delta;
        if (newQty <= 0) return prev.filter(i => i.name !== item.name);
        return prev.map(i => i.name === item.name ? { ...i, qty: newQty } : i);
      }
      return delta > 0 ? [...prev, { ...item, qty: delta }] : prev;
    });
  };

  const total = cart.reduce((sum, i) => sum + i.qty * i.price, 0);

  return (
    <div className="container">
      <div className="menu-section">
        {!cat ? (
          <div className="categories-grid">
            {Object.keys(menu).map(c => (
              <div
                key={c}
                className="category-card"
                onClick={() => setCat(c)}
                role="button"
                tabIndex={0}
                onKeyPress={() => setCat(c)}
              >
                {c}
              </div>
            ))}
          </div>
        ) : (
          <>
            <button className="back-button" onClick={() => setCat(null)}>&larr; Back to Categories</button>
            <h2 className="category-title">{cat}</h2>
            <div className="items-grid">
              {menu[cat].map(item => (
                <div key={item.name} className="item-card">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price">£{item.price.toFixed(2)}</p>
                  <button className="add-button" onClick={() => add(item)}>Add to Cart</button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="cart-section">
        <h2>Receipt</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map(item => (
            <div key={item.name} className="cart-item">
              <div>
                <span className="cart-item-name">{item.name} ×{item.qty}</span>
                <div className="cart-item-price">£{(item.qty * item.price).toFixed(2)}</div>
              </div>
              <div className="cart-item-controls">
                <button onClick={() => add(item, -1)} className="qty-button">–</button>
                <button onClick={() => add(item, +1)} className="qty-button">+</button>
              </div>
            </div>
          ))
        )}
        <hr />
        <div className="total">Total: £{total.toFixed(2)}</div>
        <button className="checkout-button" disabled={cart.length === 0}>Checkout</button>
      </div>
    </div>
  );
}
