const express = require('express');
const router = express.Router();
const { Client } = require('pg');

// Database connection details
const dbConfig = {
    host: '172.28.26.8',
    database: 'lmm',
    user: 'lmm',
    password: 'Mm0ney@2024',
    port: 5432,
};

router.get("/", (req, res) => {
    res.render('Login');
});

router.post('/doLogin', (req, res) => {
    const { username, password } = req.body;
    console.log('Received login request:', { username, password });

    // Replace with your own authentication logic
    if (username === '1' && password === '1') {
        res.json({ success: true, redirectUrl: '/dashboard' });
    } else {
        res.json({ success: false, message: 'ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກ !' });
    }
});

router.get('/dashboard', async (req, res) => {
    const client = new Client(dbConfig); // Create a new client instance

    try {
        await client.connect(); // Connect to PostgreSQL
        // Define your query
        const query = `
            SELECT id, codes, amount, active, created, remark, tranid, msisdn, tran_date, startdate, enddate, title, location
            FROM public."Redeem" WHERE active = false;
        `;

        // Execute the query
        const result = await client.query(query);
        const data = result.rows; 
        // Render the 'Dashboard' view with the retrieved data
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
