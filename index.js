const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();

const key = 'secretKey123';

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/userDatabase');

app.get('/', (req, res) => {
    res.send("Hello Mohit");
});

app.post('/register', async (req, res) => {
    console.log(req.body);
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword,
        });
        res.json({ status: 'ok' });
    } catch (error) {
        res.json({ status: 'error', error: 'Duplicate Email' });
    }
});

app.post('/login', async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
    });
    if (!user) {
        return res.json({ status: 'error', error: 'Invalid Login' });
    }
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (isPasswordValid) {
        const token = jwt.sign({
            name: user.name,
            email: user.email,
        }, key, { expiresIn: '1h' });
        res.json({ status: 'ok', user: token });
    } else {
        res.json({ status: 'error', user: false });
    }
});

app.get('/hotMetalLadle', (req, res) => {
    res.json({
        tlcPitArea: {
            ladlesPassed: 15,
            updatedOn: '15:48:06'
        },
        converter: {
            ladlesPassed: 12,
            updatedOn: '16:25:40'
        }
    });
});

app.get('/steelLadle', (req, res) => {
    res.json({
        ladlePreparationBay: {
            ladlesPassed: 20,
            updatedOn: '15:48:06'
        },
        lf1: {
            ladlesPassed: 18,
            updatedOn: '16:25:40'
        },
        lf2: {
            ladlesPassed: 17,
            updatedOn: '16:55:23'
        },
        rh: {
            ladlesPassed: 15,
            updatedOn: '16:59:10'
        },
        casterMachines: {
            ladlesPassed: 12,
            updatedOn: '17:30:30'
        }
    });
});

app.get('/scrapPot', (req, res)=>{
    res.json({
        converter: {
            ladlesPassed: 12,
            updatedOn: '16:25:40'
        },
        slagDumpingArea: {
            ladlesPassed: 10,
            updatedOn: "17:08:15"
        }
    })
})

app.post('/searchLadle', (req, res)=>{
    const ladleId = req.body.ladleId;
    res.json({
        ladleId: ladleId,
        ladleContent: "Liquid Steel",
        lastCheckpoint: "TLC Pit Area",
        circulationTime: "12:25:40",
        turnAroundTime: 5
    });
});


app.listen(5000, () => {
    console.log("Server running at port 5000");
});