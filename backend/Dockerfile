# Use the official Python image as the base image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements.txt file to the container
COPY requirements.txt .

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire project to the container
COPY . .

# Expose the port that the Flask app will run on
EXPOSE 8080

# Run the Flask application
CMD ["python", "-m", "flask", "run", "--port", "8080", "--host", "0.0.0.0", "--debug"]