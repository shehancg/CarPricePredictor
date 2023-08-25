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

    if (!input.year || input.year < 0) newErrors.year = 'Year is required and must be non-negative';
    if (!input.manufacturer) newErrors.manufacturer = 'Manufacturer is required';
    if (!input.model) newErrors.model = 'Model is required';
    if (!input.condition) newErrors.condition = 'Condition is required';
    if (!input.odometer || input.odometer < 0) newErrors.odometer = 'Odometer reading is required and must be non-negative';
    if (!input.transmission) newErrors.transmission = 'Transmission is required';
    if (!input.paint_color) newErrors.paint_color = 'Paint color is required';
    if (!input.state) newErrors.state = 'State is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
  
    // Validate input based on field name
    let sanitizedValue = value;
    if (name === 'year') {
      const minYear = 1995;
      const maxYear = 2022;
      sanitizedValue = Math.max(minYear, Math.min(maxYear, value)); // Limit the value within the range
    } else if (name === 'odometer') {
      sanitizedValue = Math.max(0, value); // Ensure non-negative odometer value
    }
  
    setInput({ ...input, [name]: sanitizedValue });
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
              <option value="like new">Like New</option>
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="salvaged">Salvaged</option>
            </select>
            {errors.condition && <div className="invalid-feedback">{errors.condition}</div>}
          </div>
        </div>
        <br></br>
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
              <option value="other">Other</option>
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
                <option value="white">White</option>
                <option value="silver">Silver</option>
                <option value="gray">Gray</option>
                <option value="green">Green</option>
                <option value="yellow">Yellow</option>
                <option value="orange">Orange</option>
                <option value="purple">Purple</option>
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
              <option value="al">Alabama</option>
              <option value="ak">Alaska</option>
              <option value="az">Arizona</option>
              <option value="ar">Arkansas</option>
              <option value="ca">California</option>
              <option value="co">Colorado</option>
              <option value="ct">Connecticut</option>
              <option value="de">Delaware</option>
              <option value="fl">Florida</option>
              <option value="ga">Georgia</option>
              <option value="hi">Hawaii</option>
              <option value="id">Idaho</option>
              <option value="il">Illinois</option>
              <option value="in">Indiana</option>
              <option value="ia">Iowa</option>
              <option value="ks">Kansas</option>
              <option value="ky">Kentucky</option>
              <option value="la">Louisiana</option>
              <option value="me">Maine</option>
              <option value="md">Maryland</option>
              <option value="ma">Massachusetts</option>
              <option value="mi">Michigan</option>
              <option value="mn">Minnesota</option>
              <option value="ms">Mississippi</option>
              <option value="mo">Missouri</option>
              <option value="mt">Montana</option>
              <option value="ne">Nebraska</option>
              <option value="nv">Nevada</option>
              <option value="nh">New Hampshire</option>
              <option value="nj">New Jersey</option>
              <option value="nm">New Mexico</option>
              <option value="ny">New York</option>
              <option value="nc">North Carolina</option>
              <option value="nd">North Dakota</option>
              <option value="oh">Ohio</option>
              <option value="ok">Oklahoma</option>
              <option value="or">Oregon</option>
              <option value="pa">Pennsylvania</option>
              <option value="ri">Rhode Island</option>
              <option value="sc">South Carolina</option>
              <option value="sd">South Dakota</option>
              <option value="tn">Tennessee</option>
              <option value="tx">Texas</option>
              <option value="ut">Utah</option>
              <option value="vt">Vermont</option>
              <option value="va">Virginia</option>
              <option value="wa">Washington</option>
              <option value="wv">West Virginia</option>
              <option value="wi">Wisconsin</option>
              <option value="wy">Wyoming</option>
            </select>
            {errors.state && <div className="invalid-feedback">{errors.state}</div>}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 d-flex justify-content-center" style={{ marginTop: '40px' }}>
            <button style={{ width: '200px' }} type="submit" className="btn btn-primary">Predict</button>
          </div>
        </div>
      </form>
      <br></br>
      {prediction && <h3 className="mt-3">Predicted Price: ${prediction}</h3>}
    </div>
  );
}

export default UserInputForm;
