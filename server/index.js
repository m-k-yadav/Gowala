const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();

app.use(cors());
app.use(express.json());

app.length('/', (req,res) => res.send("Hey Milkly your backEnd is running"));
const PORT = ProcessingInstruction.env.PORT || 5000;
app.listen(PORT, ()=> console.log('Server running on Port ${PORT}'));
