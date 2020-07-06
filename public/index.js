const searchElement = document.querySelector('.city-search');
const temperatureIcon = document.querySelector('.temp-icon');
const temperatureDegree = document.querySelector('.temp-degree');
const temperatureOption = document.querySelector('.degree-section');
const tempMeasurement = document.querySelector('.temp-option');
const tempMeasurementSmall = document.querySelector('.temp-option-small');
const temperatureFeels = document.querySelector('.temp-feels');
const temperatureDescription = document.querySelector('.temp-description');
const windDegree = document.querySelector('.wind-degree');
const locationTimezone = document.querySelector('.city');
const searchBox = new google.maps.places.SearchBox(searchElement);
let long;
let lat;
let city;

const nearTemperatureData = ({ timezone, current }) => {
	locationTimezone.textContent = timezone.replace(/^(.*[\\\/])/, '').replace(/_/g, ' ');
	temperatureDegree.textContent = Math.floor(current.temp - 273.15);
	temperatureFeels.textContent = `Feels like ${Math.floor(current.temp - 273.15)} C°`;
	temperatureDescription.textContent = `looks like ${current.weather[0].description}`;
	temperatureIcon.src = `http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
};

const cityWeatherInfo = ({ main, weather }) => {
	locationTimezone.textContent = city;
	temperatureDegree.textContent = Math.floor(main.temp - 273.15);
	temperatureFeels.textContent = `Feels like ${Math.floor(main.feels_like - 273.15)} C°`;
	temperatureDescription.textContent = `looks like ${weather[0].description}`;
	temperatureIcon.src = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
	tempMeasurement.textContent = 'C°';
	tempMeasurementSmall.textContent = '/F°';
};

const nearWindDirection = data => {
	let degree = data.current.wind_deg;
	ifWindDirection(degree);
};

const cityWindDirection = data => {
	let degree = data.wind.deg;
	ifWindDirection(degree);
};

const nearTemperature = data => {
	temperatureOption.addEventListener('click', () => {
		if (tempMeasurement.textContent === 'C°') {
			tempMeasurement.textContent = 'F°';
			tempMeasurementSmall.textContent = '↔ C°';
			temperatureDegree.textContent = Math.floor((data.current.temp - 273.15) * (9 / 5) + 32);
			temperatureFeels.textContent = `Feels like ${Math.floor((data.current.feels_like - 273.15) * (9 / 5) + 32)} F°`;
		} else {
			tempMeasurement.textContent = 'C°';
			tempMeasurementSmall.textContent = '↔ F°';
			temperatureDegree.textContent = Math.floor(data.current.temp - 273.15);
			temperatureFeels.textContent = `Feels like ${Math.floor(data.current.feels_like - 273.15)} C°`;
		}
	});
};

const ifWindDirection = degree => {
	if (degree > 337.5 || degree < 22.5) {
		windDegree.textContent = 'and the wind blows to the north';
	} else if (degree > 292.5) {
		windDegree.textContent = 'and the wind blows to the north east';
	} else if (degree > 247.5) {
		windDegree.textContent = 'and the wind blows to the west';
	} else if (degree > 202.5) {
		windDegree.textContent = 'and the wind blows to the south west';
	} else if (degree > 157.5) {
		windDegree.textContent = 'and the wind blows to the south';
	} else if (degree > 122.5) {
		windDegree.textContent = 'and the wind blows to the south east';
	} else if (degree > 67.5) {
		windDegree.textContent = 'and the wind blows to the east';
	} else if (degree > 22.5) {
		windDegree.textContent = 'and the wind blows to the north east';
	} else {
		windDegree.textContent = 'and the wind blows to the north';
	}
};

window.addEventListener('load', () => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lat = position.coords.latitude;
			const location = {
				method: 'POST',
				headers: { 'content-Type': 'application/json' },
				body: JSON.stringify({ lat, long }),
			};

			fetch('http://localhost:3000/nearby', location)
				.then(res => res.json())
				.then(data => {
					nearTemperatureData(data);
					nearWindDirection(data);
					nearTemperature(data);
				});
		});
	}
});

searchBox.addListener('places_changed', () => {
	const place = searchBox.getPlaces()[0];

	if (place == null) return;
	city = place.address_components[0].long_name;

	fetch(`http://localhost:3000/search/${city}`)
		.then(response => response.json())
		.then(data => {
			cityWeatherInfo(data);
			cityWindDirection(data);
		});
});
