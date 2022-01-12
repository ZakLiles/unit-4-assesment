const complimentButton = document.getElementById("complimentButton");
const fortuneButton = document.getElementById("fortuneButton");
const form = document.querySelector('form');
const vehiclesContainer = document.querySelector('#vehicles-container');

const baseURL ="http://localhost:4000/api"

const vehicleCallback = ({ data: vehicles }) => displayVehicles(vehicles)
const errCallback = err => console.log(err);

const getCompliment = () => axios.get(`${baseURL}/compliment`).then((response) => alert(response.data));
const getFortune = () => axios.get(`${baseURL}/fortune`).then((response) => alert(response.data)); 

const getAllVehicles = () => axios.get(`${baseURL}/vehicles`).then(vehicleCallback).catch(errCallback)
const createVehicle = body => axios.post(`${baseURL}/vehicles`, body).then(vehicleCallback).catch(errCallback)
const deleteVehicle = id => axios.delete(`${baseURL}/vehicles/${id}`).then(vehicleCallback).catch(errCallback)
const updateVehicle = (id, type) => axios.put(`${baseURL}/vehicles/${id}`, {type}).then(vehicleCallback).catch(errCallback)

function submitHandler(e) {
    console.log('Submit clicked')
    e.preventDefault()

    let name = document.querySelector('#vehicle-name')
    let price = document.querySelector('#vehicle-price')
    let imageURL = document.querySelector('#vehicle-img')

    let bodyObj = {
        name: name.value,
        price: price.value, 
        imageURL: imageURL.value
    }

    createVehicle(bodyObj)

    name.value = ''
    price.value = ''
    imageURL.value = ''
}

function createVehicleCard(vehicle) {
    const vehicleCard = document.createElement('div')
    vehicleCard.classList.add('vehicle-card')

    vehicleCard.innerHTML = `<img alt='vehicle cover image' src=${vehicle.imageURL} class="vehicle-cover-image"/>
    <p class="name">${vehicle.name}</p>
    <div class="btns-container">
        <button onclick="updateVehicle(${vehicle.id}, 'minus')">-</button>
        <p class="vehicle-price">$${vehicle.price}</p>
        <button onclick="updateVehicle(${vehicle.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteVehicle(${vehicle.id})">delete</button>
    `


    vehiclesContainer.appendChild(vehicleCard)
}

function displayVehicles(arr) {
    vehiclesContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createVehicleCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)
complimentButton.addEventListener('click', getCompliment)
fortuneButton.addEventListener('click', getFortune)

getAllVehicles();