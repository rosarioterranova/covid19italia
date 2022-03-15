import { useRef, useEffect } from "react";
import Chart from "chart.js";

export default function ChartData({ covidData }) {
  const ctxRef = useRef(null);

  useEffect(() => {
    createChart(ctxRef.current);
  }, [ctxRef]);

  function createChart(canvas) {
    const ctx = canvas.getContext("2d");
    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: covidData.map((x) =>
          new Date(x.data).toLocaleDateString(["ban", "id"])
        ),
        datasets: [
          {
            label: "Contagiati",
            data: covidData.map((x) => x.nuovi_positivi),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }

  return (
    <div className="chart my-3">
      <canvas ref={ctxRef}></canvas>
    </div>
  );
}
