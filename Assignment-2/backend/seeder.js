// backend/seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product'); // Path to your Mongoose Product model
const products = require('./data/products'); // Path to your data file

dotenv.config();

// Replace with your MongoDB connection string
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/yourdbname', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected successfully.');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const importData = async () => {
    await connectDB();
    try {
        // 1. Clear existing data
        await Product.deleteMany();
        console.log('Existing Data Destroyed.');

        // 2. Insert new, CLEANED data
        // 💡 CRITICAL: Ensure the data is inserted exactly as defined in products.js
        await Product.insertMany(products);
        
        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error importing data: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    await connectDB();
    try {
        await Product.deleteMany();
        console.log('Data Destroyed Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error destroying data: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}