const express=require('express');
const fs = require('fs');
const path = require('path');
const { features } = require('process');

const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`API server now on ${PORT}!`);
});

function filterByQuery(query, animalsArray){
    let personalityTraitsArray = [];
    
     let filteredResults = animalsArray;
     if (query.personalityTraits) {
         //Save personalityTraits as a dedicated array.
         //If personalityTraits is a string, place it into a new array and save.
         if (typeof query.personalityTraits === 'string') {
             personalityTraitsArray = [query.personalityTraits];
         } else {
             personalityTraitsArray = query.personalityTraits;
         }
         // Loop through each trait in the personalityTraits array:
         personalityTraitsArray.forEach(trait => {
         // Check the trait against each animal in the filteredResults array.
         // it is initially a copy of the animalsArray,
         // here we're updating it for each trait in the .forEach() loop.
         // For each trait being targeted by the filter, the filteredResults
         // array will then contain only the entries that contain the trait,
         // so at the end we'll have an array of animals that have every one 
         // of the traits when the .forEach() loop is finished.
         filteredResults = filteredResults.filter(
             animal => animal.personalityTraits.indexOf(trait) !== -1
         );

         });
     }
    if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResults = filteredResults.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResults = filteredResults.filter(animal => animal.name === query.name)
    }
    //return the filtered results
    return filteredResults;
}

function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}

function createNewAnimal(body, animalsArray) {
    console.log(body);
    const animal = body;
    // pushes new animal to animal arrau
    animalsArray.push(animal);
    fs.writeFileSync(
        path.join(__dirname, './data/animals.json'),
        JSON.stringify({ animals: animalsArray }, null, 2)
    );

    // return finshed code to post route for response.
    //return body;
    return animal;
}

app.get('/api/animals', (req,res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);//return single animal
    }
    console.log(req.query);
    res.json(results);
    res.send('Hjnjknjo');
    res.json(animals);
});

app.get('/api/animals/:id', (req,res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

app.post('/api/animals', (req,res) => {
    //set id based on what the next index of the array will be
    req.body.id = animals.length.toString();

    // if any data in req.body is incorrect, send 400 error back
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted');
    } else {
        //add animal to json file and animals array in this function
        const animal = createNewAnimal(req.body, animals);
        //req.body is where our incoming content will be
        console.log(req.body);
    
        res.json(req.body);//send data back to client
        //access data on server side and do something with it. 
        //package it up as an object and send it to server
    }


});

function validateAnimal(animal) {
    if (!animal.name || typeof animal.name !== 'string') {
        return false;
    }
    if (!animal.species || typeof animal.species !== 'string'){
        return false;
    }
    if (!animal.diet || animal.diet !== 'string') {
        return false;
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        return false;
    }
    return true;
}


const { animals } = require('./data/animals.json');


