const express = require('express');
const app = express();
const path = __dirname + "/public/views";

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render(path + '/index.ejs');
})

app.listen(8080, () => {
    console.log('The server is running');
})