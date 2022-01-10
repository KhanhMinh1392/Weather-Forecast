var search = document.querySelector('.weather__search');
var city = document.querySelector('.weather__content-city');
var country = document.querySelector('.weather__content-country');
var value = document.querySelector('.value');
var shortDesc = document.querySelector('.weather__content-short--desc');
var visibility = document.querySelector('.weather__content-more--visibility span');
var wind = document.querySelector('.weather__content-more--wind span');
var sun = document.querySelector('.weather__content-more--sun span');
var time = document.querySelector('.weather__content-time');
var content = document.querySelector('.weather__content-more--content');
var body = document.querySelector('body');

// Ngày giờ
time.innerText = new Date().toLocaleString();

// =====================
async function changeWeatherUI(capitalSearch) {
   
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${capitalSearch}&appid=0cfa2e46baf1379bbb856c852e5f595e`

    let data = await fetch(apiURL).then(res=> res.json());
    
    console.log(data);

    if(data.cod = 200) {
        city.innerText = data.name;
        country.innerText = data.sys.country;
        visibility.innerText = data.visibility + 'm';
        wind.innerText = data.wind.speed + 'm/s';
        sun.innerText = data.main.humidity + '%';
        let temp = Math.round((data.main.temp - 273.15));
        value.innerText = temp;
        shortDesc.innerText = data.weather[0] ? data.weather[0].main : '';
        time.innerText = new Date().toLocaleString();

        body.setAttribute('class', 'hot');
        console.log(temp);
        if(temp < 20 ) {
            shortDesc.innerText = 'Cold';
            body.setAttribute('class', 'cold');
        }

        if(temp > 20 && temp < 30) {
            shortDesc.innerText = 'Cool'
            body.setAttribute('class', 'hot');
        }

        if (temp > 30) {
            shortDesc.innerText = 'Hot'
        }
    } else {
        content.classList.add('hide');
    }
    
}



search.addEventListener('keypress', function (e) {
    if(e.code === 'Enter') {
        let capitalSearch = search.value.trim();
        changeWeatherUI(capitalSearch);
    }
})
changeWeatherUI('Ha Noi');
