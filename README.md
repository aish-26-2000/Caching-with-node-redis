# Caching with node-redis

## node-redis

`node-redis` is a modern, high performance Redis client for Node.js.

## Installation

To use Redis with Node.js, you need to install a Node.js Redis client.

Install node-redis : `npm install redis`

## Caching

Caching is the process of storing retrieved and processed data temporarily in a “ready-to-use” state.

 if we have some data coming from a third-party API,
 
 > retrieve the data from the API
 
 > store the data in a cache
 
 > the next time the server receives the same request, it retrieves the data from the cache
 
 
