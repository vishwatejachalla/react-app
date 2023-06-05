import express from 'express';
import MongoClient from 'mongodb';
import cors from 'cors';

// MongoDB connection URL
const url = 'mongodb+srv://techtricks360:Vishwa12%40@react.kywplqo.mongodb.net/?retryWrites=true&w=majority';

// Database and collection names
const dbName = 'Customers';
const collectionName = 'Customers';

// Create an Express application
const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Define a route to add a new customer
app.post('/customer', async (req, res) => {
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db(dbName);

    // Insert the new customer into the collection
    const result = await db.collection(collectionName).insertOne(req.body);

    // Close the connection
    client.close();

    res.status(201).json({ message: 'Customer created successfully', customerId: result.insertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating customer' });
  }
});

// Start the server
const port = 3030;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
