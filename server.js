//Install express server
const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);

// Serve only the static files form the dist directory
app.use(express.static('./dist/tetris-app'));

app.get('/*', function(req,res) {  
    res.sendFile(path.join(__dirname,'/dist/tetris-app/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);