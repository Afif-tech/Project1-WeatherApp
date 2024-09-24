const express = require("express");
const router = express.Router();
const weatherController = require("../controllers/weatherController");


router.get('/', (req, res) => {
    res.render('index', {error: null});
})

router.get('/forecast', weatherController.getWeatherForecast);

module.exports = router;