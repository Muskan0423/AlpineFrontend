import React, { useState, useEffect } from 'react';
import useNavigate from 'react-router-dom'
import './Checkout.css';
import Modal from '../Modal/Modal'; 

const CheckOut = ({ quizData }) => {
  const [discount, setDiscount] = useState(0);

  const [totalPrice, setTotalPrice] = useState(47.4);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', creditCard: '' });

  useEffect(() => {
    const fetchDiscount = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://alpinebackend-1.onrender.com/api/discount', {
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
      } finally {
        setLoading(false);
      }
    };

    if (quizData) fetchDiscount();
  }, [quizData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, creditCard } = e.target.elements;
    setFormData({
      name: name.value,
      email: email.value,
      creditCard: creditCard.value,
    });
    setIsModalOpen(true);
  };
  const ModalClose=()=>{
    setIsModalOpen(false)
    window.location.reload()
 
  }

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout Page</h2>

      {loading ? (
        <div className="loader"></div>
      ) : (
        <div>
          <div className="product-details">
            <p>Product: <strong>Alpine Bliss Energy Drink</strong></p>
            <p>Price (Pack of 12): <strong>$47.40</strong></p>
            <p>Discount Applied: <strong>{discount}%</strong></p>
            <p>Total Price: <strong>${totalPrice}</strong></p>
          </div>

          <form className="checkout-form" onSubmit={handleSubmit}>
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
                placeholder="4111111111111111"
                pattern="\d{16}"
                required
              />
            </label>

            <button type="submit" className="checkout-button">
              Checkout
            </button>
          </form>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => ModalClose()} formData={formData} />
    </div>
  );
};

export default CheckOut;
