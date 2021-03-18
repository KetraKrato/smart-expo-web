import React,{useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import {historyService} from "../../services"
import { Divider } from '@material-ui/core';
import { RingVolume } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  cardDetail: {
    display: 'flex',
    justifyContent: "space-evenly",
    // alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));




export default function Pricing() {
  const classes = useStyles();
  const [conclude,setConClude] = useState([])
  const [device,setDevice] = useState([])
  const [age,setAge] = useState([])

    function AgeAnalz(rest) {
        let DataAge = [ { 
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
        rest.map((i)=>{
                
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

        return DataAge
    }


  React.useEffect(  async ()=>{
    
    console.log("start")

    let concludes = await historyService.getConcludeLocations().then((data)=>{
      console.log(data)
      data.data.event[0].locations.map((i)=>{
          i.devices.map( async (j)=>{
            let response = await historyService.getDeviceConcludion(j.id).then((data)=>
            {      console.log(data)
                    return data
            }).catch((e)=>{
                throw e
            })
            setDevice(response)
            let analy = AgeAnalz(response.data.history.age)
            setAge(analy)
            i.deviceDetail = response.data
            i.ageAnaly = analy
           })
   
     })
    
     return data

    }).catch((e)=>{
      throw e
    })
    console.log(concludes.data.event[0].locations)
    setConClude(concludes.data.event[0].locations)
   
    
  },[])

  useEffect(()=>{

  },[device])

  useEffect(()=>{

},[age])
  return (
  
        <Grid container spacing={3} alignItems="flex-end">
          {conclude.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={tier.id} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={3}>
              <Card>
                <CardHeader
                  title={tier.LocationName}
                  subheader={tier.LocationDetail}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      {
                       tier.devices.map((i)=>i.face_count)
                       .reduce((acc, bill) => bill + acc)
                      }

                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      /Vistor
                    </Typography>
                  </div>
                  
                  <div >
                  {tier.devices.sort((a, b) => a.face_count > b.face_count? 1:-1).map((i)=>(
                  <div className={classes.cardDetail} >
                  <Typography variant="h6" color="primary">
                      {i.device_name}     
                  </Typography>
                  
                  <Typography variant="h6" color="primary">
                  </Typography>
                  <Typography variant="h6" color="textSecondary">
                    ({i.genderMan}/Man) ({i.genderWoman}/Woman)
                  </Typography>

                  </div>
                  ))
                  }
                  </div>
                    <Divider></Divider>  
                    <br></br>     
                    <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h6" color="textPrimary">
                       EMOTIONS
                    </Typography>
            
                  </div>
                    <div >
                  {tier?.deviceDetail?.history?.emotions.map((i)=>(
                  <div className={classes.cardDetail} >
                  <Typography variant="h6" color="primary">
                    {i.emotions}   
                  </Typography>
                  
                  <Typography variant="h6" color="primary">
                  </Typography>
                  <Typography variant="h6" color="textSecondary">
                    {i.count} / vistor
                  </Typography>

                  </div>
                  ))
                  }
                  </div>
                  <Divider></Divider>  
                  <br></br>  
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h6" color="textPrimary">
                       RACE
                    </Typography>
            
                  </div>   
                    <div >
                  {tier?.deviceDetail?.history?.race.map((i)=>(
                  <div className={classes.cardDetail} >
                  <Typography variant="h6" color="primary">
                    {i.race}   
                  </Typography>
                  
                  <Typography variant="h6" color="primary">
                  </Typography>
                  <Typography variant="h6" color="textSecondary">
                    {i.count} / vistor
                  </Typography>

                  </div>
                  ))
                  }
                  </div>
                  <Divider></Divider>  
                  <br></br>  
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h6" color="textPrimary">
                       AGE
                    </Typography>
            
                  </div>   
                    <div >
                  {tier?.ageAnaly?.map((i)=>(
                  <div className={classes.cardDetail} >
                  <Typography variant="h6" color="primary">
                    {i.age}   
                  </Typography>
                  
                  <Typography variant="h6" color="primary">
                  </Typography>
                  <Typography variant="h6" color="textSecondary">
                    {i.value} / vistor
                  </Typography>

                  </div>
                  ))
                  }
                  </div>

                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained" color="primary">
                    SEE DETAIL
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
    
  );
}