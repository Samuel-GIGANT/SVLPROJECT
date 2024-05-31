import React, { useState } from 'react';
import './order.css';

const Order = () => {
  const [showCrudButtons, setShowCrudButtons] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: ''
  });

  const handleEditClick = () => {
    setShowCrudButtons(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddClick = async () => {
    try {
      const response = await fetch('https://votre-api-endpoint.com/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log('Order added successfully!');
        // Vous pouvez aussi réinitialiser le formulaire si nécessaire
        setFormData({ name: '', description: '', price: '', quantity: '' });
      } else {
        console.error('Failed to add order');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="order">
      <h1>Order</h1>
      <div className="order_form">
        {/* <form>
          <div className="order_infos">
            <label>name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="order_infos">
            <label>description:</label>
            <input
              type="textarea"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
          <div className="order_infos">
            <label>price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div className="order_infos">
            <label>quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </div>
        </form> */}
        <div className="order_btns">
          <div className="order_crud">
            {showCrudButtons && (
              <div className="order_btns">
                <button id="btn_add" onClick={handleAddClick}>
                  Add+
                </button>
                <button id="btn_update">Update</button>
                <button id="btn_delete">Delete x</button>
              </div>
            )}
          </div>

          <div className="order_edit">
            <button onClick={handleEditClick}>Edit</button>
          </div>
          <div className="order_submit">
            <button type="submit">Envoyer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
