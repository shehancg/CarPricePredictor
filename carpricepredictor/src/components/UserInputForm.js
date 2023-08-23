import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config'; // Import the API URL from the config file

function UserInputForm() {
  const [input, setInput] = useState({
    year: '',
    manufacturer: '',
    model: '',
    condition: '',
    odometer: '',
    transmission: '',
    paint_color: '',
    state: '',
  });
  const [prediction, setPrediction] = useState('');
  const [errors, setErrors] = useState({}); // Track validation errors

  const validateForm = () => {
    const newErrors = {};

    if (!input.year) newErrors.year = 'Year is required';
    if (!input.manufacturer) newErrors.manufacturer = 'Manufacturer is required';
    if (!input.model) newErrors.model = 'Model is required';
    if (!input.condition) newErrors.condition = 'Condition is required';
    if (!input.odometer) newErrors.odometer = 'Odometer reading is required';
    if (!input.transmission) newErrors.transmission = 'Transmission is required';
    if (!input.paint_color) newErrors.paint_color = 'Paint color is required';
    if (!input.state) newErrors.state = 'State is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(`${API_URL}/predict`, { input });
        setPrediction(response.data.car_price);
        console.log(response);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Car Price Predictor</h1>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-3">
            <label className="form-label">Year</label>
            <input
              type="number"
              className={`form-control ${errors.year ? 'is-invalid' : ''}`}
              name="year"
              value={input.year}
              onChange={handleInputChange}
            />
            {errors.year && <div className="invalid-feedback">{errors.year}</div>}
          </div>
          <div className="col-md-3">
            <label className="form-label">Manufacturer</label>
            <input
              type="text"
              className={`form-control ${errors.manufacturer ? 'is-invalid' : ''}`}
              name="manufacturer"
              value={input.manufacturer}
              onChange={handleInputChange}
            />
            {errors.manufacturer && <div className="invalid-feedback">{errors.manufacturer}</div>}
          </div>
          <div className="col-md-3">
            <label className="form-label">Model</label>
            <input
              type="text"
              className={`form-control ${errors.model ? 'is-invalid' : ''}`}
              name="model"
              value={input.model}
              onChange={handleInputChange}
            />
            {errors.model && <div className="invalid-feedback">{errors.model}</div>}
          </div>
          <div className="col-md-3">
            <label className="form-label">Condition</label>
            <select
              className={`form-select ${errors.condition ? 'is-invalid' : ''}`}
              name="condition"
              value={input.condition}
              onChange={handleInputChange}
            >
              <option value="">Select Condition</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
            {errors.condition && <div className="invalid-feedback">{errors.condition}</div>}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-3">
            <label className="form-label">Odometer</label>
            <input
              type="number"
              className={`form-control ${errors.odometer ? 'is-invalid' : ''}`}
              name="odometer"
              value={input.odometer}
              onChange={handleInputChange}
            />
            {errors.odometer && <div className="invalid-feedback">{errors.odometer}</div>}
          </div>
          <div className="col-md-3">
            <label className="form-label">Transmission</label>
            <select
              className={`form-select ${errors.transmission ? 'is-invalid' : ''}`}
              name="transmission"
              value={input.transmission}
              onChange={handleInputChange}
            >
              <option value="">Select Transmission</option>
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
            </select>
            {errors.transmission && <div className="invalid-feedback">{errors.transmission}</div>}
          </div>
          <div className="col-md-3">
            <label className="form-label">Paint Color</label>
            <select
              className={`form-select ${errors.paint_color ? 'is-invalid' : ''}`}
              name="paint_color"
              value={input.paint_color}
              onChange={handleInputChange}
            >
              <option value="">Select Paint Color</option>
              <option value="blue">Blue</option>
              <option value="red">Red</option>
              <option value="black">Black</option>
              {/* Add more color options */}
            </select>
            {errors.paint_color && <div className="invalid-feedback">{errors.paint_color}</div>}
          </div>
          <div className="col-md-3">
            <label className="form-label">State</label>
            <select
              className={`form-select ${errors.state ? 'is-invalid' : ''}`}
              name="state"
              value={input.state}
              onChange={handleInputChange}
            >
              <option value="">Select State</option>
              <option value="ca">California</option>
              <option value="ny">New York</option>
              <option value="fl">Texas</option>
              {/* Add more state options */}
            </select>
            {errors.state && <div className="invalid-feedback">{errors.state}</div>}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 d-flex justify-content-center" style={{ marginTop: '20px' }}>
            <button style={{ width: '200px' }} type="submit" className="btn btn-primary">Predict</button>
          </div>
        </div>
      </form>
      {prediction && <h3 className="mt-3">Predicted Price: {prediction}</h3>}
    </div>
  );
}

export default UserInputForm;
