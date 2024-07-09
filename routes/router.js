const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const session = require('express-session');
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

router.use(session({
    secret: 'MMoneyX',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Change to true if using HTTPS
}));

// usersFix
const usersFix = [
    { username: 'adminMMoney', password: 'mmoney123456' },
    { username: 'Sapphire78', password: 'Cascade@27' },
    { username: 'LunaStar43', password: 'Moonlight#21' },
    { username: 'Phoenix87', password: 'Firebird$99' },
    { username: 'AuroraSky22', password: 'Celestial*56' },
    { username: 'Emerald99', password: 'Jade@77' },
    { username: 'Stellar75', password: 'Galaxy%33' },
    { username: 'EchoWave18', password: 'Whisper+92' },
    { username: 'AmberSunset', password: 'Golden&25' },
    { username: 'SilverDragon', password: 'Knight@64' },
    { username: 'RubyStar71', password: 'Diamond#88' },
    { username: 'Neptune55', password: 'Trident$39' }
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
        req.session.isAuthenticated = true;
        res.json({ success: true, message: 'ເຂົ້າສູ່ລະບົບສຳເລັດ', redirectUrl: '/dashboard' });
    } else {
        res.json({ success: false, message: 'ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກ !' });
    }
});

router.get('/dashboard', async (req, res) => {
    if (!req.session.isAuthenticated) {
        res.render('NotFound');
        return;
    }

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
// Not Found handler for other routes
router.get('*', (req, res) => {
    res.render('NotFound');
});

module.exports = router;
