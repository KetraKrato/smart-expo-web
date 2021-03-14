// src/components/pie.rechart.js

import React,{useState,useEffect} from "react";
import { PieChart, Pie, Cell, Tooltip, Legend,CartesianGrid } from 'recharts';
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
          height:"580px"
    },
    actions: {
      justifyContent: 'flex-end'
    }
  }));


const BarChart = ({ className, ...rest }) => {

    const classes = useStyles();
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#DC143C','#AF19FF',"#FF6347"];
            const [age,setAge] =useState([ { 
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
            },
            {
            age: "adult",
            value: 0,
            },{
            age: "older",
            value: 0,
            }])
   

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
        let DataAge = [ 
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
        },
        {
          age: "adult",
          value: 0,
        },{
          age: "older",
          value: 0,
        }]
        //1-4        5-12     13-18 19-24   25-59      60  >  
              rest.data?.map((i)=>{
                
                let agekey = 0 ,countKey = 0 
                for (const [key, value] of Object.entries(i)) {
                  if(key == "age")
                    {
                      agekey =  parseInt(value)
                    }
                  else if( key == "count")
                    {
                     countKey = parseInt(value)
                    }
                   //  console.log(`${key}: ${value}`);
                }        
                // console.log(agekey ,countKey)
                if (agekey == 0) DataAge[0].value = countKey
                else if (agekey >0 &&agekey < 5) DataAge[1].value += countKey
                else if (agekey >4 &&agekey < 13) DataAge[2].value += countKey
                else if (agekey >12 &&agekey < 19) DataAge[3].value += countKey
                else if (agekey >18 &&agekey < 25) DataAge[4].value += countKey
                else if (agekey >24 &&agekey < 60) DataAge[5].value += countKey
                else if (agekey >60) DataAge[6].value += countKey
            
            })
          setAge(DataAge)
          console.log(DataAge)
          },[rest.data])


        return (
            <Card className={clsx(classes.root, className)} {...rest}>
             <CardHeader title="Pie Chart Emotions" />
            <Divider />
            <br></br>
            <PieChart width={500} height={500}>

                <Pie data={age} color="#000000" dataKey="value" nameKey="age" cx="50%" cy="50%" outerRadius={200} fill="#8884d8" >
                    {
                        age.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
            </PieChart>
            </Card>
        )
    };

export default BarChart