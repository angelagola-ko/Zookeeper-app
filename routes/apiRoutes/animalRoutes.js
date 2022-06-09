
const router = require('express').Router();
const { filterByQuery, findById, createNewAnimal, validateAnimal} = require('../../lib/animals');
const { animals } = require('../../data/animals')

router.get('/animals', (req,res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);//return single animal
    }
   // console.log(req.query);
    res.json(results);
});

router.get('/animals/:id', (req,res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

//app.post changed to router to be accessible
router.post('/animals', (req,res) => {
    //set id based on what the next index of the array will be
    req.body.id = animals.length.toString();
    
    // if any data in req.body is incorrect, send 400 error back
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted');
    } else {
        //add animal to json file and animals array in this function
        const animal = createNewAnimal(req.body, animals);
        //req.body is where our incoming content will be
      //  console.log(req.body);
    
        res.json(animal);//send data back to client
        //access data on server side and do something with it. 
        //package it up as an object and send it to server
    }
    
    
});

module.exports = router;