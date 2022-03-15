import { useState, useEffect } from "react";
import Pagination from "./Pagination";

export default function Tables({ covidData }) {
  const [data, setData] = useState(
    covidData
      .filter(
        (x) => new Date(x.data).getTime() > new Date("2020-06-01").getTime()
      )
      .reverse()
  );
  const [index, setIndex] = useState(0);
  const [nextEnabled, setNextEnabled] = useState(true);
  const [prevEnabled, setPrevEnabled] = useState(false);

  useEffect(() => {
    if (index === 0) {
      setNextEnabled(true);
      setPrevEnabled(false);
    } else if (index + 10 > data.length) {
      setNextEnabled(false);
      setPrevEnabled(true);
    } else {
      setNextEnabled(true);
      setPrevEnabled(true);
    }
  }, [index]);

  function nextDataIndex() {
    setIndex(index + 10);
  }

  function prevDataIndex() {
    setIndex(index - 10);
  }

  return (
    <div>
      <table className="table my-3">
        <thead>
          <tr>
            <th scope="col">Data</th>
            <th scope="col">Nuovi Positivi</th>
            <th scope="col">Deceduti Totali</th>
            <th scope="col">Tamponi Totali</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(index, index + 10).map((el, index) => (
            <tr key={index}>
              <th scope="row">{new Date(el.data).toLocaleDateString()}</th>
              <td>{el.nuovi_positivi}</td>
              <td>{el.deceduti}</td>
              <td>{el.tamponi}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        onPrevPage={prevDataIndex}
        onNextPage={nextDataIndex}
        prevEnabled={prevEnabled}
        nextEnabled={nextEnabled}
        pageIndex={index / 10 + 1}
        totalPages={Math.ceil(data.length / 10)}
      />
    </div>
  );
}
