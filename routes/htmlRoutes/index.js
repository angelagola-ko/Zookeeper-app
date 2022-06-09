const path = require('path');
const router = require('express').Router();

router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});


router.get('/animals', (req,res) => {//normal HTML page
res.sendFile(path.join(__dirname, '../../public/animals.html'));
});

router.get('/zookeepers', (req,res) => {
res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});
//catches errors in routes and brings to homepage *=wildcard
router.get('*', (req, res) => {
res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;