const redis  = require('redis');
const axios = require('axios');
const response = require('./src/helpers/response');
const limit = require("./src/utils/apiRequestLimiter");
const { CONSTANTS } = require('./src/config');
const express = require('express');

//create redis client
const client = redis.createClient({
    //redis connection string - redis://USERNAME:PASSWORD@ENDPOINT:PORT
    url : `redis://${CONSTANTS.REDIS.username}:${CONSTANTS.REDIS.password}@${CONSTANTS.REDIS.end_point}`
});

//redis connection
client.on('connect',function(){
    console.log('Redis Connection Successful.')
});
client.connect();

const app = express();
const API = 'https://jsonplaceholder.typicode.com/users';



//Third party API request
app.use('/users',limit); //limiting api requests
app.get('/users',(req,res) => {
    try {
        axios.get(`${API}`).then(user => {
            response.success(res,user.data);
            console.log('Data retrieved from API');
        });
    } catch (err) {
        console.log(err);
    }
});


//caching
app.get('/usercache',(req,res) => {
    try {
        //get key from redis
        client.get('users').then(user => {

            if(user) {
                //if key exists
                const data = JSON.parse(user)
                const userData = data.map(
                    ({id,name,username,email,phone}) => ({id,name,username,email,phone})
                )
                response.success(res,userData);
                console.log("User data retrieved from Redis");
            } else {
                //if key doesn't exists

                //get data from api
                axios.get(`${API}`).then(api => {
                    const apiData = api.data.map(
                        ({id,name,username,email,phone}) => ({id,name,username,email,phone})
                    )
                    response.success(res,apiData);
                    console.log("User Data retrieved from API");

                    //add data to redis
                    const data = api.data;
                    client.setEx('users',60,JSON.stringify(data));
                    console.log("User data stored in Redis")
                });
            }
        });
    } catch (err) {
        console.log(err);
    }
});


module.exports = app;

