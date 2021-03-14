import React, {useEffect,useState} from 'react';
import { AreaChart,Area,LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import clsx from 'clsx';

import {
    Box,
    Button,
    Card,
    CardHeader,
    Divider,
    makeStyles
  } from '@material-ui/core';
import { useStore } from 'react-redux';
import moment from "moment"


const useStyles = makeStyles(() => ({
    root: {
          height:"640px"
    },
    actions: {
      justifyContent: 'flex-end'
    }
  }));

  

 const PureComponent = ({ className, ...rest }) => {
    const classes = useStyles();
    const [data,setpieData] = useState([
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
    } ])


    useEffect( ()=>{
      let  data = []
       rest.data?.slice(0,10).reverse().map((i)=>{
        if(i.timeslice != "" &&  i.timeslice != "test"  ) {  
        data.push({
                name:moment(i.timeslice).format(" DD/MM/YYYY HH:mm:ss"),
                value:parseInt(i.count_time)
            })
        }
       })
       setpieData(data)
        
      },[rest.data])

    return (
    <Card className={clsx(classes.root, className)} {...rest}>
        <CardHeader title="Vistor Attendance Report" />
        <Divider />
     <br></br>
      <AreaChart
        width={1080}
        height={520}
        data={data}
        margin={{
          top: 0,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >

        <CartesianGrid strokeDasharray="3 3"   />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="value" stackId="1" stroke="#0088FE" fill="#00C49F" />
        {/* <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} /> */}
      </AreaChart>
      </Card> 
    );
}

export default PureComponent