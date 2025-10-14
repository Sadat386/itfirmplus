
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://itfirmplus_db_user:KbdhadMZ4CWvKn35@itfirmplus.icxoi9v.mongodb.net/?retryWrites=true&w=majority&appName=itfirmplus', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB connected successfully!');
    } catch (err) {
        console.error(`❌ Error connecting to MongoDB: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
