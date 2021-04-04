import React, { useEffect, useState } from "react";
// import { AreaChart,Area,LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import clsx from "clsx";
import ProgressBar from "./progress-bar.component";
import Man from "./man.png";
import Woman from "./woman.png";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useStore } from "react-redux";
import moment from "moment";

const useStyles = makeStyles(() => ({
  root: {
    height: "450px",
    width: "100%",
    //textAlign: 'left'
  },
  actions: {
    justifyContent: "flex-end",
  },
  sizeImgMan: {
    //marginLeft:'50px',
    height: "200px",
  },
  sizeImgWoman: {
    //marginLeft:'50px',
    height: "200px",
  },
  top: {
    height: "100%",
    marginTop: "6%",
    textAlign: "center",
  },
}));

const PureComponent = ({ className, ...rest }) => {
  const classes = useStyles();
  const [data, setData] = useState([{ bgcolor: "#0928B5", completed: 0 }]);

  React.useEffect(() => {
    setData([
      {
        bgcolor: "#0928B5",
        completed: parseInt(
          (rest.data.Man / (rest.data.Man + rest.data.Woman)) * 100
        ),
      },
    ]);
  }, [rest.data.Man]);
  // useEffect( ()=>{
  //   let  data = []
  //    rest.data?.slice(0,10).reverse().map((i)=>{
  //     if(i.timeslice != "" &&  i.timeslice != "test"  ) {
  //     data.push({
  //             name:moment(i.timeslice).format(" DD/MM/YYYY HH:mm:ss"),
  //             value:parseInt(i.count_time)
  //         })
  //     }
  //    })
  //    setpieData(data)

  //   },[rest.data])

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        titleTypographyProps={{ variant: "h2" }}
        title="อัตราส่วนระหว่างชาย-หญิง"
      />
      <Divider />
      <br></br>
      <div className={classes.top}>
        <Grid container xl={12} xs={12} lg={12}>
          <Grid item xl={3} lg={3}>
            <img className={classes.sizeImgMan} src={Man} />
          </Grid>
          <Grid item xl={6} lg={6}>
            {data.map((item, idx) => (
              <ProgressBar
                key={idx}
                bgcolor={item.bgcolor}
                completed={item.completed}
              />
            ))}
          </Grid>
          <Grid item xl={3} lg={3}>
            <img className={classes.sizeImgWoman} src={Woman} />
          </Grid>
        </Grid>
      </div>
    </Card>
  );
};

export default PureComponent;
