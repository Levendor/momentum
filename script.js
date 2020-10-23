const time = document.querySelector('.time'),
			date = document.querySelector('.date'),
			season = document.querySelector('.year'),
			greeting = document.querySelector('.greeting'),
			name = document.querySelector('.name'),
			focus = document.querySelector('.focus'),
			changeBGbutton = document.querySelector('.changeBGbutton');
let bgCounter = localStorage.getItem('bgCounter') ? localStorage.getItem('bgCounter') : Math.floor(Math.random() * 20),
	i,j;
			
// localStorage.setItem('bgCounter', bgCounter);

console.clear();
console.log(bgCounter);

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



showTime();
setBackground();
changeBGbutton.addEventListener('click', () => {
	setBackground(true);
});










