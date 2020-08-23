const getData = async () =>{
    try{
        const response = await fetch("https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json")
        const data = await response.json()
        return data
    }
    catch{
        alert("Errore: dati non disponibili, riprova più tardi")
        return {}
    }
}

const getInfo = (dataObj, param) => {
    let info = []
    dataObj.forEach(element => {
        info.push(element[param])
    })
    return info;
}

const renderChart = (dataObj) =>{
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
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
            <td id="positives">${dataObj[index].nuovi_positivi}</td>
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

const init = async () => {
    let dataObj = await getData();
    document.querySelectorAll(".data-showed").forEach(item => item.classList.remove("d-none"))
    document.querySelector(".spinner-container").classList.add("d-none")
    renderChart(dataObj)
    renderTable(dataObj)
}

init()