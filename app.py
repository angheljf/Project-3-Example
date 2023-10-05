from flask import Flask, render_template, jsonify
from sqlalchemy import create_engine
import pandas as pd
import numpy as np

# Read csv file
csv_file = "./data/hawaii_measurements.csv"

df = pd.read_csv(csv_file)

# Create engine
engine = create_engine("sqlite:///data/test.sqlite")

# Create table
df.to_sql(name="test", con=engine, if_exists="replace")

app = Flask(__name__)

@app.route('/')
def data():
    """Return the data as json"""
    
    # Grab table inside sqlite database
    test = engine.execute("SELECT * FROM test").fetchall()
    
    # Create empty list
    data = []
    
    # Loop through table and append to list
    for row in test:
        data.append({
            "id": row[0],
            "station": row[1],
            "date": row[2],
            "prcp": row[3],
            "tobs": row[4]
        })
    
    return jsonify(data)

@app.route('/dashboard')
def dashboard():
    """Return dashboard template"""
    return render_template("index.html")

if __name__ == '__main__':
    app.run(debug=True)