export default function Tables({covidData}){

    const range = covidData.filter(x => new Date(x.data).getTime() > new Date("2020-06-01").getTime()).reverse()

    return(
        <table class="table my-3">
            <thead>
                <tr>
                <th scope="col">Data</th>
                <th scope="col">Nuovi Positivi</th>
                <th scope="col">Deceduti</th>
                <th scope="col">Tamponi</th>
                </tr>
            </thead>
            <tbody>
            {range.map(el => (
                <tr>
                    <th scope="row">{new Date(el.data).toLocaleDateString(['ban', 'id'])}</th>
                    <td>{el.nuovi_positivi}</td>
                    <td>{el.deceduti}</td>
                    <td>{el.tamponi}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}