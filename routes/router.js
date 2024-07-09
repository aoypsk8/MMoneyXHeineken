const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const { Client } = require('pg');
// Config env
dotenv.config();
const dbConfig = {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
};

// usersFix
const usersFix = [
    { username: 'admin', password: '123456' },
    { username: 'user1', password: 'user1' },
    { username: 'user2', password: 'user2' },
    { username: 'user3', password: 'user3' },
    { username: 'user4', password: 'user4' }
];
//First page
router.get("/", (req, res) => {
    res.render('Login');
});

// Login Logic
router.post('/doLogin', (req, res) => {
    const { username, password } = req.body;
    const user = usersFix.find(u => u.username === username && u.password === password);
    if (user) {
        res.json({ success: true, message: 'ເຂົ້າສູ່ລະບົບສຳເລັດ', redirectUrl: '/dashboard' });
    } else {
        res.json({ success: false, message: 'ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກ !' });
    }
});

router.get('/dashboard', async (req, res) => {
    const client = new Client(dbConfig); 
    try {
        await client.connect(); 
        const query = ` SELECT * FROM public."Redeem" WHERE active = false;`;
        // Execute the query
        const result = await client.query(query);
        const data = result.rows; 
        console.log(data);
        
        res.render('Dashboard', { data });
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Error fetching data');
    } finally {
        try {
            await client.end(); // Disconnect the client after use
        } catch (err) {
            console.error('Error ending client', err);
        }
    }
});

module.exports = router;
