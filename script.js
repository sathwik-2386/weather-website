
async function getweather()
{
    const city=document.querySelector("#input").value;

   // console.log("city entered",city);


    const response=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`)
    const data=await response.json();

    console.log(data);

    if(!data.results|| data.results.length===0 )
    {
        console.log("city not found");

        return;
    }

const latitude=data.results[0].latitude;
const longitude=data.results[0].longitude;

const weatherUrl=`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current=temperature_2m,relative_humidity_2m,rain`
const weather=await fetch(weatherUrl);

const weatherdata=await weather.json();

//console.log(weatherdata);

/*console.log(latitude);
console.log(longitude);
console.log(weatherdata);*/



const temp=weatherdata.current.temperatue_2m;
const humidity=weatherdata.current.relative_humidity_2m;
const rain=weatherdata.current.rain;

/*console.log(temp));
console.log(humidity);
console.log(rain);*/


document.querySelector("#temp").textContent=temp;
document.querySelector("#humidity").textContent=humidity+"%";
document.querySelector("#rain").textContent=rain+"mm";


}

document.querySelector("form").addEventListener("submit",function(event)
{
    event.preventDefault();
    getweather();
});




