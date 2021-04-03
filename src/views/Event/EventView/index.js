import React, { useEffect, useState } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Page from "../../../components/Page";
import TotalVistor from "./VistorAll";
import TotalVistorWhite from "./VistorWhiteList";
import TotalVistorBlack from "./VistorBlackList";
import TotalVistorStanger from "./Stanger";
import MapView from "./Map/MapView";
import Video from "../Video/Video";
import socketIOClient from "socket.io-client";
import { apiConstants } from "../../../_constants";
import axios from "axios";
import DeviceMonitor from "./DeviceMonitor";
import CardNotification from "./Card/CardNotification";
import History from "../History/History";
import { historyService } from "../../../services";
import { useLocation } from "react-router-dom";
import quryString from "query-string";
import TotalStaff from "./VistorStaff";

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
  const location = useLocation();
  const [noti, setNoti] = useState([]);
  const [found, setFound] = useState(false);
  const [deviceId, setDeviceId] = useState("1");
  const socket = socketIOClient("http://localhost:9000");

  const [conclude, setConClude] = useState({
    allHistory: 0,
    stanger: 0,
    verify: 0,
    warning: 0,
    staff:0
  });
  useEffect(() => {
    if (location.search != undefined) {
      setDeviceId(quryString.parse(location.search).id);
    }
  }, [location]);

  useEffect(async () => {
    let concludes = await historyService
      .getConcludeHistory()
      .then((data) => {
        return data;
      })
      .catch((e) => {
        throw e;
      });
    setConClude(concludes.data.history);
    console.log("start");

    socket.on("new-message", async (messageNew) => {
      console.log(messageNew);

      let list = [];
      list = noti;
      list.push(messageNew.history);

      list.sort(function (a, b) {
        return b.id - a.id;
      });
      setNoti(list);
      setFound(!found);

      console.warn(list);
    });
  }, []);

  useEffect(() => {
    setFound(false);
  }, [found]);

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          {/* <Grid item lg={3} sm={6} xl={2.2} xs={12}>
            <TotalVistor data={conclude?.allHistory} />
          </Grid> */}
          <Grid item lg={3} sm={6} xl={2.2} xs={12}>
            <TotalVistorStanger data={conclude?.stanger} />
          </Grid>
          <Grid item lg={3} sm={6} xl={2.2} xs={12}>
            <TotalVistorWhite data={conclude?.verify} />
          </Grid>
          <Grid item lg={3} sm={6} xl={2.2} xs={12}>
            <TotalStaff data={conclude?.staff} />
          </Grid>
          <Grid item lg={3} sm={6} xl={2.2} xs={12}>
            <TotalVistorBlack data={conclude?.warning} />
          </Grid>

          <Grid item lg={8} md={8} xl={8} xs={8}>
            <Grid container spacing={3}>
              <Grid item lg={4} sm={4} xl={4} xs={4}>
                <DeviceMonitor></DeviceMonitor>
              </Grid>
              <Grid item lg={8} sm={8} xl={8} xs={8}>
                <Video></Video>
              </Grid>
              {/* <Grid item lg={12} md={12} xl={12} xs={12}>
              <History></History>
          </Grid> */}
            </Grid>
          </Grid>

          <Grid item lg={4} md={4} xl={4} xs={4}>
            {/* <MapView></MapView> */}
            <CardNotification data={noti}></CardNotification>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
