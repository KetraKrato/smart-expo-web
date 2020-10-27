import React,{useState,useEffect} from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Budget from './Budget';
import LatestOrders from './LatestOrders';
import LatestProducts from './LatestProducts';
import Sales from '../../../components/Cards/CardUsers';
import TasksProgress from './TasksProgress';
import TotalCustomers from './TotalCustomers';
import TotalProfit from './TotalProfit';
import TrafficByDevice from './TrafficByDevice';
import Customer from "../../customer/CustomerListView"
import Chart from './Chart';
import axios from 'axios';
import socketIOClient from 'socket.io-client'
import moment from "moment"
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
 const classes = useStyles();
 const [value,setValue] = useState([])
 const [found,setFound] = useState(false)
 const [dataWhite,setDataWhite] = useState([])
 

  useEffect(()=>{
    console.log("start")
    const socket = socketIOClient("http://localhost:9000")
    socket.on('new-message', (messageNew) => {
        if(messageNew.faceid!= undefined)
                axios.get(`http://localhost:3000/upload/`+messageNew.faceid)
                .then(res => {
                  if (res.data.message == "Profile not found"){
                    var i={...messageNew,message:res.data.message
                      ,timeStamp:moment().format("HH:mm:ss"),
                      data:res.data.data,
                    }
                    // console.log(i)
                     var  list = [] 
                     list = value
                     list.push(i)
                     list = list.reverse()
                    // console.log(list)
                     setValue(list)
                     setFound(true)

                    
                     
                  }
                  else {
                  res.data.data.map((j)=> {
                    // console.log(j)
                      
                    i = {...messageNew,match:j.image
                        ,face_user_Id:j.faceid
                        ,message:res.data.message
                        ,name:j.first_name,
                        surname:j.last_name,
                        mob_no:j.mob_no,
                      timeStamp:moment().format("HH:mm:ss")
                      }
                      // console.log(j)
                      var white = [] 
                      white = dataWhite
                      
                      white.push(i)
                      
                      white = white.reverse()
                      
                      // if(list[list.length-1].message != "Profile not found")
                      setDataWhite(white)

                      setFound(true)
                    })
                  }
                 })
   
     
              // console.log(res.data)
              // enqueueSnackbar('I love snacks.');
    
    
      // console.log(messageNew)

  })
    
  },[])

  useEffect(()=>{
    setFound(false)
  },[found])

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          {/* { value.map((i)=>
          <div key={i}> hello</div>
          )} */}
         <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Budget />
          </Grid>
         
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalCustomers />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TasksProgress />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalProfit />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
         
           <Chart  />
            <Sales  data= {dataWhite} />

          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestProducts data= {value} />
          </Grid>
         
        
      
           <Grid
             item
             lg={8}
             md={12}
             xl={9}
             xs={12}
           >
            <Customer data= {dataWhite} ></Customer>
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice />
          </Grid>
          {/* <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
