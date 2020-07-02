var container = document.getElementsByClassName("container")[0];

count = 0;

async function getCountryData() {
    try {
        var fetchDataOfCountry = await fetch(
            "https://restcountries.eu/rest/v2/all"
        );
        var dataCountry = await fetchDataOfCountry.json();
        console.log(dataCountry);
        dataCountry.forEach((item) => {
            if (count % 3 == 0) {
                tempRow = document.createElement("div");
                tempRow.setAttribute(
                    "class",
                    "row justify-around margin-bottom-top"
                );
            }
            tempCol = document.createElement("div");
            tempCol.setAttribute("class", "col-3 inner");
            tempCol.innerHTML = `<div class="card" style="width: 18rem;">
                        <img
                            src= ${item.flag}
                            class="card-img-top"
                            alt="Image Not Available"
                            height = "100px"
                            width = "100px"
                        />
                        <div class="card-body inner">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">
                                <div class = "bold-text">
                                    Capital: - ${item.capital}
                                </div>
                                 <div class = "bold-text">
                                    Region: - ${item.region}
                                </div>
                                <div class = "bold-text">
                                    Numeric Code : - ${item.numericCode}
                                </div>
                            </p>
                            <button class = "btn btn-primary buttons x-${item.name}-${item.capital}">Check Weather</button>
                        </div>
                    </div>`;
            tempRow.appendChild(tempCol);
            container.appendChild(tempRow);
            count++;
        });
        var buttons1 = document.querySelectorAll(".buttons");
        buttons1.forEach((item) => {
            item.addEventListener("click", async () => {
                try {
                    tempArr = item.getAttribute("class").split("-");
                    city = tempArr[tempArr.length - 1];
                    country = tempArr[tempArr.length - 2];
                    var openWeatherAPI = await fetch(
                        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=239d2ab0725487985ced65a61ed64df5`
                    );
                    var data1 = await openWeatherAPI.json();
                    alert(
                        `The temprature of ${country} is ${Math.round(
                            data1.main.temp - 273.15
                        )} Celcius`
                    );
                } catch (err) {
                    alert(`Sorry! ${country} is not in database.`);
                    console.log(err);
                }
            });
        });
    } catch (err) {
        console.log(err);
    }
}
getCountryData();
