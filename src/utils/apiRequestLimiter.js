const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    max :  2,
    message :  "Your Limit exceeded"
})

module.exports = apiLimiter;