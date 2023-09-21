var express = require('express');
var router = express.Router();

let options =  {
    headers: {
        'Accept': 'application/json'
    },
    method: 'GET'
};
const fetchResource = () => {
    let response = fetch('/public/data/dummyDB.json', options);
    return (response);
}
router.get('/', async (req, res) => {
    let resource = await fetchResource
    res.send(resource);
});

module.exports = router;
