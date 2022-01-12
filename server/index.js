const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

const {getCompliment, getFortune, getVehicles, updateVehicle, createVehicle, deleteVehicle} = require('./controller');

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);
app.get('/api/vehicles', getVehicles)
app.post('/api/vehicles', createVehicle);
app.put('/api/vehicles/:id', updateVehicle);
app.delete('/api/vehicles/:id', deleteVehicle);

app.listen(4000, () => console.log("Server running on 4000"));
