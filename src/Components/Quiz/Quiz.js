import React, { useState } from 'react';
import './Quiz.css';

const Quiz = ({ onSubmitQuiz }) => {
  const [formData, setFormData] = useState({
    ageRange: '',
    gender: '',
    reason: '',
    zipCode: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitQuiz(formData);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Quiz Form</h2>

        <div className="form-group">
          <label>Age Range:</label>
          <select name="ageRange" value={formData.ageRange} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="18-25">18-25</option>
            <option value="26-35">26-35</option>
            <option value="36-45">36-45</option>
            <option value="46+">46+</option>
          </select>
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>

        <div className="form-group">
          <label>Reason for Purchase:</label>
          <select name="reason" value={formData.reason} onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Work productivity">Work productivity</option>
            <option value="Sports performance">Sports performance</option>
            <option value="Study aid">Study aid</option>
            <option value="General energy boost">General energy boost</option>
          </select>
        </div>

        <div className="form-group">
          <label>Zip Code:</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            pattern="\d{5}"
            placeholder="Enter 5-digit Zip Code"
            required
          />
        </div>

        <div className="form-group">
          <button type="submit">Submit Quiz</button>
        </div>
      </form>
    </div>
  );
};

export default Quiz;
