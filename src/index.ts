import express from 'express';
import bodyParser from 'body-parser';
import admin from 'firebase-admin';
import cors from 'cors'; // Import the CORS package
import { Firestore } from '@google-cloud/firestore';
import serviceAccount from './staycation-3db3b-firebase-adminsdk-z748u-f953ea3f31.json' assert { type: 'json' };


// Initialize Express App
const app = express();
const port = 3000;  // Choose your preferred port

// Middleware
app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:3001', // Specify your frontend's origin
}));

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

const db = admin.firestore();

// Example API Endpoint: Get Data from Firebase Firestore
app.get('/data', async (req, res) => {
  try {
      const dataSnapshot = await db.collection('test').get();
      const data = dataSnapshot.docs.map(doc => {
          console.log(`ID: ${doc.id}`, doc.data()); // Log the ID and data
          return { id: doc.id, ...doc.data() }; // Return an object with the ID
      });
      res.status(200).json(data);
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Error fetching data from database' });
  }
});


// Get a single item by ID from Firestore
app.get('/data/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const docRef = db.collection('test').doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Document not found' });
    }
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Error fetching document:', error);
    res.status(500).json({ error: 'Error fetching document from database' });
  }
});

// Example API Endpoint: Add Data to Firestore
app.post('/data', async (req, res) => {
  try {
    const newDocRef = db.collection('test').doc();
    await newDocRef.set(req.body);
    res.status(201).json({ message: 'Document added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error adding data to database' });
  }
});

// Start Express Server
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});
