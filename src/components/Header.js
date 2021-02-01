export default function Header(){
    return(
        <div className="jumbotron text-center">
            <h1 className="display-4">Covid-19 Italia</h1>
            <p className="lead">Strumento online open source per monitorare giorno per giorno il numero dei contagiati di <a href="https://it.wikipedia.org/wiki/COVID-19">COVID-19</a> in Italia.</p>
            <hr className="my-4" />
            <p>
                Web App di <a href="http://rosarioterranova.com">Rosario Terranova</a> |
                Dati Ufficiali <a href="https://github.com/pcm-dpc/COVID-19">Presidenza del Consiglio dei Ministri - Dipartimento della Protezione Civile</a> |
                Grafici di <a href="https://www.chartjs.org/">ChartJS</a>, fatta in <a href="https://reactjs.org/">React.js</a>
            </p>
        </div>
    )
}