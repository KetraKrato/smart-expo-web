import React, { useEffect, useState } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Page from "../../../components/Page";
import TotalVistor from "../../Event/EventView/VistorAllforDashboard";
import TotalVistorWhite from "../../Event/EventView/VistorWhiteList";
import TotalVistorBlack from "../../Event/EventView/VistorBlackList";
import TotalVistorStanger from "../../Event/EventView/Stanger";
import MapView from "./Map/MapView";
import GraphDashboard from "./GraphDashboard";
import PieChart from "./PieChartDashboard";
import { historyService } from "../../../services";
import TotalGenderMan from "./genderMan";
import TotalGenderWoman from "./genderWoman";
import BarChart from "./barChartDashBoard";
import SerachDashBoard from "./serachDashboard";
import Divider from "@material-ui/core/Divider";
import BarChartHorizontal from "./barChartHorizontal";
import ManWoman from './ManWoman';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  const [conclude, setConClude] = useState({
    allHistory: 0,
    stanger: 0,
    verify: 0,
    warning: 0,
    genderMan: 0,
    genderWoman: 0,
    emotions: [],
    age: [],
  });

  useEffect(async () => {
    console.log("start");

    let concludes = await historyService
      .getConcludeHistory()
      .then((data) => {
        return data;
      })
      .catch((e) => {
        throw e;
      });
    setConClude(concludes.data.history);
    console.log(conclude);
  }, []);

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container 
        spacing={3}
        >
          <Grid item lg={12} sm={12} xl={12} xs={12}>
            <SerachDashBoard> </SerachDashBoard>
          </Grid> 
          <Grid item lg={3} xs={4}>
          <TotalVistor data={conclude?.allHistory} />
          </Grid>
          <Grid item xl={4} xs={4}>
            <Grid container spacing={3}>
               
              <Grid item lg={3} sm={6} xl={12} xs={12}>
            <TotalVistorStanger data={conclude?.stanger} />
          </Grid>
          <Grid item lg={3} sm={6} xl={12} xs={12}>
            <TotalVistorWhite data={conclude?.verify} />
          </Grid>
          <Grid item lg={3} sm={6} xl={12} xs={12}>
            <TotalVistorBlack data={conclude?.warning} />
          </Grid>
            </Grid>
          </Grid>
          <Grid item xl={5} xs={5}>
          <Grid item lg={4} md={6} xl={12} xs={12}>
                <ManWoman data={{ Man : conclude?.genderMan,Woman : conclude?.genderWoman}} ></ManWoman>
          </Grid>
          </Grid>
          <Grid item xl={12}>
          <Grid container spacing={3}>
              <Grid item lg={4} md={6} xl={4} xs={12}>
                <PieChart data={conclude?.age}></PieChart>
          </Grid>
          <Grid item lg={8} md={8} xl={8} xs={12}>
                  <GraphDashboard data={conclude?.time_report}></GraphDashboard>
              </Grid>
          {/* <Grid item lg={4} md={6} xl={4} xs={12}>
            <BarChartHorizontal data={conclude?.race}></BarChartHorizontal>
          </Grid> */}
            </Grid>
          </Grid>
          {/* <Grid item lg={3} sm={6} xl={2} xs={12}>
            <TotalVistor data={conclude?.allHistory} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalVistorStanger data={conclude?.stanger} />
          </Grid> */}
          {/* <Grid item lg={3} md={6} xl={2} xs={12}>
            <TotalGenderMan data={conclude?.genderMan} />
          </Grid> */}
         {/*} <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalVistorWhite data={conclude?.verify} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalVistorBlack data={conclude?.warning} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalVistorStanger data={conclude?.stanger} />
          </Grid>
          <Grid item lg={3} md={6} xl={3} xs={12}>
            <TotalGenderMan data={conclude?.genderMan} />
          </Grid>
          <Grid item lg={3} md={6} xl={3} xs={12}>
            <TotalGenderWoman data={conclude?.genderWoman} />
            {/* <MainVideo />
          </Grid> */}
          <Grid item lg={3} md={6} xl={3} xs={12}>
            {/* < TotalGenderMan data= {conclude?.genderMan} /> */}
          </Grid>
          {/* <Grid item xs={12}>
             <Divider variant="middle" /> 
          </Grid> */}
          {/* <Grid item lg={8} md={8} xl={8} xs={8}>
            <GraphDashboard data={conclude?.time_report}></GraphDashboard>
          </Grid> */}

          <Grid item lg={4} md={6} xl={4} xs={12}>
            {/* <BarChart data={conclude?.emotions}></BarChart> */}
          </Grid>

          <Grid item lg={4} md={6} xl={4} xs={12}>
            {/* <MainVideo /> */}
            {/* <PieChart data={conclude?.age}></PieChart> */}
          </Grid>
          {/* <Grid item lg={4} md={6} xl={4} xs={12}>
            
            <BarChartHorizontal data={conclude?.race}></BarChartHorizontal>
          </Grid> */}

          <Grid item lg={4} md={6} xl={4} xs={4}>
            {/* <GraphDashboard></GraphDashboard> */}
            {/* <MapView></MapView> */}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
