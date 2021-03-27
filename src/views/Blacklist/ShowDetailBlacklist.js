import React, { useState} from 'react';
import { Link as RouterLink} from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControl
} from '@material-ui/core';
import Page from '../../components/Page';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import DropzoneDialog from './DropzoneDialog';
import CardMedia from '@material-ui/core/CardMedia';
import Klee from './Klee.jpg'
import { red } from '@material-ui/core/colors';
import { useNavigate ,useParams} from 'react-router-dom';
import { PanoramaSharp } from '@material-ui/icons';
import {userService} from "../../services"
import {apiConstants} from "../../_constants"

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  formControl: {
    paddingTop: theme.spacing(1),
    //marginTop: theme.spacing(1),
    width: '100%' ,
  },
  media: {
    paddingLeft: '24px'
  },
  text: {
    height:100
  },
    Cancel: {
    background: '#ba000d',
    color: '#ffffff',

  },
  Name: {
    marginLeft: '8px',
    paddingRight : '8px'
  },
  
}));

// const DataTemp = {
//     id: 1,
//     nametitle: 'นาย',
//     name: 'ณัฐธรรม',
//     surname: 'วัฒนขจรชัยกุล',
//     nametitleeng:'Mr.',
//     nameeng: 'Nattatam',
//     surnameeng: 'Watanakajonchaikul',
//     IdCardNumber: '1-1111-11111-11-1',
//     PassportNumber: '504572974',
//     sex: 'Male',
//     race: 'Thai',
//     nationality: 'Thai',
//     birthday:'03/03/1998',
//     age: '22',
//     height: '170',
//     weight: '66',
//     address: '1 Chalong Krung 1 Alley, Lat Krabang, Bangkok 10520',
//     phone_number:'+66 23298000',
    
// }
function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      format="#-###-###-####"
      mask="_"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const date = '2021-06-26' // or Date or Moment.js



const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState({
    id: 1,
    titleName: "นาย",
    firstName: "ณัฐธรรม",
    lastName: "วัฒนขจรชัยกุล",
    idCard: "1-1111-11111-11-1",
    //PassportNumber: "504572974",
    gender: "Male",
    nationality: "Thai",
    birthday: "03-03-1998",
    age: "22",
    // height: "170",
    // weight: "66",
    address: "1 Chalong Krung 1 Alley, Lat Krabang, Bangkok 10520",
    company: "",
    email:"",
    // phone_number: "+66 23298000",
  });
  const [image,setImage] = useState('');
  // const navigate = useNavigate();na

//call data form backend
React.useEffect(() => {
  let getDataUser = userService
    .getDetailaUser(params.id)
    .then((res) => {
      var img = res.data.member[0].image_path;
      console.log(res);
      // data.name = temp.firstName;
      // data.surname = temp.lastName;
      setData({
        ...res.data.member[0].member,
      });
      setImage(img)
      console.log(img)
      console.log(res);
      return res;
    })
    .catch((e) => {
      throw e;
    });
}, []);


  const onChange = (jsDate, dateString) => {

  }
  return (
    <Page
      className={classes.root}
      title="Add Blacklist"
    >
      <Box  
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        
                <Grid 
                  container
                  direction="row"
                    justify="flex-end"
                    alignItems="flex-start"
                  spacing={0}
                  xs={10}           
              >  
                  <Grid item xs={1}></Grid>
                  <Grid container xs={9} spacing={3}>
                      <Grid item xs={12}>
                            <Typography
                        color="textPrimary"
                        variant="h2"
                    >
                Blacklist { params.id}
                    </Typography>
                    </Grid>
                          <Grid item xs={3}>
                              <Typography align="right"> Name :</Typography>
                              </Grid>
                            <Grid item xs={9}>
                                  <Typography>{data.titleName} {data.firstName} {data.lastName}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography align="right"> ID CardNumber :</Typography>
                              </Grid>
                            <Grid item xs={9}>
                                  <Typography>{data.idCard} </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography align="right"> Passport Number :</Typography>
                              </Grid>
                            <Grid item xs={9}>
                                  <Typography>{data.PassportNumber} </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography align="right"> Sex :</Typography>
                              </Grid>
                            <Grid item xs={9}>
                                  <Typography>{data.gender} </Typography>
                            </Grid>
                
                            <Grid item xs={3}>
                              <Typography align="right"> Nationnality :</Typography>
                              </Grid>
                            <Grid item xs={9}>
                                  <Typography>{data.nationality} </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography align="right"> Age :</Typography>
                              </Grid>
                            <Grid item xs={9}>
                                  <Typography>{data.age} </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography align="right"> Birthday :</Typography>
                              </Grid>
                            <Grid item xs={9}>
                                  <Typography>{data.birthday} </Typography>
                      </Grid>
                      <Grid item xs={3}>
                              <Typography align="right"> Height :</Typography>
                              </Grid>
                            <Grid item xs={9}>
                                  <Typography>{data.height} </Typography>
                      </Grid>
                      <Grid item xs={3}>
                              <Typography align="right"> weight :</Typography>
                              </Grid>
                            <Grid item xs={9}>
                                  <Typography>{data.weight} </Typography>
                      </Grid>
                      <Grid item xs={3}>
                              <Typography align="right"> Adress :</Typography>
                              </Grid>
                            <Grid item xs={9}>
                                  <Typography>{data.address} </Typography>
                            </Grid>
                        </Grid>
                      <Grid container xs={2}>
                          <Grid container
                                direction="row"
                                justify="space-between"
                                alignItems="stretch"

                                xs={2}>
              <Grid item className={ classes.media}>
              <img
        style={{
          marginLeft: "6px",
          border: "solid 1px #000",
          borderRadius: "5px",
          width: "200px",
          height: "300px",
        }}
        src={apiConstants.uri+ image.substring(6,image.length)}
        alt="..."
      />
                            </Grid>

                            </Grid>
                    </Grid> 
                    <Grid container
                      direction="row"
                      justify="flex-end"
                      alignItems="flex-start"
                      spacing={1}
                    >
                        <Grid item>
                    <Button
                      className={classes.Cancel}
                      //disabled={isSubmitting}
                      // fullWidth
                      size="large"
                      //type="submit"
                      variant="contained"
                      onClick={() => {  navigate('/app/blacklist', { push: true }); }}
                    >
                      Cancle
                    </Button>
                  </Grid>
                  <Grid item>
                  <Button
                    color="primary"
                    // disabled={isSubmitting}
                    fullWidth
                    size="large"
                    //type="submit"
                    variant="contained"
                    onClick={() => {  navigate('/app/blacklist/editblacklist/'+ params.id, { push: true }); }}
                  >
                    Edit
                  </Button>
          </Grid>
          </Grid>
                </Grid>
            
               
        
      </Box>
    </Page>
  );
};

export default RegisterView;
