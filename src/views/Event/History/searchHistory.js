import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from '../../../components/Page';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useNavigate } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from "@material-ui/core/IconButton"
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(3)
  },
  section1: {
    margin: theme.spacing(3, 2),
  },
  input:{
        color: theme.palette.primary.main,
        borderColor:theme.palette.primary.main,
  },
  margin: {
    margin: theme.spacing(1),
  },
  button:{
    margin: theme.spacing(1),
    width:'300px'
  },
  avatar: {
     margin: theme.spacing(1),
    // backgroundColor: theme.palette.primary.main,
    // color:theme.palette.grey
    
  },
  card:{
    borderRadius:12
    },
    form: {
        width: '100%', // Fix IE 11 issue.
      },
      buttonSearch:{
        marginTop: theme.spacing(1),
        margin: theme.spacing(2),
        height:'48px',
        width:'150px',
      }
      ,
       groupButtom :{
        marginBottom: theme.spacing(2),
        margin:theme.spacing(2)
      }
      ,
        textField :{
        marginBottom: theme.spacing(1),
        margin:theme.spacing(1)
      },
      paper: {
        // margin: theme.spacing(2, 6),
        margin: theme.spacing(1),
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      },
}));

const ReortFilter = () => {
  const classes = useStyles();
 const navigate = useNavigate();
 
 const handleChange = (event) => {
    // setChannelName(event.target.value);
  }; 
 return (
    <Page
      className={classes.root}
      title="ReortFilter"
    > 
     <Divider variant="middle" />
    <div className={classes.section1}>
    <Grid container alignItems="center">

      <Grid item xs={12} >
        <Typography color="textPrimary" gutterBottom variant="h4">
          History
        </Typography>
      </Grid>
      <Grid item xs={12} >
      <Typography color="textSecondary" variant="body2">
        Record Vistor 
        </Typography>
       <br></br>

      </Grid>
      <Grid item xs={12} component={Card}
      className={classes.card} 
       elevation={5} >
        <div className={classes.paper}>
    
          <IconButton color="primary" aria-label="upload picture" component="span">
          <SearchIcon 
            color="primary" 
            variant="contained"
            ></SearchIcon>
        </IconButton>
          <Typography component="h1" variant="h5" color="primary"  className={classes.margin}>
            FILTER
          </Typography>
          <form  className={classes.form}  noValidate>
           <ButtonGroup  className={classes.groupButtom} size="large" color="primary" aria-label="large outlined primary button group">
            <Button>month</Button>
            <Button>week</Button>
            <Button>last day</Button>
            <Button>to day</Button>
            </ButtonGroup>
         
                <TextField
                id="datetime-local"
                label="DATE BEGIN"
                variant="outlined"
                type="datetime-local"
                defaultValue="2021-01-24T10:30"
                color="primary"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                className:classes.input
                }}
                />
                <TextField
                id="datetime-local"
                label="DATE END"
                variant="outlined"
                type="datetime-local"
                color="primary"
                defaultValue="2021-01-24T10:30"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                className:classes.input
                }}
                />
            <Button  variant="contained" color="primary" 
            size="medium" className={classes.buttonSearch}
            onClick= {()=>{
                    //  navigate('/app/add_VI', { replace: true });
            }}
            >
          Search
        </Button>  
        
          </form>
         
        </div>
      </Grid>


      {/* <Grid item>
       <Button  variant="contained" color="primary" size="medium" className={classes.margin}>
          Edit Video
        </Button>
      </Grid>
      <Grid item>
       <Button  variant="contained" color="secondary" size="medium" className={classes.margin}>
          Remove Video
        </Button>
      </Grid> */}
    </Grid>
   
  </div>
  <Divider variant="middle" />
     
    </Page>
  );
};

export default ReortFilter;