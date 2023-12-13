const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Connect to MongoDB (make sure you have MongoDB installed and running)
mongoose.connect('mongodb://localhost:27017/contactdata', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a schema for your messages
const messageSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String
});

const Message = mongoose.model('Message', messageSchema);

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Endpoint to handle form submissions
app.post('/submit', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Create a new message instance
        const newMessage = new Message({
            name,
            email,
            subject,
            message
        });

        // Save the message to the database
        await newMessage.save();

        // Send a response to the client
        res.json({ success: true, message: 'Message received and stored!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});