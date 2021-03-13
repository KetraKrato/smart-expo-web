import React,{useEffect,useState} from 'react'
import { BarChart, CartesianGrid, XAxis, YAxis, Bar} from 'recharts'
import clsx from 'clsx';

import {
    Box,
    Button,
    Card,
    CardHeader,
    Divider,
    makeStyles
  } from '@material-ui/core';

const data = [
  { 
    time: "pon",
    users: 1,
  },
  {
    time: "wt",
    users: 3,
  },{
    time: "śr",
    users: 7,
  }
]
const useStyles = makeStyles(() => ({
    root: {
          height:"560px"
    },
    actions: {
      justifyContent: 'flex-end'
    }
  }));


  



const BarChartComponents  = ({ className, ...rest }) => {
    const classes = useStyles();
    useEffect( ()=>{
        let  data = []           //0-4        5-12     13-18 19-24   25-59      60  >  
        let rangeAgeSteing =  ["small child","Child","Teens","Young","adult","older"]

        rest.data.map((i)=>{
            for (const [key, value] of Object.entries(i)) {
                console.log(`${key}: ${value}`);
              }        
        })
      
        //  rest.data.map((i)=>{
        //   if(i.age != "" &&  i.emotions != "test"  ) {  
        //   data.push({
        //           name:i,
        //           value:parseInt(i.count)
        //       })
        //   }
        //  })
          
        },[rest.data])
    return (
    <Card className={clsx(classes.root, className)} {...rest}>
    <CardHeader title="Bar Chart Age" />
   <Divider />
  <div style={{width: '100vw', height: '100vh'}}>
    <BarChart width={500} height={500} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Bar label={true} dataKey="users" fill="#8884d8" />
    </BarChart>
  </div>
  </Card> )

};

export default BarChartComponents   