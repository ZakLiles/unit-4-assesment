const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

const {getCompliment, getFortune, updateVehicle, createVehicle, deleteVehicle} = require('./controller');

app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);
app.post('/api/vehicle', createVehicle);
app.put('/api/vehicle', updateVehicle);
app.delete('/api/vehicle', deleteVehicle);

app.listen(4000, () => console.log("Server running on 4000"));
