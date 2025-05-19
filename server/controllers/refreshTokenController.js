const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    // console.log(cookies);
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies?.jwt;

    const foundUser = await User.findOne({refreshToken}).exec();
    if (!foundUser) return res.sendStatus(403);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.donor_id !== decoded.donor_id) return res.sendStatus(403);
            const role = foundUser?.role;
            const accessToken = jwt.sign(
                { 
                    "UserInfo": {
                        "donor_id": decoded.donor_id,
                        "role": role 
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            res.json({ donor_id:decoded.donor_id, role: role, accessToken: accessToken })
        }
    );
}

module.exports = { handleRefreshToken }