const getData = async () =>{
    const response = await fetch("https://api.covid19api.com/dayone/country/italy")
    const data = await response.json()
    return data
}

const getDate = async () => {
    const data = await getData()
    let date = []
    data.forEach(element => {
        date.push(new Date(element.Date).toLocaleDateString())
    })
    return date;
}

const getConfirmed = async () => {
    const data = await getData()
    let confirmedToday = []
    let oldCondifermed = 0;
    data.forEach(element => {
        let newCases = element.Confirmed - oldCondifermed;
        oldCondifermed += newCases;
        confirmedToday.push(newCases)
    })
    return confirmedToday;
}

const renderChart = async () =>{
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: await getDate(),
            datasets: [{
                label: 'Contagiati',
                data: await getConfirmed(),
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

const createTableElement = (date, infected) =>{
    return htmlEl = `
    <tr>
        <th scope="row">${date}</th>
        <td>${infected}</td>
    </tr>`;
}

const renderTable = async () =>{
    const table = document.querySelector("#table-elements")
    const dates = await getDate()
    const confirmed = await getConfirmed()
    for (let index = dates.length-1; index > 0; index--) {
        table.innerHTML +=  createTableElement(dates[index], confirmed[index])
    }
}


renderChart();
renderTable();