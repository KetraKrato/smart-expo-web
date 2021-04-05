import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/StarBorder";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import { historyService } from "../../services";
import { Avatar, Divider } from "@material-ui/core";
import { RingVolume } from "@material-ui/icons";

import { map } from "leaflet";
import maleImg from "./male-gender.png";
import femaleImg from "./femenine.png";

import youngImg from "./boy.png";
import minorImg from "./teenage15_18.png";
import teenagerImg from "./man19_22.png";
import adolescentImg from "./teenager23_28.png";
import youngadultImg from "./bussiness-man29_35.png";
import adultImg from "./graphic-designer36_45.png";
import elderImg from "./old46_.svg";
const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
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
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  cardDetail: {
    display: "flex",
    justifyContent: "space-evenly",
    // alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  maleImage: {
    width: "30px",
    height: "30px",
  },
  femaleImage: {
    width: "30px",
    height: "30px",
  },
  avatarImage: {
    width: "50px",
    height: "50px",
    marginRight: "20px",
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

export default function Pricing() {
  const classes = useStyles();
  const [conclude, setConClude] = useState([]);
  const [device, setDevice] = useState([]);
  const [age, setAge] = useState([]);

  function listAge(img, textAge, numberAge, dataVistor) {
    return (
      <div>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          spacing={3}
        >
          <Grid item>
            <Avatar
              src={img}
              className={classes.avatarImage}
              style={{ display: "inline-block" }}
            />

            <div style={{ display: "inline-block" }}>
              <Typography variant="h4">
                <Box fontWeight="fontWeightBold">{textAge}</Box>
              </Typography>
              <Typography variant="subtitle1">
                {"  "}
                {numberAge} Years
              </Typography>
            </div>
          </Grid>
          <Grid item>
            <div style={{ display: "inline-block" }}>
              <Typography display="inline" variant="h2">
                <Box fontWeight="fontWeightBold" style={{ display: "inline" }}>
                  {dataVistor}
                </Box>
                <Box
                  style={{ display: "inline" }}
                  fontWeight="fontWeightLight"
                  fontSize="h5.fontSize"
                  color="textSecondary"
                >
                  /vistor
                </Box>
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }

  function AgeAnalz(rest) {
    // console.log("test",rest)

    let DataAge = [
      {
        age: "-",
        value: 0,
      },
      {
        age: "small child",
        value: 0,
      },
      {
        age: "Child",
        value: 0,
      },
      {
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
      },
      {
        age: "older",
        value: 0,
      },
    ];
    rest[0].map((i) => {
      let agekey = 0,
        countKey = 0;
        // console.log("hello")
        for (const [key, value] of Object.entries(i)) {
      
        if (key == "age") {
          agekey = parseInt(value);
        } else if (key == "count") {
          countKey = parseInt(value);
        }
        //  console.log(`${key}: ${value}`);
      }
      // console.log(agekey ,countKey)
      if (agekey == 0) DataAge[0].value = countKey;
      else if (agekey > 0 && agekey < 5) DataAge[1].value += countKey;
      else if (agekey > 4 && agekey < 13) DataAge[2].value += countKey;
      else if (agekey > 12 && agekey < 19) DataAge[3].value += countKey;
      else if (agekey > 18 && agekey < 25) DataAge[4].value += countKey;
      else if (agekey > 24 && agekey < 60) DataAge[5].value += countKey;
      else if (agekey > 60) DataAge[6].value += countKey;
    });
    return DataAge;
  }

  React.useEffect(async () => {
    console.log("start");
    let sucess = false
    let concludes = await historyService
      .getConcludeLocations()
      .then((data) => {
        console.log(data);
        data.data.event[0].locations.map((i) => {
         let  ageList = []
          i.devices.map((k)=>{
              data?.data?.report?.map((j)=>{
              if(k.id ==j.id) {
                ageList.push(j.age)
                }
               })

          })
          let analy = AgeAnalz(ageList);
          i.ageAnaly = analy;
          setAge(analy);
          sucess = true
          console.log("tes",analy)
        });
       

        return data;
      })
      .catch((e) => {
        throw e;
      });
    console.log("Conclude Data");
    if(sucess) {
    setConClude(concludes.data.event[0].locations);
    }
  }, []);

  // useEffect(() => {}, [device]);

  useEffect(() => {}, [conclude]);
  useEffect(() => {}, [age]);
  return (
    <Grid container spacing={3} alignItems="flex-start">
      {conclude.map((tier) => (
        // Enterprise card is full width at sm breakpoint
        <Grid
          item
          key={tier.id}
          xs={12}
          sm={tier.title === "Enterprise" ? 12 : 6}
          md={3}
        >
          <Card>
            <CardHeader
              title={tier?.LocationName}
              subheader={tier?.LocationDetail}
              titleTypographyProps={{ align: "center" }}
              subheaderTypographyProps={{ align: "center" }}
              action={tier.title === "Pro" ? <StarIcon /> : null}
              className={classes.cardHeader}
            />
            <CardContent>
              <div className={classes.cardPricing}>
                <Typography component="h2" variant="h1" color="textPrimary">
                  {tier?.devices
                    .map((i) => i.face_count)
                    .reduce((acc, bill) => bill + acc)}
                </Typography>
                <Typography variant="h4" color="textSecondary">
                  /Vistor
                </Typography>
              </div>

              <div>
                {tier?.devices
                  .sort((a, b) => (a.face_count > b.face_count ? 1 : -1))
                  .map((i) => (
                    <Grid
                      container
                      direction="row"
                      justify="space-evenly"
                      alignItems="center"
                      spacing={4}
                      // className={classes.cardDetail}
                    >
                      <Grid item xs={4}>
                        <Typography variant="h4" color="primary" align="center">
                          {i.device_name}
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Grid
                          container
                          direction="row"
                          justify="flex-end"
                          alignItems="center"
                          xs={12}
                        >
                          <Grid item xs={6}>
                            <img src={maleImg} className={classes.maleImage} />

                            <Typography
                              variant="h3"
                              color="primary"
                              //align="center"
                              display="inline"
                              style={{
                                margin: "20%",
                                // marginBottom: "30px",
                              }}
                            >
                              {i.genderMan}
                            </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <img
                              src={femaleImg}
                              className={classes.femaleImage}
                            />
                            <Typography
                              variant="h3"
                              color="primary"
                              //align="center"
                              display="inline"
                              style={{
                                marginLeft: "20%",
                              }}
                            >
                              {i.genderWoman}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
              </div>

              {/* <Divider></Divider>
              <br></br>
              <div className={classes.cardPricing}>
                <Typography component="h2" variant="h6" color="textPrimary">
                  EMOTIONS
                </Typography>
              </div>
              <div>
                {tier?.deviceDetail?.history?.emotions.map((i) => (
                  <div className={classes.cardDetail}>
                    <Typography variant="h6" color="primary">
                      {i.emotions}
                    </Typography>

                    <Typography variant="h6" color="primary"></Typography>
                    <Typography variant="h6" color="textSecondary">
                      {i.count} / vistor
                    </Typography>
                  </div>
                ))}
              </div>
              <Divider></Divider>
              <br></br>
              <div className={classes.cardPricing}>
                <Typography component="h2" variant="h6" color="textPrimary">
                  RACE
                </Typography>
              </div>
              <div>
                {tier?.deviceDetail?.history?.race.map((i) => (
                  <div className={classes.cardDetail}>
                    <Typography variant="h6" color="primary">
                      {i.race}
                    </Typography>

                    <Typography variant="h6" color="primary"></Typography>
                    <Typography variant="h6" color="textSecondary">
                      {i.count} / vistor
                    </Typography>
                  </div>
                ))}
                </div> */}
              <Divider
                style={{
                  marginTop: "5%",
                }}
              ></Divider>
              <br></br>
              {/* <div className={classes.cardPricing}>
                <Typography component="h2" variant="h6" color="textPrimary">
                  AGE
                </Typography>
              </div> */}
              {/* <div>
                {tier?.ageAnaly?.map((i) => (
                  <div className={classes.cardDetail}>
                    <Typography variant="h6" color="primary">
                      {i.age}
                    </Typography>

                    <Typography variant="h6" color="primary"></Typography>
                    <Typography variant="h6" color="textSecondary">
                      {i.value} / vistor
                    </Typography>
                  </div>
                ))}
              </div> */}
              <Box>
                {tier?.ageAnaly?.map((i) => {
                  console.log(i)
                  switch (true) {
                    case i.age === "-":
                      return listAge(youngImg, "Young", "1-15", i.value);
                    case i.age === "small child":
                      return listAge(minorImg, "Minor", "15-18", i.value);
                    case i.age === "Child":
                      return listAge(teenagerImg, "Teenager", "19-22", i.value);
                    case i.age === "Teens":
                      return listAge(
                        adolescentImg,
                        "Adolescent",
                        "23-28",
                        i.value
                      );
                    case i.age === "Young":
                      return listAge(
                        youngadultImg,
                        "Young Adult",
                        "29-35",
                        i.value
                      );
                    case i.age === "adult":
                      return listAge(adultImg, "Adult", "36-45", i.value);
                    case i.age === "older":
                      return listAge(elderImg, "Elder", "46-all", i.value);
                    default:
                      return <div></div>;
                  }
                })}
              </Box>
              {/* <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
              >
                <Grid item>
                  <Avatar
                    src={teenImg}
                    className={classes.avatarImage}
                    style={{ display: "inline-block" }}
                  />

                  <div style={{ display: "inline-block" }}>
                    <Typography variant="h3">
                      <Box fontWeight="fontWeightBold">Teen</Box>
                    </Typography>
                    <Typography variant="subtitle1"> 15-18</Typography>
                  </div>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item>
                  <div style={{ display: "inline-block" }}>
                    <Typography display="inline" variant="h2">
                      <Box
                        fontWeight="fontWeightBold"
                        style={{ display: "inline" }}
                      >
                        15
                      </Box>
                      <Box
                        style={{ display: "inline" }}
                        fontWeight="fontWeightLight"
                        fontSize="h4.fontSize"
                        color="textSecondary"
                      >
                        /vistor
                      </Box>
                    </Typography>
                  </div>
                </Grid>
              </Grid> */}
              {/* <Avatar src={teenImg} />
              <Typography> Teen</Typography>
              <Typography> 15-18</Typography>
              <div>
                {tier?.ageAnaly?.slice(0, 1).map((i) => {
                  <Typography variant="h6" color="textSecondary">
                    {i.value}/ vistor
                  </Typography>;
                })}
                <Typography> TEst TEST</Typography>
              </div> */}
            </CardContent>
            {/* <div>
              {tier?.ageAnaly?.slice(0, 1).map((i) => {
                <Typography variant="h6" color="textSecondary">
                  {i.value}/ vistor
                </Typography>;
              })}
            </div> */}

            {/* <CardActions>
              <Button fullWidth variant="contained" color="primary">
                SEE DETAIL
              </Button>
            </CardActions> */}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
