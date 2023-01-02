const http = require('http');




const Hapi = require('@hapi/hapi');
const routes = require('./Routes/routes.js')
 
const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
        routes: {
            cors: {
                 origin: ['*'],
             }
         }
    });

    server.route(routes)

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};
 
init();