import React,{useEffect, useState} from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from '../../../components/Page';
import SerachDashBoard from "./searchHistory"
import Divider from '@material-ui/core/Divider';
import History from "./History"
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();


  useEffect(async ()=>{
    
    // console.log("start")

    // let concludes = await historyService.getConcludeHistory().then((data)=>{
    //   return data
  
    // }).catch((e)=>{
    //   throw e
    // })
    // setConClude(concludes.data.history)
   
    
  },[])


  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
        <Grid item lg={12} sm={12} xl={12} xs={12}>
            <SerachDashBoard> </SerachDashBoard>
          </Grid>
          <Grid item lg={12} sm={12} xl={12} xs={12}>
                    <History></History>
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
