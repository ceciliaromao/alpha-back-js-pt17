const body = document.querySelector('body');
const stateSelected = document.querySelector('#state');
const citySelected = document.querySelector('#city');
const msg = document.querySelector("#msg");
const cityCtn = document.querySelector('#city-ctn');
const weatherTableCtn = document.querySelector('#result-table');
const weatherTable = document.querySelector('#table');

//on loading page, states must be listed on state select component
window.addEventListener("load", () => {
  body.style.cursor = 'wait';
  getStatesList();
  body.style.cursor = 'default';
});

function getStatesList() {
  stateSelected.innerHTML = `<option value="" selected>Selecione...</option>`;
  const states = `https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome`;
  body.style.cursor = 'wait';
  getStateData(states)
    .then(res => {
      for (let el of res) {
        stateSelected.innerHTML += `<option value="${el.id}" >${el.nome}</option>`
      }
    })
    .catch(err => {
      msg.textContent = err;
    });
}

function getStateData(url) {
  return new Promise((resolve, reject) => {
    fetch(url, { method: 'GET' })
      .then(res => {
        return (res.status === 200 ? res.json() : Promise.reject('Carregando UFs...'));
      })
      .then(function (data) {
        let state = {};
        let statesList = [];
        for (let el of data) {
          state = { id: el.id, nome: el.nome };
          statesList.push(state);
        }
        resolve(statesList);
      })
      .catch(err => {
        reject(err);
      });
  });
}

//on choosing a state, cities must be listed on city select component
stateSelected.addEventListener('change', getCitiesList);

function getCitiesList() {
  cityCtn.style.display = 'none';
  weatherTableCtn.style.display = 'none';

  citySelected.innerHTML = `<option value="" selected>Selecione...</option>`
  const cities = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateSelected.value}/municipios?orderBy=nome`;
  body.style.cursor = 'wait';
  getCityData(cities)
    .then(res => {
      for (let el of res) {
        citySelected.innerHTML += `<option value="${el.id}" >${el.nome}</option>`
      }
    })
    .catch(err => {
      msg.textContent = err;
    });
  cityCtn.style.display = 'flex';
  body.style.cursor = 'default';
}

function getCityData(url) {
  return new Promise((resolve, reject) => {
    fetch(url, { method: 'GET' })
      .then(res => {
        return (res.status === 200 ? res.json() : Promise.reject('Carregando Municípios...'))
      })
      .then(function (data) {
        let city = {};
        let citiesList = [];
        for (let el of data) {
          city = { id: el.id, nome: el.nome };
          citiesList.push(city);
        }
        resolve(citiesList);
      })
      .catch(err => {
        reject(err);
      });
  })
}

//on choosing the city, weather table must be shown with correct data
citySelected.addEventListener('change', getWeatherTable);

function getWeatherTable() {
  const cityTitle = citySelected.children[citySelected.selectedIndex];
  const stateTitle = stateSelected.children[stateSelected.selectedIndex];
  
  weatherTable.innerHTML = ` <tr><th colspan="7">${cityTitle.textContent} - ${stateTitle.textContent}</th></tr>
                              <tr> 
                                  <th>Data</th> 
                                  <th colspan="2">Dia da Semana</th> 
                                  <th colspan="2">Resumo</th>
                                  <th>Mínima (°C)</th>
                                  <th>Máxima (°C)</th>
                              </tr>`

  const weather = `https://apiprevmet3.inmet.gov.br/previsao/${citySelected.value}`;
  body.style.cursor = 'wait';
  getWeatherData(weather)
    .then(res => {
      for (let i = 0; i < res.length; i++) {
        const newRow = weatherTable.insertRow(i + 2);
        const newCell1 = newRow.insertCell(0);
        const newCell2 = newRow.insertCell(1);
        const newCell3 = newRow.insertCell(2);
        const newCell4 = newRow.insertCell(3);
        const newCell5 = newRow.insertCell(4);
        const newCell6 = newRow.insertCell(5);
        const newCell7 = newRow.insertCell(6);

        newCell1.innerHTML = `${res[i].date}`;
        newCell2.innerHTML = `${res[i].weekDay}`;
        newCell3.innerHTML = `${res[i].period}`;
        newCell4.innerHTML = `${res[i].resum}`;
        newCell5.innerHTML = `<img src="${res[i].icon}" width="40px" height="40px">`;
        newCell6.innerHTML = `${res[i].temp_min}`;
        newCell7.innerHTML = `${res[i].temp_max}`;
      }
      weatherTableCtn.style.display = 'block';
    })
    .catch(err => {
      msg.textContent = err;
    });
  body.style.cursor = 'default';
}

function getWeatherData(url) {
  return new Promise((resolve, reject) => {
    fetch(url, { method: 'GET' })
      .then(res => {
        return (res.status === 200 ? res.json() : Promise.reject('Carregando tabela...'))
      })
      .then(function (data) {
        let weatherList = [];
        let weather = {};
        let count = 1;
        for (let el in data) {
          for (let day in data[el]) {
            if (count < 2) {
              weather = {
                date: day,
                weekDay: data[el][day]["manha"].dia_semana,
                period: 'Manhã',
                resum: data[el][day]["manha"].resumo,
                icon: data[el][day]["manha"].icone,
                temp_min: data[el][day]["manha"].temp_min,
                temp_max: data[el][day]["manha"].temp_max,
              };
              weatherList.push(weather);

              weather = {
                date: day,
                weekDay: data[el][day]["tarde"].dia_semana,
                period: 'Tarde',
                resum: data[el][day]["tarde"].resumo,
                icon: data[el][day]["tarde"].icone,
                temp_min: data[el][day]["tarde"].temp_min,
                temp_max: data[el][day]["tarde"].temp_max,
              };
              weatherList.push(weather);

              weather = {
                date: day,
                weekDay: data[el][day]["noite"].dia_semana,
                period: 'Noite',
                resum: data[el][day]["noite"].resumo,
                icon: data[el][day]["noite"].icone,
                temp_min: data[el][day]["noite"].temp_min,
                temp_max: data[el][day]["noite"].temp_max,
              };
              weatherList.push(weather);
            } else if (count == 2) {
              weather = {
                date: day,
                weekDay: data[el][day]["tarde"].dia_semana,
                period: '',
                resum: data[el][day]["tarde"].resumo,
                icon: data[el][day]["tarde"].icone,
                temp_min: data[el][day]["tarde"].temp_min,
                temp_max: data[el][day]["tarde"].temp_max,
              };
              weatherList.push(weather);
            } else if (count < 5) {
              weather = {
                date: day,
                weekDay: data[el][day].dia_semana,
                period: '',
                resum: data[el][day].resumo,
                icon: data[el][day].icone,
                temp_min: data[el][day].temp_min,
                temp_max: data[el][day].temp_max,
              };
              weatherList.push(weather);
            };
            count++;
          };
        };
        resolve(weatherList);
      })
      .catch(err => {
        reject(err);
      });
  });
}


