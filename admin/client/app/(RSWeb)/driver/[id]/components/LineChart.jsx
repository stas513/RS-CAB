import React from "react";
import ReactApexChart from "react-apexcharts";
import "./../../../globals.css";

const LineChart = () => {
  const series = [
    {
      name: "Series 1",
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 110, 90, 80, 70, 60, 50],
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        show: true,
        style: {
          fontSize: "12px",
        },
      },
    },
    stroke: {
      curve: "smooth",
      colors: ["#88C507"],
      width: 5,
      shadow: {
        enabled: true,
        color: "#CCCCCC",
        top: 100,
        left: 100,
        blur: 10,
        opacity: 10, // Shadow opacity (0.2 = 20% opacity)
      },
    },
  };

  return (
    <div className="line-chart ">
      <div className="w-full md:w-[100%] sm:w-[100%]">
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={400}
        />
      </div>
    </div>
  );
};

export default LineChart;
