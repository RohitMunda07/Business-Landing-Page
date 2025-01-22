document.querySelector("#search").addEventListener('click', () => {
    const city = document.querySelector("#searchBox").value;
    const apiKey = "1b0110a441f34f650995942829253788";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    if (!city) {
        alert("Please enter a valid city name.");
        return;
    }

    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) {
                throw new Error("City Not Found");
            }
            return response.json();
        })
        .then((data) => {
            // changing UI
            const temp = document.querySelector("#temp")
            const place = document.querySelector("#place")
            const humidity = document.querySelector("#humidity")
            const type = document.querySelector("#type")
            const wind = document.querySelector("#wind")
            const img = document.querySelector("#img")

            // Updating weather image based on weather condition
            const weatherCondition = data.weather[0].main.toLowerCase();
            if (weatherCondition.includes("haze")) {
                img.src = "./src/img/sunny.png";
            } else if (weatherCondition.includes("clear")) {
                img.src = "./src/img/sunny.png";
            } else if (weatherCondition.includes("cloud")) {
                img.src = "./src/img/cloudy.png";
            } else if (weatherCondition.includes("rain")) {
                img.src = "./src/img/rainy.png";
            } else if (weatherCondition.includes("thunderstorm")) {
                img.src = "./src/img/storm.png";
            } else {
                img.src = "./src/img/sunny.png"; // Fallback image
            }

            temp.innerHTML = `${data.main.temp}°C`
            place.innerHTML = `${data.name}`
            type.innerHTML = `${data.weather[0].main}`
            humidity.innerHTML = `${data.main.humidity}%`
            wind.innerHTML = `${data.wind.speed}km/h`

            // console part
            console.log("Temperature:", data.main.temp);
            console.log("Humidity:", data.main.humidity);
            console.log("Wind Speed:", data.wind.speed);
        })
        .catch((error) => {
            console.log(error);

        });
})

