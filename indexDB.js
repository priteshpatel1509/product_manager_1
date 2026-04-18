const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Atlas Connection (Ensure YOUR link is here)
const dbURI = "mongodb+srv://pritesh:pritesh@priteshpatel.nc4ihda.mongodb.net/ProductDB?retryWrites=true&w=majority";
mongoose.connect(dbURI)
    .then(() => console.log("✅ MongoDB Atlas Connected"))
    .catch(err => console.log("❌ DB Error: ", err));

const Product = mongoose.model('Products', { 
    name: String, category: String, price: Number, description: String 
});

// API Routes
app.get('/api/products', async (req, res) => {
    try { res.json(await Product.find()); } 
    catch (e) { res.status(500).send(e); }
});

app.post('/api/products', async (req, res) => {
    try { await new Product(req.body).save(); res.send("Saved"); } 
    catch (e) { res.status(500).send(e); }
});

app.delete('/api/products/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.send("Deleted");
});

// CRITICAL: This sends index.html for any other request (Fixes 404)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT} 🚀`));
