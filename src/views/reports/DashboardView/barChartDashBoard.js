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
    const [age,setAge] =useState([
      { 
        age: "-",
        value: 0,
      },
      {
        age: "small child",
        value: 0,
      },{
        age: "Child",
        value: 0,
      }, { 
        age: "Teens",
        value: 0,
      },
      {
        age: "Young",
        value: 0,
      },{
        age: "adult",
        value: 0,
      },{
        age: "older",
        value: 0,
      }

    ])
    useEffect( ()=>{
               //1-4        5-12     13-18 19-24   25-59      60  >  
            let DataAge = age
            rest.data.map((i)=>{
            for (const [key, value] of Object.entries(i)) {
                 let  keyData = parseInt(key)
                 let  valueData = parseInt(value)

                 if(keyData ==0) DataAge[0].value = valueData
                
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
    <BarChart width={500} height={500} data={age}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="age" />
      <YAxis />
      <Bar label={true} dataKey="value" fill="#8884d8" />
    </BarChart>
  </div>
  </Card> )

};

export default BarChartComponents   