Vue.component("info",{
    template:`
    <div class="jumbotron text-center">
      <h1 class="display-4">Covid-19 Italia</h1>
      <p class="lead">Strumento online open source per monitorare giorno per giorno il numero dei contagiati di <a href="https://it.wikipedia.org/wiki/COVID-19">COVID-19</a> in Italia.</p>
      <hr>
      <p>
          Web App di <a href="http://rosarioterranova.com">Rosario Terranova</a> |
          Dati Ufficiali <a href="https://github.com/pcm-dpc/COVID-19">Presidenza del Consiglio dei Ministri - Dipartimento della Protezione Civile</a> |
          Grafici di <a href="https://www.chartjs.org/">ChartJS</a>
      </p>
    </div>
    `
})

Vue.component("spinner", {
    template:`
    <div class="container text-center spinner-container">
      <div class="spinner-border" role="status" style="width: 5rem; height: 5rem;">
        <span class="sr-only">Caricamento...</span>
      </div>
      <p>Caricamento...</p>
    </div>
    `
})

Vue.component("chart",{
    template:`
    <div class="chart-container text-center data-showed">
        <canvas id="myChart"></canvas>
    </div>
    `
})

Vue.component("data-table", {
    template:`
    <div class="table-responsive-sm my-5 data-showed">
        <table class="table table-striped table-sm ">
            <thead>
              <tr>
                <th>Data</th>
                <th>Ricoverati con sintomi</th>
                <th>Terapia intensiva</th>
                <th>Tot. ospedalizzati</th>
                <th>Isolamento domiciliare</th>
                <th>Tot. positivi</th>
                <th>Variazione tot. positivi</th>
                <th>Nuovi positivi</th>
                <th>Dimessi guariti</th>
                <th>Deceduti</th>
                <th>Casi da sospetto diagnostico</th>
                <th>Casi da screening</th>
                <th>Tot. casi</th>
                <th>Tamponi</th>
                <th>Casi testati</th>
              </tr>
            </thead>
            <tbody id="table-elements">
            </tbody>
          </table>
    </div>
    `
})

Vue.component("all-data", {
    template:`
    <div>
        <spinner v-show="!isDataReady"></spinner>
        <chart v-show="isDataReady"></chart>
        <data-table v-show="isDataReady"></data-table>
    </div>
    `,
    data(){
        return{
            data: [],
            isDataReady: false
        }
    },
    created(){
        this.getData()
    },
    methods:{
        async getData(){
            try{
                const response = await fetch("https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json")
                this.data = await response.json()
                this.isDataReady = true
                renderChart(this.data)
                renderTable(this.data)
            }
            catch{
                this.data = {error: "error getting data"}
            }
        }
    }
})

const getInfo = (dataObj, param) => {
    let info = []
    dataObj.forEach(element => {
        info.push(element[param])
    })
    return info;
}

const renderChart = (dataObj) => {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: getInfo(dataObj,"data").map(x => new Date(x).toLocaleDateString()),
            datasets: [{
                label: 'Contagiati',
                data: getInfo(dataObj,"nuovi_positivi"),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

const renderTable = (dataObj) =>{
    const table = document.querySelector("#table-elements")
    for (let index = dataObj.length -1; index > 0; index--) {
        table.innerHTML += `
        <tr>
            <th scope="row">${new Date(dataObj[index].data).toLocaleDateString()}</th>
            <td>${dataObj[index].ricoverati_con_sintomi}</td>
            <td>${dataObj[index].terapia_intensiva}</td>
            <td>${dataObj[index].totale_ospedalizzati}</td>
            <td>${dataObj[index].isolamento_domiciliare}</td>
            <td>${dataObj[index].totale_positivi}</td>
            <td>${dataObj[index].variazione_totale_positivi}</td>
            <td class="bg-warning">${dataObj[index].nuovi_positivi}</td>
            <td>${dataObj[index].dimessi_guariti}</td>
            <td>${dataObj[index].deceduti}</td>
            <td>${dataObj[index].casi_da_sospetto_diagnostico}</td>
            <td>${dataObj[index].casi_da_screening}</td>
            <td>${dataObj[index].totale_casi}</td>
            <td>${dataObj[index].tamponi}</td>
            <td>${dataObj[index].casi_testati}</td>
        </tr>
        `
    }
}

const app = new Vue({
    el:"#app"
})