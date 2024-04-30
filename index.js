const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config()

// MiddleWare
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wvuyzyg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
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
    // await client.connect();
    const ARcollection = client.db("ArtnCartDB").collection("ArtnCart")
    const ArtAndCartCategories = client.db("ArtnCartDB").collection("artAndCraftCategories")


    app.get('/artncraft', async(req, res) =>{
      const cursor = ARcollection.find()
      const result = await cursor.toArray();
      res.send(result)
    })
    app.get('/artandcraftcategories', async(req, res) =>{
      const cursor = ArtAndCartCategories.find()
      const result = await cursor.toArray();
      res.send(result)
    })

    app.get('/artncraft/:id', async(req, res) =>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)}
      const result = await ARcollection.findOne(query)
      res.send(result)
    })

    app.get('/artncraft/:id', async(req, res) =>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)}
      const result = await ARcollection.findOne(query)
      res.send(result)
    })
    app.put('/artncraft/:id', async(req, res) =>{
      const id = req.params.id;
      const filter = {_id : new ObjectId(id)}
      const options = {upsert : true};
      const updatedArtsAndCrafts = req.body
      const ArtsAndCrafts = {
        $set: {

          item_name : updatedArtsAndCrafts.item_name,
          subcategory : updatedArtsAndCrafts.subcategory,
          description : updatedArtsAndCrafts.description,
          price : updatedArtsAndCrafts.price,
          rating : updatedArtsAndCrafts.rating,
          photo : updatedArtsAndCrafts.photo,
          processingTime : updatedArtsAndCrafts.processingTime,
          customization : updatedArtsAndCrafts.customization,
          inStock : updatedArtsAndCrafts.inStock
        }
      }
        const result = await ARcollection.updateOne(filter, ArtsAndCrafts, options)
        res.send(result);
    })


  

    app.delete('/artncraft/:id', async(req, res) =>{
      const id = req.params.id;
      const query = {_id : new ObjectId(id)}
      const result = await ARcollection.deleteOne(query)
      res.send(result)
    })

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('hello world')
})

app.listen(port, ()=>{
  console.log(`the port is running in ${port}`)
})
