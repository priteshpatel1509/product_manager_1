const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Replace your old local mongoose.connect with this:
const dbURI = "mongodb+srv://pritesh:<db_password>@priteshpatel.nc4ihda.mongodb.net/?appName=priteshpatel";

mongoose.connect(dbURI)
    .then(() => console.log("✅ Connected to MongoDB Atlas (Cloud)"))
    .catch(err => console.log("❌ Connection Error: ", err));
const Product = mongoose.model('Products', { 
    name: String, 
    category: String, 
    price: Number,
    description: String
});

// GET all products
app.get('/api/products', async (req, res) => {
    res.json(await Product.find());
});

// POST new product
app.post('/api/products', async (req, res) => {
    await new Product(req.body).save();
    res.send("Product Added");
});

// PUT update product
app.put('/api/products/:id', async (req, res) => {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    res.send("Product Updated");
});

// DELETE product
app.delete('/api/products/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.send("Product Deleted");
});

app.listen(3000, () => {
    console.log("-----------------------------------------");
    console.log("Product Dashboard: http://localhost:3000");
    console.log("-----------------------------------------");
});