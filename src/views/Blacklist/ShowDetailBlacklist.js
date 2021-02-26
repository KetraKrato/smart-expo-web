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
    width:150,
    height: 150,
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

const DataTemp = {
    id: 1,
    nametitle: 'นาย',
    name: 'ณัฐธรรม',
    surname: 'วัฒนขจรชัยกุล',
    nametitleeng:'Mr.',
    nameeng: 'Nattatam',
    surnameeng: 'Watanakajonchaikul',
    IdCardNumber: '1-1111-11111-11-1',
    PassportNumber: '504572974',
    sex: 'Male',
    race: 'Thai',
    nationality: 'Thai',
    birthday:'03/03/1998',
    age: '22',
    height: '170',
    weight: '66',
    address: '1 Chalong Krung 1 Alley, Lat Krabang, Bangkok 10520',
    phone_number:'+66 23298000',
    
}
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
    const [data, setData] = useState({})
    
  // const navigate = useNavigate();na

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
                        Blacklist
                    </Typography>
                    </Grid>
                          <Grid item xs={3}>
                              <Typography align="right"> Name :</Typography>
                              </Grid>
                            <Grid item xs={9}>
                                  <Typography>{DataTemp.nametitleeng} {DataTemp.nameeng} {DataTemp.surnameeng}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography align="right"> ID CardNumber :</Typography>
                              </Grid>
                            <Grid item xs={9}>
                                  <Typography>{DataTemp.IdCardNumber} </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography align="right"> Passport Number :</Typography>
                              </Grid>
                            <Grid item xs={9}>
                                  <Typography>{DataTemp.PassportNumber} </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography align="right"> Sex :</Typography>
                              </Grid>
                            <Grid item xs={9}>
                                  <Typography>{DataTemp.sex} </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography align="right"> Race :</Typography>
                              </Grid>
                            <Grid item xs={9}>
                                  <Typography>{DataTemp.race} </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography align="right"> Nationnality :</Typography>
                              </Grid>
                            <Grid item xs={9}>
                                  <Typography>{DataTemp.nationality} </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography align="right"> Age :</Typography>
                              </Grid>
                            <Grid item xs={9}>
                                  <Typography>{DataTemp.age} </Typography>
                            </Grid>
                            <Grid item xs={3}>
                              <Typography align="right"> Birthday :</Typography>
                              </Grid>
                            <Grid item xs={9}>
                                  <Typography>{DataTemp.birthday} </Typography>
                      </Grid>
                      <Grid item xs={3}>
                              <Typography align="right"> Height :</Typography>
                              </Grid>
                            <Grid item xs={9}>
                                  <Typography>{DataTemp.height} </Typography>
                      </Grid>
                      <Grid item xs={3}>
                              <Typography align="right"> weight :</Typography>
                              </Grid>
                            <Grid item xs={9}>
                                  <Typography>{DataTemp.weight} </Typography>
                      </Grid>
                      <Grid item xs={3}>
                              <Typography align="right"> Adress :</Typography>
                              </Grid>
                            <Grid item xs={9}>
                                  <Typography>{DataTemp.address} </Typography>
                            </Grid>
                        </Grid>
                      <Grid container xs={2}>
                          <Grid container
                                direction="row"
                                justify="flex-end"
                                alignItems="center"
                                xs={2}>
                                <Grid item>
                                <DropzoneDialog
                                    className={classes.media}
                                />
                                </Grid>
                            </Grid>
                      </Grid>    
                </Grid>
            
               
        
      </Box>
    </Page>
  );
};

export default RegisterView;
