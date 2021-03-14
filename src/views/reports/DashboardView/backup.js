// src/components/pie.rechart.js

import React,{useState,useEffect} from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import clsx from 'clsx';

import {
    Box,
    Button,
    Card,
    CardHeader,
    Divider,
    makeStyles
  } from '@material-ui/core';

 
  const useStyles = makeStyles(() => ({
    root: {
          height:"560px"
    },
    actions: {
      justifyContent: 'flex-end'
    }
  }));


const BarChart = ({ className, ...rest }) => {

    const classes = useStyles();
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#DC143C','#AF19FF',"#FF6347"];
    const [pieData  ,setpieData] = useState([
        {
            "name": "Chrome",
            "value": 68.85
        },
        {
            "name": "Firefox",
            "value": 7.91
        },
        {
            "name": "Edge",
            "value": 6.85
        },
        {
            "name": "Internet Explorer",
            "value": 6.14
        },
        {
            "name": "Others",
            "value": 10.25
        }
    ])
   

    const  CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc' }}>
                    <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
                </div>
            );
        }

        return null;
    };

    useEffect( ()=>{
      let  data = []
       rest.data.map((i)=>{
        if(i.emotions != "" &&  i.emotions != "test"  ) {  
        data.push({
                name:i.emotions,
                value:parseInt(i.count)
            })
        }
       })
       setpieData(data)
        
      },[rest.data])


        return (
            <Card className={clsx(classes.root, className)} {...rest}>
             <CardHeader title="Pie Chart Emotions" />
            <Divider />
            <PieChart width={500} height={500}>
                <Pie data={pieData} color="#000000" dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={200} fill="#8884d8" >
                    {
                        pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
            </PieChart>
            </Card>
        )
    };

export default BarChart