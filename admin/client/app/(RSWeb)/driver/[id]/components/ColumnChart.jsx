"use client";
import React from "react";
import ReactApexChart from "react-apexcharts";

const ColumnChart = () => {
  const series = [
    // {
    //   name: 'Dummy', // Name for the first series
    //   data: [0, 0, 0, 0, 0, 0], // Data for the first series (set to 0)
    // },
    {
      name: "PRODUCT B",
      data: [13, 23, 20, 8, 13, 27, 44, 8, 13, 67, 22, 43],
    },
    {
      name: "PRODUCT C",
      data: [67, 22, 43, 44, 55, 41, 13, 23, 20, 8, 13, 27],
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 450,
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: true,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          total: {
            enabled: false,
          },
          value: {
            enabled: false,
          },
        },
        barWidth: 5,
        barHeight: "100%",
      },
    },
    xaxis: {
      type: "category",
      categories: [
        "Monthly",
        "",
        "",
        "",
        "",
        "Weekly",
        "",
        "",
        "",
        "",
        "Yearly",
      ],
      title: {
        text: " ",
        style: {
          position: "top",
        },
      },
    },
    yaxis: {
      type: "category",
      categories: [
        "Monthly",
        "",
        "",
        "",
        "",
        "Weekly",
        "",
        "",
        "",
        "",
        "Yearly",
      ],
      title: {
        text: " ",
        style: {
          position: "top",
        },
      },
    },
    legend: {
      show: false,
      position: "top",
      offsetY: 40,
    },
    fill: {
      colors: ["#007ACC", "#00FF00"],
    },
  };

  return (
    <div className="column-chart mt-10">
      <div className="y-axis-labels"></div>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={400}
      />
    </div>
  );
};

export default ColumnChart;
