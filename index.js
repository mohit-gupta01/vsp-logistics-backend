const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');
// const User = require('./models/user.model');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
const app = express();

// const key = 'secretKey123';

app.use(cors());
app.use(express.json());

// mongoose.connect('mongodb://127.0.0.1:27017/userDatabase');

app.get('/', (req, res) => {
    res.send("Hello World");
});

// app.post('/register', async (req, res) => {
//     console.log(req.body);
//     try {
//         const newPassword = await bcrypt.hash(req.body.password, 10);
//         await User.create({
//             name: req.body.name,
//             email: req.body.email,
//             password: newPassword,
//         });
//         res.json({ status: 'ok' });
//     } catch (error) {
//         res.json({ status: 'error', error: 'Duplicate Email' });
//     }
// });

// app.post('/login', async (req, res) => {
//     const user = await User.findOne({
//         email: req.body.email,
//     });
//     if (!user) {
//         return res.json({ status: 'error', error: 'Invalid Login' });
//     }
//     const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
//     if (isPasswordValid) {
//         const token = jwt.sign({
//             name: user.name,
//             email: user.email,
//         }, key, { expiresIn: '1h' });
//         res.json({ status: 'ok', user: token });
//     } else {
//         res.json({ status: 'error', user: false });
//     }
// });


app.listen(5000, () => {
    console.log("Server running at port 5000");
});