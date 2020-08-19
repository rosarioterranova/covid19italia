const getEveryDayData = async (country) =>{
    try{
        const response = await fetch("https://api.covid19api.com/dayone/country/"+country)
        const data = await response.json()
        return data
    }
    catch{
        alert("Errore: dati non disponibili, riprova più tardi")
        return {}
    }
}

const getDates = (dataObj) => {
    let date = []
    dataObj.forEach(element => {
        date.push(new Date(element.Date).toLocaleDateString())
    })
    return date;
}

const getConfirmed = (dataObj) => {
    let confirmed = []
    let oldCondifermed = 0;
    dataObj.forEach(element => {
        let newCases = element.Confirmed - oldCondifermed;
        oldCondifermed += newCases;
        confirmed.push(newCases)
    })
    return confirmed;
}

const renderChart = (dates, confirmed) =>{
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Contagiati',
                data: confirmed,
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

const renderTable = (dates, confirmed) =>{
    const table = document.querySelector("#table-elements")
    for (let index = dates.length-1; index > 0; index--) {
        table.innerHTML += `
        <tr>
            <th scope="row">${dates[index]}</th>
            <td>${confirmed[index]}</td>
        </tr>
        `
    }
}

const init = async () => {
    let dataObj = await getEveryDayData("italy");
    console.log(dataObj)
    let dates = getDates(dataObj)
    let confirmed = getConfirmed(dataObj)
    renderChart(dates, confirmed);
    renderTable(dates, confirmed);
}

init()