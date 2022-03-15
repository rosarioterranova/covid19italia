import { useState, useEffect } from "react";
import Header from "./components/Header";
import ChartData from "./components/ChartData";
import Tables from "./components/Tables";
import Loading from "./components/Loading";
import style from "./App.module.css";

const apiUrl =
  "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/dpc-covid19-ita-andamento-nazionale.json";

function App() {
  const [covidData, setCovidData] = useState(null);

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((dt) => setCovidData(dt));
  }, []);

  if (!covidData)
    return (
      <div className={style.loading}>
        <Loading />
      </div>
    );

  return (
    <div className="App">
      <Header />
      <div className="container">
        <ChartData covidData={covidData} />
        <Tables covidData={covidData} />
      </div>
    </div>
  );
}

export default App;
