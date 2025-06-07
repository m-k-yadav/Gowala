import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const SubscriptionForm = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    address: '',
    milkQuantity: '',
    deliveryFrequency: 'daily',
    otherProducts: [],
    notes: ''
  });

  //console.log(user);

  const productOptions = ['Paneer', 'Curd', 'Butter'];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e) => {
    const product = e.target.value;
    setForm(prev => {
      if (prev.otherProducts.includes(product)) {
        return { ...prev, otherProducts: prev.otherProducts.filter(p => p !== product) };
      } else {
        return { ...prev, otherProducts: [...prev.otherProducts, product] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/subscription', form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Subscription successful!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Milkly Subscription Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Phone:</strong> {user?.phone}</p>

        <textarea
          name="address"
          placeholder="Delivery Address"
          value={form.address}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="number"
          name="milkQuantity"
          placeholder="Milk Quantity (litres)"
          value={form.milkQuantity}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <select
          name="deliveryFrequency"
          value={form.deliveryFrequency}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="daily">Daily</option>
          <option value="alternate">Alternate Days</option>
          <option value="occasional">Occasional</option>
        </select>

        <fieldset>
          <legend className="font-medium">Other Products:</legend>
          {productOptions.map(product => (
            <label key={product} className="block">
              <input
                type="checkbox"
                value={product}
                checked={form.otherProducts.includes(product)}
                onChange={handleCheckbox}
              />
              {' '}{product}
            </label>
          ))}
        </fieldset>

        <textarea
          name="notes"
          placeholder="Any notes (optional)"
          value={form.notes}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default SubscriptionForm;
