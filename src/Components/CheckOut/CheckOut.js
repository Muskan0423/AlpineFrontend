import React, { useState, useEffect } from 'react';
import './Checkout.css';

const CheckOut = ({ quizData }) => {
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(47.4);

  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/discount', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(quizData),
        });
        const data = await response.json();
        setDiscount(data.discount);
        setTotalPrice((47.4 - (47.4 * data.discount) / 100).toFixed(2));
      } catch (error) {
        console.error('Error fetching discount:', error);
      }
    };

    if (quizData) fetchDiscount();
  }, [quizData]);

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout Page</h2>

      <div className="product-details">
        <p>Product: <strong>Alpine Bliss Energy Drink</strong></p>
        <p>Price (Pack of 12): <strong>$47.40</strong></p>
        <p>Discount Applied: <strong>{discount}%</strong></p>
        <p>Total Price: <strong>${totalPrice}</strong></p>
      </div>

      <form className="checkout-form">
        <label>
          Name:
          <input type="text" name="name" placeholder="Enter your name" required />
        </label>

        <label>
          Email:
          <input type="email" name="email" placeholder="Enter your email" required />
        </label>

        <label>
          Credit Card:
          <input
            type="text"
            name="creditCard"
            placeholder="Enter mock card number"
            pattern="\d{16}"
            required
          />
        </label>

        <button type="submit" className="checkout-button">
          Checkout
        </button>
      </form>
    </div>
  );
};

export default CheckOut;
