var express = require('express');
var router = express.Router();

const fetchResource = () => {
    let response;
    let options =  {
        headers: {
            'Accept': 'application/json'
        },
        method: 'GET',
        body: JSON.stringify(response)
        };
    response = fetch('/public/data/dummyDB.json', options);
    return (response);
}
router.get('/', async (req, res) => {
    let resource = await fetchResource
    res.send(resource);
});

module.exports = router;
