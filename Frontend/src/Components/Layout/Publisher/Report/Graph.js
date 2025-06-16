import React, { useState, useEffect } from "react";
import { Chart } from "primereact";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Graph() {
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "october",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Book Published",
        backgroundColor: "rgba(139, 92, 246, 0.5)",
        borderColor: "rgba(139, 92, 246, 1)",
        data: [65, 59, 80, 81, 56, 55, 40, 40, 50, 53, 40, 63],
      },
      {
        label: "Book Sold",
        backgroundColor:  "rgba(56, 189, 248, 0.5)",
        borderColor:  "rgba(56, 189, 248, 1)",
        data: [28, 48, 40, 19, 86, 27, 80, 81, 56, 55, 40, 56],
      },
    ],
  };
  return (
    <>
      {/* <Chart type="bar" data={chartData} options={chartOptions} /> */}
      <Line data={data}/>
    </>
  );
}

export default Graph;
