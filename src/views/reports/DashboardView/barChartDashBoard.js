import React,{useEffect,useState} from 'react'
import { BarChart, CartesianGrid, XAxis, YAxis, Bar, Cell,} from 'recharts'
import clsx from 'clsx';

import {
    Box,
    Button,
    Card,
    CardHeader,
    Divider,
    makeStyles
  } from '@material-ui/core';
import './rechart.css' ;

 
const useStyles = makeStyles(() => ({
    root: {
          height:"640px"
    },
    actions: {
      justifyContent: 'flex-end'
    }
  }));


  


const BarChartComponents  = ({ className, ...rest }) => {
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
    } ])

   
    useEffect( ()=>{
      let  data = []
       rest.data?.map((i)=>{
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
    <CardHeader title="Bar Chart Age" />
   <Divider />
   <br></br>
  <div style={{width: '100vw', height: '100vh'}}>
    <BarChart width={500} height={500} data={pieData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis  dataKey="name" />
      <YAxis />
      <Bar label={true} dataKey="value" fill="#8884d8" >
      {
     pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)

      }
      </Bar>
    </BarChart>
  </div>
  </Card> )

};

export default BarChartComponents   