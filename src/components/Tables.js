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
  const [pageIndex, setpageIndex] = useState(0);
  const [nextEnabled, setNextEnabled] = useState(true);
  const [prevEnabled, setPrevEnabled] = useState(false);

  useEffect(() => {
    if (pageIndex === 0) {
      setNextEnabled(true);
      setPrevEnabled(false);
    } else if (pageIndex + 10 > data.length) {
      setNextEnabled(false);
      setPrevEnabled(true);
    } else {
      setNextEnabled(true);
      setPrevEnabled(true);
    }
  }, [pageIndex]);

  const nextDatapageIndex = () => {
    setpageIndex(pageIndex + 10);
  };

  const prevDatapageIndex = () => {
    setpageIndex(pageIndex - 10);
  };

  const getDeceduti = (el, index) => {
    if (data[index + pageIndex + 1])
      return (
        el.deceduti - data[index + pageIndex + 1].deceduti
      ).toLocaleString();
    else return "-";
  };

  const getTamponi = (el, index) => {
    if (data[index + pageIndex + 1])
      return (
        el.tamponi - data[index + pageIndex + 1].tamponi
      ).toLocaleString();
    else return "-";
  };

  const formatDate = (date) => {
    const dateArray = date.split("/");
    dateArray[0] = ("0" + dateArray[0]).slice(-2);
    dateArray[1] = ("0" + dateArray[0]).slice(-2);
    return dateArray.join("/");
  };

  return (
    <div>
      <table className="table my-3">
        <thead>
          <tr>
            <th scope="col" className="text-center">
              Data
            </th>
            <th scope="col" className="text-center">
              Positivi
            </th>
            <th scope="col" className="text-center">
              Deceduti
            </th>
            <th scope="col" className="text-center">
              Tamponi
            </th>
          </tr>
        </thead>
        <tbody>
          {data.slice(pageIndex, pageIndex + 10).map((el, index) => (
            <tr key={index}>
              <th scope="row" className="text-center">
                {formatDate(new Date(el.data).toLocaleDateString())}
              </th>
              <td className="text-center">
                {el.nuovi_positivi.toLocaleString()}
              </td>
              <td className="text-center">{getDeceduti(el, index)}</td>
              <td className="text-center">{getTamponi(el, index)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        onPrevPage={prevDatapageIndex}
        onNextPage={nextDatapageIndex}
        prevEnabled={prevEnabled}
        nextEnabled={nextEnabled}
        pageIndex={pageIndex / 10 + 1}
        totalPages={Math.ceil(data.length / 10)}
      />
    </div>
  );
}
