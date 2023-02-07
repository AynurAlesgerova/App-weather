const form= document.querySelector("form")
const input= document.querySelector("input")
const searchList= document.querySelector(".serach-list")
const ul= document.querySelector("ul")
const weatherDegree=document.querySelector(".weather-degree")
const city=document.querySelector(".city span")
const iconBox= document.querySelector(".iconBox img")
const detail_list=document.querySelector(".detail-list")


//  Default Page
if (input.value.length<=0) {
    getMyIP()
}

async function getMyIP(){
    let loc= await fetch('https://api.ipify.org/?format=json')
    let info =  await loc.json()
    getAddress(info.ip)
}

async function  getAddress(ipAdress){
    const location = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_3ABdh2hDkV9KvZAq1udD0gsy38mNu&ipAddress=${ipAdress}`)
    let info =  await location.json()
    let myCity= info.location.region
    weather(myCity)
    city.innerHTML=myCity
}

form.addEventListener("submit", (e)=> {
    if (input.value!=="" ) {                      
        e.preventDefault()
        weather(input.value)
        city.innerText=input.value
        saveData(input.value)
        input.value=""
    }
    else{
        alert("Please add city name!")
        console.log("noo");
    }
})

function weather(data){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data}&units=metric&appid=0eac55ada7a5bccf27415f260472820c`)
    .then(response => {
        return response.json()
    })
    .then((data) => {
        weatherDegree.innerHTML=parseInt(data.main.temp) +"&#176;"

        const arrWeather= data.weather
        detail_list.innerHTML=""

        arrWeather.forEach((obj,index) => {
            const icon= obj.icon
            iconBox.src= ` http://openweathermap.org/img/wn/${icon}@2x.png`

            const cloudyInfo= document.createElement('li')
            cloudyInfo.classList.add("cloudyInfo")
            cloudyInfo.innerHTML="Cloudy"+ " "+obj.description
            console.log(cloudyInfo);
            detail_list.appendChild(cloudyInfo)

            const humidityInfo= document.createElement('li')
            humidityInfo.classList.add("humidityInfo")
            humidityInfo.innerHTML="Humidity"+ " "+data.main.humidity +"%"
            detail_list.appendChild(humidityInfo)

            const windInfo= document.createElement('li')
            windInfo.classList.add("windInfo")
            windInfo.innerHTML="Wind"+ " "+data.wind.speed+"km/h"
            detail_list.appendChild(windInfo)
        });
       
    })
}

let arr=JSON.parse(localStorage.getItem("arr")) ? JSON.parse(localStorage.getItem("arr")) : [];

function saveData(data){       
    arr.push(data)
    localStorage.setItem("arr", JSON.stringify(arr))
}

function addToSearchList(){         
    searchList.innerHTML=""
    arr.forEach((el) => {
        searchList.innerHTML+=`<li>${el}</li>`
    })
}
addToSearchList()







