const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// middle ware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.v0q5o0h.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        const homeCollection = client.db('houseHunter').collection('houseCollection');


        // Add New House
        app.post('/addHouse', async (req, res) => {
            const query = req.body;
            const result = await homeCollection.insertOne(query);
            res.send(result);
        })

        // Get new house dataS
        app.get('/addHouse', async (req, res) => {
            const query = {};
            const houses = await homeCollection.find(query).toArray();
            res.send(houses);
        });

    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('running');
})

app.listen(port, () => {
    console.log(port)
})