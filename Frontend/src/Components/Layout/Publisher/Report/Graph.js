import React, { useState, useEffect } from "react";
import { Chart } from "primereact";

function Graph() {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
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
          backgroundColor: documentStyle.getPropertyValue("--violet-500"),
          width: documentStyle.getPropertyValue("10px"),
          borderColor: documentStyle.getPropertyValue("--violet-500"),
          data: [65, 59, 80, 81, 56, 55, 40, 81, 56, 55, 40, 63],
        },
        {
          label: "Book Sold",
          backgroundColor: documentStyle.getPropertyValue("--skyblue-500"),
          borderColor: documentStyle.getPropertyValue("----skyblue-500"),
          data: [28, 48, 40, 19, 86, 27, 90, 81, 56, 55, 40, 56],
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: {
          labels: {
            fontColor: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);
  return (
    <>
      <Chart type="bar" data={chartData} options={chartOptions} />
    </>
  );
}

export default Graph;
