const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express()
const port = process.env.PORT || 5000;


/**Midelware**/
app.use(cors());
app.use(express.json());





/**Their Will Be User Name & Password**/


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2wfm9qv.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();


        const brandCollection = client.db("productDB").collection("product")

        /**Cart DataBase**/
        const cartCollection = client.db("cartDB").collection("cart")






        /**Connect the client to the server**/ /**ADD Product**/
        app.post('/product', async (req, res) => {
            delete req.body._id
            const newproduct = req.body;
            const result = await brandCollection.insertOne(newproduct)
            res.send(result)
        })

        


        /**Get Data From ProductDB for Product Card**/
        app.get('/product', async (req, res) => {
            const cursor = brandCollection.find();
            const result = await cursor.toArray()
            res.send(result)
        })



        /**Get Specific Data Form ProductDB For Product Details**/
        app.get('/product/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await brandCollection.findOne(query)
            res.send(result)
        })






        /**Add Cart From Client Side and Set init Cart DataBase**/
        app.post('/cart', async (req, res) => {
            delete req.body._id
            const newCart = req.body;
            const result = await cartCollection.insertOne(newCart)
            res.send(result)
        })


        
        app.get('/cart', async (req, res) => {
            const cursor = cartCollection.find();
            const result = await cursor.toArray()
            res.send(result)
        })
        






        
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);







app.get('/', (req, res) => {
    res.send('Server Is Running')
})



app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})