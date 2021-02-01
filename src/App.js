import {useState, useEffect} from "react"
import Header from "./components/Header"
import ChartData from "./components/ChartData"
import Tables from "./components/Tables"
import Loading from "./components/Loading"

function App() {
  const [covidData, setCovidData] = useState(null)

  useEffect(()=>{
    fetch("https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json")
    .then(res => res.json())
    .then(dt => setCovidData(dt))
  },[])
  
  return (
    <div className="App">
      <Header />
      {covidData? <div className="container">
        <ChartData covidData={covidData}/>
        <Tables covidData={covidData}  />
      </div> : <Loading />}
    </div>
  );
}

export default App;
