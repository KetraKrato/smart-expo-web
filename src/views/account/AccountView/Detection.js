import React,{useState,useEffect} from 'react';
import {
  Container,
  Grid,
  useTheme,
  makeStyles,
  Divider,
  Box,
  Avatar,
  CardActions,
  Button,
  CardContent,
  CardHeader,
  TextField,
} from '@material-ui/core';
import clsx from 'clsx';
import PropTypes, { func } from 'prop-types';
import {apiService} from "../../../service/api.service"
import Page from 'src/components/Page';
import Sales from '../../../components/Cards/CardRegister';
import axios from 'axios';
import socketIOClient from 'socket.io-client'
import moment from "moment"
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import {
  colors,
} from '@material-ui/core';

const states = [
  {
    value: 0,
    label: 'White List'
  },
  {
    value: 1,
    label: 'Black List'
  },

];

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.background.dark,
    // minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  rootCard: {
    display: 'flex',
  }
  , details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    backgroundColor: colors.blue[600],
    height: 38,
    width: 38,
  },
  avatar: {
    backgroundColor: colors.blue[600],
    height: 56,
    width: 56,
    padding:5
  },
  avatarProfile: {
    height: 200,
    width: 200
  }
}));

const Dashboard = ({ className, ...rest }) => {
 const classes = useStyles();
 const [value,setValue] = useState([])
 const [found,setFound] = useState(false)
 const [dataWhite,setDataWhite] = useState([])
 const theme = useTheme();

const [user,setUser] = useState({
  faceId:"",
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM+7',
  img_name:""

})
// register Exhibitor page 
 const [values, setValues] = useState({
   
  firstName: 'Katarina',
  lastName: 'Smith',
  email: 'demo@devias.io',
  phone:'',
  state: 0,
  country: 'USA',
});


 function setImage (data) {
    // console.log(data)
    setUser({
      ...user,
      faceId:data.faceId,
      avatar:data.img_name,
      img_name:data.img_name
    })
 }
 function registerApi() {
 let data ={
   user_name:"0",
   password: "0",
   first_name:values.firstName ,
   last_name: values.lastName,
   mob_no: values.phone,
   type : values.state,
   imageName:user.img_name,
   faceid: user.faceId,
  }  
 apiService.signUp(
   data
 ).then((data)=>{
  // console.log(data.result) 
  if(data.result.success) {
  alert("บันทึกข้อมูลสำเร็จ")
  }
  else {
    alert("บันทึกข้อมูลผิดพลาด")
  }
  //  console.log(data)
 })

 }

  useEffect(()=>{
    console.log("start")
    const socket = socketIOClient("http://localhost:9000")
    socket.on('new-message', (messageNew) => {
        if(messageNew.faceid!= undefined)
                axios.get(`http://localhost:3000/upload/`+messageNew.faceid)
                .then(res => {
                  if (res.data.message != "Profile not found"){
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
                      console.log(i)
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


  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Page
    className={classes.root}
    title="Account"
  >
    <Container maxWidth="lg">


        <Grid
          container
          spacing={3}
        >
          {/* { value.map((i)=>
          <div key={i}> hello</div>
          )} */}
         <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
           <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
            <CardContent>
              <Box
                alignItems="center"
                display="flex"
                flexDirection="column"
              >
          <Avatar
            className={classes.avatarProfile}
            src={user.avatar}
          />

             
                <Typography
                  color="textPrimary"
                  gutterBottom
                  variant="h3"
                >
                  {user.faceid}
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  {`Thailand Bangkok`}
                </Typography>
                <Typography
                  className={classes.dateText}
                  color="textSecondary"
                  variant="body1"
                >
                  {`${moment().format('HH:mm:ss')} ${user.timezone}`}
                </Typography>
              </Box>
            </CardContent>
            <Divider />
            <CardActions>
              <Button
                color="primary"
                fullWidth
                variant="text"
              >
                Update picture
              </Button>
            </CardActions>
          </Card>
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
                    <form
                autoComplete="off"
                noValidate
                className={clsx(classes.rootCard, className)}
                {...rest}
              >
                <Card>
                  <CardHeader
                    subheader="The information can be edited"
                    title="Profile"
                  />
                  <Divider />
                  <CardContent>
                    <Grid
                      container
                      spacing={3}
                    >
                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <TextField
                          fullWidth
                          helperText="Please specify the first name"
                          label="First name"
                          name="firstName"
                          onChange={handleChange}
                          required
                          value={values.firstName}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <TextField
                          fullWidth
                          label="Last name"
                          name="lastName"
                          onChange={handleChange}
                          required
                          value={values.lastName}
                          variant="outlined"
                        />
                      </Grid>
                     
                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <TextField
                          fullWidth
                          label="Phone Number"
                          name="phone"
                          onChange={handleChange}
                          type="number"
                          value={values.phone}
                          variant="outlined"
                        />
                      </Grid>
                      {/* <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <TextField
                          fullWidth
                          label="Country"
                          name="country"
                          onChange={handleChange}
                          required
                          value={values.country}
                          variant="outlined"
                        />
                      </Grid> */}
                      <Grid
                        item
                        md={6}
                        xs={12}
                      >
                        <TextField
                          fullWidth
                          label="Type"
                          name="state"
                          onChange={handleChange}
                          required
                          select
                          SelectProps={{ native: true }}
                          value={values.state}
                          variant="outlined"
                        >
                          {states.map((option) => (
                            <option
                              key={option.value}
                              value={option.value}
                            >
                              {option.label}
                            </option>
                          ))}
                        </TextField>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Divider />
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    p={2}
                  >
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={()=>{
                        registerApi()
                      }}
                    >
                      Save details
                    </Button>
                  </Box>
                </Card>
              </form>
          </Grid>


          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
         
           
         <Grid
    container
    spacing={3}
    >
    {dataWhite.slice(0,12).map((product, i) => ( 

// //  <div key = {i}> 
// {/* {product.message !="Profile not found" &&   */}
        <Grid
            item
              lg={4}
              md={4}
              xl={4}
              xs={4}
              key={i}
      
      >
        

    <Card className={classes.rootCard}
    >
       <CardMedia
        className={classes.cover}
        image={product.img_name}
        title="Live from space album cover"
      
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
                faceid:
              {product.faceid}
          </Typography>
          <Typography variant="body2" color="textSecondary">
          Updated {product.timeStamp}

          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <Button 
           color="primary"
           variant="contained"
           onClick={()=>{
             setImage({
               img_name:product.img_name,
               faceId:product.faceid
             })
           }}
          >
          Use 
          </Button>
        {/* <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
        <Avatar className={classes.avatar} variant>
            <PlayArrowIcon className={classes.playIcon} />
      </Avatar>
      <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton> */}
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        
        </div>
      </div>
      {/* <CardMedia
        className={classes.cover}
        image={"http://192.168.1.71:3000/images/upload_images/"+ product.match}
        title="Live from space album cover"
      /> */}
    </Card>

    </Grid> 
    // {/* } */}
    //  {/* </div> */}

        ))}

    </Grid>

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

Dashboard.propTypes = {
  className: PropTypes.string
};


export default Dashboard;
