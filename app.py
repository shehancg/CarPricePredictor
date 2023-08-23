from flask import Flask, request, jsonify
import joblib
from flask_cors import CORS
import pandas as pd
from sklearn.preprocessing import LabelEncoder

# Load the trained model
model_filename = 'random_forest_model.pkl'
loaded_rf = joblib.load(model_filename)

# Create a Flask app
app = Flask(__name__)
CORS(app)
CORS(app, origins=['http://localhost:3000'])

# Define a route for the `/predict` endpoint
@app.route('/predict', methods=['POST'])
def predict():
    # Get the user input data from the request
    data = request.json  # Received user input as JSON
    user_input_data = data['input']

    # Convert the user input data to a list
    user_input_list = [
        int(user_input_data['year']),
        user_input_data['manufacturer'],
        user_input_data['model'],
        user_input_data['condition'],
        int(user_input_data['odometer']),
        user_input_data['transmission'],
        user_input_data['paint_color'],
        user_input_data['state']
    ]

    # Encode specific user input values using LabelEncoder
    le = LabelEncoder()
    le.fit(user_input_list)
    for i in [1, 2, 3, 5, 6, 7]:
        user_input_list[i] = le.transform([user_input_list[i]])[0]

    # Make predictions using the loaded model
    predictions = loaded_rf.predict([user_input_list])

    # Create a response object
    response = {
        'car_price': predictions[0]
    }

    return jsonify(response)

# Run the Flask app
app.run(debug=True)
