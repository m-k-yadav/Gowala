const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
const connectDB = require('./config/db')

const subscriptionRoutes = require('./routes/subscription');

dotenv.config();
connectDB();

const app = express();
console.log(app);
app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
    res.send('Milkly API running...');
})

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/subscription', subscriptionRoutes);

//app.length('/', (req,res) => res.send("Hey Milkly your backEnd is running"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on Port ${PORT}`));
