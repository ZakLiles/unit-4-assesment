const vehicles = require('./db.json')
let globalId = 4;

module.exports = {
    getCompliment: (req, res) => {
            const compliments = ["Gee, you're a smart cookie!",
                               "Cool shirt!",
                               "Your Javascript skills are stellar.",
            ];
          
            // choose random compliment
            let randomIndex = Math.floor(Math.random() * compliments.length);
            let randomCompliment = compliments[randomIndex];
          
            res.status(200).send(randomCompliment);
    },
    getFortune: (req, res) => {
            const fortunes = ["A fresh start will put you on your way",
                               "Any day above ground is a good day.",
                               "All your hard work will soon pay off.",
                     "Disbelief destroys the magic.",
                     "Go take a rest; you deserve it."
            ];
          
            // choose random compliment
            let randomIndex = Math.floor(Math.random() * fortunes.length);
            let randomFortune = fortunes[randomIndex];
          
            res.status(200).send(randomFortune);
    },
    getVehicles: (req, res) => {  
            res.status(200).send(vehicles);
    },
    createVehicle: (req, res) => {
        let {name, price, imageURL} = req.body;
        let newVehicle = {
            id: globalId,
            name,
            price: +price,
            imageURL
        }
        vehicles.push(newVehicle);
        res.status(200).send(vehicles);
        globalId++;
    },
    updateVehicle: (req, res) => {
        let {id} = req.params;
        let {type} = req.body;
        let index = vehicles.findIndex((elem) => elem.id === +req.params.id);

        if(type === "plus") {
            vehicles[index].price+=1000;
            res.status(200).send(vehicles);
        } else if(type === "minus"){
            vehicles[index].price-=1000;
            res.status(200).send(vehicles);
        }
    },
    deleteVehicle: (req, res) => {
        let index = vehicles.findIndex((elem) => elem.id === +req.params.id);
        vehicles.splice(index, 1);
        res.status(200).send(vehicles);
    },
}