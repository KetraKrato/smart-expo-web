import React,{useEffect, useState} from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from '../../components/Page';
import SearchLocations from "./searchLocation"
import ReportLocations from "./ReportLocations"
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

 

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
        <Grid item lg={12} sm={12} xl={12} xs={12}>
            <SearchLocations> </SearchLocations>
          </Grid>

        </Grid>
            <ReportLocations > </ReportLocations>

      </Container>
    </Page>
  );
};

export default Dashboard;
