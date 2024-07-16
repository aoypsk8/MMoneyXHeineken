const { getClient } = require('../config/database');

class DashboardController {
    static async fetchDashboard(req, res) {
        const client = getClient();
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
    }
}

module.exports = DashboardController;