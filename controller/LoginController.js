class LoginController {
    static async doLogin(req, res) {
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
        try {
            const { username, password } = req.body;
            const user = usersFix.find(u => u.username === username && u.password === password);
            if (user) {
                req.session.isAuthenticated = true;
                res.json({ success: true, message: 'ເຂົ້າສູ່ລະບົບສຳເລັດ', redirectUrl: '/dashboard' });
            } else {
                res.json({ success: false, message: 'ຊື່ຜູ້ໃຊ້ ຫຼື ລະຫັດຜ່ານບໍ່ຖືກ !' });
            }
        } catch (error) {

        }
    }
}

module.exports = LoginController;