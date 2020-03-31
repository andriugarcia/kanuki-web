// express/routes/index.js sample
const {Router} = require('express')
const router = Router()
var base64 = require('file-base64');

var bodyParser = require('body-parser')
router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

router.post('/api/template', (req, res) => {
    console.log(req.body)
    base64.decode(req.body.file, 'file.txt', function(err, output) {
        console.log('success');
    });
    res.send('OK')
})

module.exports = router