const express = require('express');
const router = express.Router();
const faker = require('faker');
const { Client } = require('pg');
// Database connection details
const client = new Client({
    host: '172.28.26.8',
    database: 'lmm',
    user: 'lmm',
    password: 'Mm0ney@2024',
    port: 5432,
});

router.get("/", (req, res) => {
    // Example data to pass to the template
    // const data = {
    //     title: 'Tailwind with EJS',
    //     heading: 'Hello from Tailwind CSS with EJS!',
    //     paragraph: 'This is a paragraph styled with Tailwind CSS.',
    //     items: ['HI!@#!', 'Item 2', 'Item 3']
    // };
    // res.render('Login', data);
    res.render('Login');
});

router.post('/doLogin', (req, res) => {
    const { username, password } = req.body;
    console.log('Received login request:', { username, password });

    // Replace with your own authentication logic
    if (username === 'user' && password === 'password') {
        res.json({ success: true, redirectUrl: '/dashboard' });
    } else {
        res.json({ success: false, message: 'ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກ !' });
    }
});
router.get('/dashboard', async (req, res) => {

    try {
        // Connect to the database
        await client.connect();

        // Define your query
        const query = `
          SELECT id, codes, amount, active, created, remark, tranid, msisdn, tran_date, startdate, enddate, title, location
          FROM public."Redeem";
        `;

        // Execute the query
        const res = await client.query(query);

        // Process the results
        res.rows.forEach(row => {
            console.log(row);
        });

    } catch (err) {
        console.error('Error executing query', err.stack);
    } finally {
        // Close the database connection
        await client.end();
    }



    const data = {
        activeRows: [],
        inactiveRows: []
    };
    // Generate 30 rows of fake data
    for (let i = 0; i < 30; i++) {
        const row = {
            id: i + 1,
            code: faker.random.alphaNumeric(6),
            amount: faker.finance.amount(),
            active: faker.random.boolean(),
            created: faker.date.past().toLocaleDateString(),
            enddate: faker.date.past().toLocaleDateString(),
            msisdn: faker.phone.phoneNumber(),
            latitude: faker.address.latitude(),
            longitude: faker.address.longitude()
        };

        if (row.active) {
            data.activeRows.push(row);
        } else {
            data.inactiveRows.push(row);
        }
    }
    res.render('Dashboard', { data });
});


module.exports = router;
