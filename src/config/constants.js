module.exports = {
    APP: {
        port: process.env.PORT,
        env: process.env.NODE_ENV,
    },

    USER: {
        ROLES: {
            USER: 'USER',
        },
    },

    REDIS : {
        username : process.env.REDIS_USER,
        password :  process.env.REDIS_PASSWORD,
        end_point : process.env.REDIS_END_POINT,
        redis_port :  process.env.REDIS_PORT
    }
};
