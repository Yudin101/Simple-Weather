const API_key = "YOUR_API_KEY"; // From https://home.openweathermap.org/api_keys


const now = new Date();

const month = now.getMonth() + 1;
const months = ["January", "February", "March", "April", "May", "June",  "July", "August", "September", "October", "November", "December"];

const date = now.getDate();

const day = now.getDay();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const hours = now.getHours();
const minutes = now.getMinutes();

navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
	
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`;

	fetch(url).then(response => response.json()).then(data => {
		document.getElementById('date').textContent = `${days[day]}, ${date} ${months[month]}`;
		document.getElementById('time').innerHTML = `${hours % 12}:${minutes < 10 ? '0' + minutes : minutes} ${(hours >= 12) ? 'PM' : 'AM'}`;
		document.getElementById('location').innerHTML = `${data.name}`;
		document.getElementById('temp').innerHTML = `<strong>${Math.round(data.main.temp - 273.15)}°C</strong>`;

		let main = document.getElementById('main');
		main.textContent = `${data.weather[0].main}`;

		document.getElementById('load').style.display = 'none';

		let image = document.getElementById('image');

		switch (data.weather[0].main){
			case 'Clear':
				image.src = '/assets/weather_images/clear.png';
				break;
			case 'Clouds':
				image.src = '/assets/weather_images/cloud.png';
				break;
			case 'Mist':
				image.src = '/assets/weather_images/mist.png';
				break;
			case 'Thunderstorms':
				image.src = '/assets/weather_images/thunderstorm.png';
				break;
		}

		image.style.display = 'inline';
	})
  },
  (error) => {
    console.error("Error getting location:", error.message);
  }
);