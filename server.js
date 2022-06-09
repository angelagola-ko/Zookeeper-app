const fs = require('fs');
const path = require('path');
const express = require('express');
const { animals } = require('./data/animals');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const PORT = process.env.PORT || 3001;
const app = express();

// for adding css
app.use(express.static('public'));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
//anytime a client navigates to <ourhost>/api the app will use
//the router we set up in apiRoutes or htmlroutes(/)
app.use('/api', apiRoutes);
app.use('/',htmlRoutes);



    app.listen(PORT, () => {
        console.log(`API server now on ${PORT}!`);
    });



    // '/api/animals has JSON in it.
    
    