import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes, { element } from 'prop-types';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import TableBlacklist from "./TableStaff"
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  colors,
  makeStyles,
    Container,
    Grid,
  fade,
  
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { useNavigate } from 'react-router-dom';


const useStyles = makeStyles((theme) =>({
    root: {
        height: '100%',
        borderRadius:20
    },
    card:{
        backgroundColor:"#12005e"

    },
      avatar: {
         '& svg': {
          fontSize: 78
        },
        backgroundColor: colors.lightBlue[600],
        
        height:56,
        width:56,
        justifyContent:"center",
        justifyItems:"center",
        alignContent:"center",
        alignItems:"center",
        color:colors.grey[100],
    
      },
  search: {
    position: 'relative',
    margin: theme.spacing(1, 0, 1, 2),
    padding: theme.spacing(0,1,0,0),
    borderRadius: theme.shape.borderRadius,
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    // '&:hover': {
    //   backgroundColor: fade(theme.palette.common.white, 0.25),
    // },
    // marginRight: theme.spacing(2),
    // marginLeft: 0,
    width: '100%',
    // [theme.breakpoints.up('sm')]: {
    //   marginLeft: theme.spacing(3),
    //   width: 'auto',
    // },
  },
  searchIcon: {
    // padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '1em',
    },
  inputRoot: {
    color: 'inherit',
    border: '1px solid #000',
    borderRadius: '5px',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1.5,0,1.5,1),
    // vertical padding + font size from searchIcon
     paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    //width: '100%',
    // [theme.breakpoints.up('xs')]: {
    //   width: '38ch',
    // },
    },
    topbar: {
      padding: theme.spacing(5,0,0,0)
  },
  Cancel: {
    background: '#ba000d',
    color: '#ffffff',

  },
  
}));

const Video = ({ className, ...rest }) => {
const navigate = useNavigate();
  const classes = useStyles();
  const [products] = useState([]);
  React.useEffect(()=>{
    let value = {...rest}
    // setUser(value)
  },[rest])

    return (  
        <Container maxWidth>
            <Grid container
                direction="row"
                justify="space-between"
                alignItems="center" spacing={3}>
                <Grid item lg={12} md={12} xl={12} xs={12}>
                <Grid container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                      xs={12} spacing={1} className={classes.topbar} >
              <Grid item xs={6}> <Typography variant="h1">Staff</Typography></Grid>
              <Grid item xs={6}>
                <Grid container
                  direction="row"
                  justify="flex-end"
                  alignItems="center"
                  xs={12}
                  spacing={1}
                >
                  <Grid item xs={2}>
                    <Button variant="contained" color="primary" size="large" className={classes.margin}
                      onClick= {()=>{
                            navigate('/app/add_staff', { replace: true });
                      }}
                      >
                                Add Staff
                      </Button>
              </Grid>
              <Grid item xs={2}>
                    <Button variant="contained" color="primary" size="large" className={classes.margin}
                      onClick= {()=>{
                            navigate('/app/staff/add_group', { replace: true });
                      }}
                      >
                                Add Position
                      </Button>
              </Grid>
                    <Grid item xs={6}> <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                          </div>
                          <InputBase
                            placeholder="Search…"
                            classes={{
                              root: classes.inputRoot,
                              input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                          />
                        </div>
                        </Grid>
                </Grid>
              </Grid>
                       
                        </Grid>
                </Grid>
                 <Grid item lg={12} md={12} xl={12} xs={12}>
    <Card
      className={clsx(classes.root, className)}
      {...rest}
        >
            
      {/* <CardHeader
        variant="h4"
        title="Blacklist"
      /> */}
      <Divider />
        <TableBlacklist></TableBlacklist>
      <Divider />
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
                </Box>  
                    </Card>  
                </Grid>    
                </Grid>
            </Container>
  );
};

Video.propTypes = {
  className: PropTypes.string,
};

export default Video;
