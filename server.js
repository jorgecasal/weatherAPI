require('dotenv').config();
const express = require('express');
const app = express();
const fetch = require('node-fetch');
const apiKey = process.env.WEATHER_API_KEY;
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json({}));

app.post('/nearby', (req, res) => {
	const urlNear = `https://api.openweathermap.org/data/2.5/onecall?lat=${req.body.lat}&lon=${req.body.long}&appid=${apiKey}`;
	fetch(urlNear)
		.then(res => res.json())
		.then(data => res.send(data));
});

app.get('/search/:city', (req, res) => {
	const urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${req.params.city}&appid=${apiKey}`;

	fetch(urlCity)
		.then(res => res.json())
		.then(data => res.send(data));
});

app.listen(PORT, () => console.log(`Server started and listening on port ${PORT}`));
