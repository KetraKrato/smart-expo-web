// src/components/pie.rechart.js

import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, CartesianGrid } from "recharts";
import clsx from "clsx";

import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    height: "550px",
  },
  actions: {
    justifyContent: "flex-end",
  },
}));

const BarChart = ({ className, ...rest }) => {
  const classes = useStyles();
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#DC143C",
    "#AF19FF",
    "#FF6347",
  ];
  const [age, setAge] = useState([
    {
      age: "-",
      value: 100,
    },
    {
      age: "small child",
      value: 0,
    },
    {
      age: "Child",
      value: 0,
    },
    {
      age: "Teens",
      value: 0,
    },
    {
      age: "Young",
      value: 0,
    },
    {
      age: "adult",
      value: 0,
    },
    {
      age: "older",
      value: 0,
    },
  ]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#ffff",
            padding: "5px",
            border: "1px solid #cccc",
          }}
        >
          <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
        </div>
      );
    }

    return null;
  };

  useEffect(() => {
    let DataAge = [
      {
        age: "-",
        value: 0,
      },
      {
        age: "15-18 ปี",
        value: 0,
      },
      {
        age: "19-22 ปี",
        value: 0,
      },
      {
        age: "23-28 ปี",
        value: 0,
      },
      {
        age: "29-35 ปี",
        value: 0,
      },
      {
        age: "36-45 ปี",
        value: 0,
      },
      {
        age: "46 ปีขึ้นไป",
        value: 0,
      },
    ];
    //1-4        5-12     13-18 19-24   25-59      60  >
    rest.data?.map((i) => {
      let agekey = 0,
        countKey = 0;
      for (const [key, value] of Object.entries(i)) {
        if (key == "age") {
          agekey = parseInt(value);
        } else if (key == "count") {
          countKey = parseInt(value);
        }
        //  console.log(`${key}: ${value}`);
      }
      // console.log(agekey ,countKey)
      if (agekey == 0) DataAge[0].value = countKey;
      else if (agekey > 14 && agekey < 19) DataAge[1].value += countKey;
      else if (agekey > 18 && agekey < 23) DataAge[2].value += countKey;
      else if (agekey > 22 && agekey < 29) DataAge[3].value += countKey;
      else if (agekey > 28 && agekey < 36) DataAge[4].value += countKey;
      else if (agekey > 35 && agekey < 46) DataAge[5].value += countKey;
      else if (agekey > 46) DataAge[6].value += countKey;
    });
    setAge(DataAge);
    console.log(DataAge);
  }, [rest.data]);

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        dataKey="value"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        titleTypographyProps={{ variant: "h2" }}
        title="Pie Chart Age"
      />
      <Divider />
      <br></br>
      <PieChart width={550} height={450}>
        <Pie
          data={age}
          color="#000000"
          dataKey="value"
          nameKey="age"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          labelLine={false}
          label={renderCustomizedLabel}
        >
          {age.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          layout="vertical"
          verticalAlign="middle"
          align="right"
          iconSize="20"
          wrapperStyle={{ fontSize: "30px" }}
        />
      </PieChart>
    </Card>
  );
};

export default BarChart;
