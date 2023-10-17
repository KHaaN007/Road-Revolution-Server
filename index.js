const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;


/**Midelware**/
app.use(cors());
app.use(express.json());





/**Their Will Be User Name & Password**/














app.get('/', (req, res) => {
    res.send('Server Is Running')
})



app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})