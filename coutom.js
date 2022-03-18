

const getlocatoin= async ()=>{
    const url = 'http://ip-api.com/json/?fields=status,country,city,lat,lon,timezone';
    let response = await fetch(url);
    if (response.status===200) {
        const data = await  response.json();
        console.log(data);
        return data;
    } else {
        throw new Error("somting wrong please Check ...");
    }
    

};

const getwheater = async (lat,lon)=>{
    let api = "7f211fba7918b94a6b46deb05517fb51";

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`;

    const response =  await fetch(url);
    const data = await response.json();

    console.log(data);
    return data;
};


function  getdayornight() {
    
    let dayounight ;

    let d = new Date();

    if (d.getHours()>= 6 && d.getHours() <= 19) {
            dayounight = "Day";
    } else {
        dayounight = "Night";
    }
}

function getIcon(main) {
        let icon;
        switch (main){
            case 'Thunderstorm':
                icon = `${main}.svg`;
                break;

            case 'Drizzle':
                icon = `${main}.svg`;
                break;

            case 'Rain':
                icon = `${main}.svg`;
                break;

            case 'Snow':
                icon = `${main}.svg`;
                break;

            case 'Clear':
                const DayorNight = getdayornight();
                icon = `${main}-${DayorNight}.svg`;
                break;

            case "Clouds":
                icon = `${main}.svg`;
                break;

            case 'Atmosphere':
                icon = `${main}.png`;
                break;

        }

        return icon;
}


function getTemp(weTemp) {
    
    const k = weTemp;
    const f = (k- 273.15) * 9/5 +32;
    const c = k - 273.15;
    return temp = {kel:Math.floor(k), far:Math.floor(f), can:Math.floor(c)}; 

}


const getTimezone = document.querySelector(".timezone");
const icon = document.querySelector(".icon");
const degreeSeciton = document.querySelector(".degree-section");
const degree = document.querySelector(".degree-section h2");
const unit  = document.querySelector(".degree-section span");
const temperature = document.querySelector(".temperature-description");

const wallpaper = "./image/wallpaper1.webp";
const wallpaper1= "./image/wallpaper2.webp";
const wallpaper2 = "./image/wallpaper3.jpg";
const wallpaper3 = "./image/wallpaper4.jpg";
const bg = document.querySelector(".body");

getlocatoin().then( locatoindata=>{
    const timeZone = locatoindata.city + " / " + locatoindata.country;
    console.log(timeZone);
    getTimezone.textContent=timeZone;
    return getwheater(locatoindata.lat, locatoindata.lon);
}).then(wdata =>{
    const weTemp = wdata.main.temp;
    const weMain = wdata.weather[0].main;
    const weDes = wdata.weather[0].description;
    console.log(weTemp,weMain,weDes);

    const iconNmae = getIcon (weMain);
    icon.innerHTML=`<img src='icon/${iconNmae}' ></img>`;

    degree.textContent = Math.floor(weTemp);
    unit.textContent = "K";

    degreeSeciton.addEventListener("click",function (e) {
        if (unit.textContent== "K") {
            degree.textContent=getTemp(weTemp).far;
            unit.textContent="F";
            bg.style.backgroundImage=`url(${wallpaper2})`;
        } else if(unit.textContent== "F"){
            degree.textContent=getTemp(weTemp).can;
            unit.textContent="C";
            bg.style.backgroundImage=`url(${wallpaper3})`;
        }else{
            degree.textContent=getTemp(weTemp).kel;
            unit.textContent="K";
            bg.style.backgroundImage=`url(${wallpaper1})`;
        }
    });

    temperature.textContent= weDes;


});





