const body = document.querySelector('body'),
			time = document.querySelector('.time'),
			date = document.querySelector('.date'),
			season = document.querySelector('.year'),
			greeting = document.querySelector('.greeting'),
			name = document.querySelector('.name'),
			focus = document.querySelector('.focus'),
			blockquote = document.querySelector('blockquote'),
			figcaption = document.querySelector('figcaption'),
			weatherIcon = document.querySelector('.weather-icon'),
			temperature = document.querySelector('.temperature'),
			weatherDescription = document.querySelector('.weather-description'),
			weatherBox = document.querySelector('.weather-box');
			windSpeed = document.querySelector('.wind-speed'),
			humidity = document.querySelector('.humidity'),
			warning = document.querySelector('.warning'),
			city = document.querySelector('.city'),
			changeBGbutton = document.querySelector('.changeBGbutton'),
			clearLSbutton = document.querySelector('.clearStorage'),
			changeQuote = document.querySelector('.changeQuote'),
			toHide = document.querySelector('.to-hide'),
			toHide2 = document.querySelector('.to-hide2'),
			enterName = document.querySelector('.enter-name'),
			brackets = document.querySelectorAll('.brackets');
let bgCounter = Math.floor(Math.random() * 20),
	i,j;
	// tempText = ''

console.clear();
console.log(bgCounter);
// enterName.classList.add('hidden');

function showTime() {
	let today = new Date,
			year = today.getFullYear(),
			month = today.getMonth(),
			day = today.getDate(),
			weekDay = today.getDay(),
			hour = today.getHours(),
			min = today.getMinutes(),
			sec = today.getSeconds();
	
	function getWeekDay(weekDay) {
		switch(weekDay) {
			case 1:
				return 'Monday';
			case 2:
				return 'Tuesday';
			case 3:
				return 'Wednesday';
			case 4:
				return 'Thursday';
				break;
			case 5:
				return 'Friday';
			case 6:
				return 'Saturday';
			case 0:
				return 'Sunday';
			default:
				return '';
		};
	};
	
	function getSeason(month) {
		if ((month >= 0
				&& month < 2)
				|| month == 11) return 'Winter';
		if (month >= 2
				&& month < 5) return 'Spring';
		if (month >= 5
				&& month < 8) return 'Summer';
		if (month >= 8
				&& month < 11) return 'Autumn';		
	};
	
	function getMonth(month) {
		switch(month) {
			case 0:
				return 'January';
			case 1:
				return 'February';
			case 2:
				return 'March';
			case 3:
				return 'April';
			case 4:
				return 'May';
			case 5:
				return 'June';
			case 6:
				return 'July';
			case 7:
				return 'August';
			case 8:
				return 'September';
			case 9:
				return 'October';
			case 10:
				return 'November';
			case 11:
				return 'December';
		};
	};
	
	function decimalize(n) {
		return n < 10 ? '0' + n : n;
	};

	time.innerHTML = `${hour}:${decimalize(min)}:${decimalize(sec)}`;
	date.innerHTML = `${getWeekDay(weekDay)}, ${day} ${getMonth(month)}`;
	season.innerHTML = `${getSeason(month)}, ${year}`;
	
	if (min == 0 && sec == 0) setBackground();
	setTimeout(showTime, 1000);
}

function setBackground(iter = false) {
	let today = new Date,
			hour = today.getHours(),
			imgLink = 'assets/images';
			TimesOfDay = ['/morning/', '/day/', '/evening/',	'/night/'];
			greetingList = ['Good morning, ', 'Good day,', 'Good evening, ',	'Have a good night, '];
			images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
		
	function loadBGimage(address) {
		const body = document.querySelector('body');
		const src = address;
		const img = document.createElement('img');
		img.src = src;
		img.onload = () => {
			body.style.backgroundImage = `url(${src})`;
		};
	};
	
	function getImgSrc() {
		// bgCounter = bgCounter % images.length;
		
		function getTimesOfDay(hour) {
			if (!iter) {
				if (hour < 6) i = 3
					else if (hour < 12) i = 0
					else if (hour < 18) i = 1
					else i = 2;
			} else {
				if (bgCounter == images.length) {
					i++;
					i = i % 4;
				}
			};	
			return TimesOfDay[i];
		};
		
		function getImage(arr) {
			return {
				next: function() {
						if (bgCounter < arr.length) {
							return arr[bgCounter++];
						} else {
							bgCounter = 0;
							return arr[bgCounter++];
						};
				}
			}
		};
		
		// isIterated = false;
		changeBGbutton.disabled = true;
		setTimeout(function() { changeBGbutton.disabled = false }, 1000);
		return `${imgLink}${getTimesOfDay(hour)}${getImage(images).next()}`;
	};
		
	loadBGimage(getImgSrc());
	console.clear();
	console.log('Background #' + bgCounter + ' of ' + TimesOfDay[i]);
	
	function getGreetingText() {
				if (hour < 6) j = 3
					else if (hour < 12) j = 0
					else if (hour < 18) j = 1
					else j = 2;
			return greetingList[j];
	};
	
	greeting.textContent = getGreetingText();
};

function getName() {
  if (localStorage.getItem('name') === null) {
		greeting.classList.add('hidden');
		brackets.forEach( elem => elem.classList.remove('hidden'));
    name.textContent = 'enter name';
		toHide.classList.add('hidden');
  } else {
		enterName.classList.add('hidden');
		greeting.classList.remove('hidden');
		brackets.forEach( elem => elem.classList.add('hidden'));
    name.textContent = localStorage.getItem('name');
		toHide.classList.remove('hidden');
  }
}

function setName(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) name.blur();
  } else {
		if (name.innerText == '' || name.innerText == null) {
			enterName.classList.add('hidden');
			getName();
		} else {
			enterName.classList.add('hidden');
			greeting.classList.remove('hidden');
			brackets.forEach( elem => elem.classList.add('hidden'));
			localStorage.setItem('name', e.target.innerText);
			toHide.classList.remove('hidden');
		}
  }
}

function clearNameText() {
	enterName.classList.remove('hidden');
	greeting.classList.add('hidden');
	brackets.forEach( elem => elem.classList.add('hidden'));
	this.innerText = '';
	toHide.classList.add('hidden');
	this.focus();
}

function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[enter your current task]';
  } else {
		toHide2.classList.add('hidden');
    focus.textContent = localStorage.getItem('focus');
  }
}

function setFocus(e) {
  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) focus.blur();
  } else {
		if (focus.innerText == '' || focus.innerText == null) {
			getFocus();
		} else {
			localStorage.setItem('focus', e.target.innerText);
			toHide2.classList.add('hidden');
		}
  }
}

function clearFocusText() {
	toHide2.classList.remove('hidden');
	this.innerText = '';
	this.focus();
}

async function getQuote() {
	// const url = 'https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';
	const url = 'https://type.fit/api/quotes?method=get&format=json';
	try {
		const data = await fetch(url).then( res => res.json());
		// blockquote.textContent = data.quoteText;
		// figcaption.textContent = data.quoteAuthor;
		const m = Math.floor(Math.random() * 1643);
		blockquote.textContent = data[m].text;
		figcaption.textContent = data[m].author;
	} catch(error) {
		blockquote.textContent = 'Please, check console and get new quote later';
		figcaption.textContent = '';
	}
}

async function getWeather() {
  if (localStorage.getItem('city') === null) {
		localStorage.setItem('city', 'Minsk');
    city.textContent = localStorage.getItem('city');
	} else {
    city.textContent = localStorage.getItem('city');
	}
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=634b0d67ec10e6b80374dfefaba2459c&units=metric`;
	
	try {
		const res = await fetch(url);
		const data = await res.json(); 
		weatherIcon.className = 'weather-icon owf';
		weatherIcon.classList.add(`owf-${data.weather[0].id}`);
		temperature.textContent = `${data.main.temp}°C`;
		weatherDescription.textContent = data.weather[0].description;
		windSpeed.textContent = `wind speed ${data.wind.speed} m/s`;
		humidity.textContent = `humidity ${data.main.humidity}%`;

		weatherBox.classList.remove('hidden');
		windSpeed.classList.remove('hidden');
		humidity.classList.remove('hidden');
		warning.classList.add('hidden');
	} catch (error) {
		weatherBox.classList.add('hidden');
		windSpeed.classList.add('hidden');
		humidity.classList.add('hidden');
		warning.classList.remove('hidden');
	}
}

function setCity(event) {
  if (event.code === 'Enter') {
		if (city.textContent == '') 
    city.textContent = localStorage.getItem('city');
		localStorage.setItem('city', city.textContent);	
    getWeather();
    city.blur();
  }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', clearNameText);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', clearFocusText);
city.addEventListener('keypress', setCity);

showTime();
setBackground();
getName();
getFocus();
document.addEventListener('DOMContentLoaded', getQuote);
document.addEventListener('DOMContentLoaded', getWeather);

clearLSbutton.addEventListener('click', () => {
	localStorage.clear();
	location.reload();
});

changeBGbutton.addEventListener('click', () => {
	setBackground(true);
	body.insertAdjacentHTML('afterbegin',
	'<span class="inform">Check the console to navigate the background list</span>');
	setTimeout( () => document.querySelector('.inform').remove(), 2000);
});

changeQuote.addEventListener('click', getQuote);





