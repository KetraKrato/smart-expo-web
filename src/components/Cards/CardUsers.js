import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/People';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import PropTypes, { element } from 'prop-types';

import {
    Grid,
    colors,
    Avatar,
  } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  details: {
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
    backgroundColor: colors.green[600],
    height: 38,
    width: 38,
  },
  avatar: {
    backgroundColor: colors.green[600],
    height: 56,
    width: 56,
    padding:5
  },
}));

MediaControlCard.propTypes = {
    className: PropTypes.string,
  };

export default function MediaControlCard({ className, ...rest }) {
  const classes = useStyles();
  const theme = useTheme();


  React.useEffect(()=>{
    let value = {...rest}
    // setUser(value)
    console.log(rest)
  },[rest])



  return (
    <Grid
    container
    spacing={3}
    >
{rest.data.slice(0,12).map((product, i) => ( 

// //  <div key = {i}> 
// {/* {product.message !="Profile not found" &&   */}
        <Grid
            item
           lg={4}
              md={4}
              xl={4}
              xs={4}
      
      >
        

    <Card className={classes.root}
     style={{ backgroundColor: "#81c784" }}
    >
       <CardMedia
        className={classes.cover}
        image={product.img_name}
        title="Live from space album cover"
      
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            Name:
              {product.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
          Updated {product.timeStamp}  
          </Typography>
        </CardContent>
        <div className={classes.controls}>
        <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
        <Avatar className={classes.avatar}>
            <PlayArrowIcon className={classes.playIcon} />
      </Avatar>
      <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={product.match}
        title="Live from space album cover"
      />
    </Card>

    </Grid> 
    // {/* } */}
    //  {/* </div> */}

        ))}

    </Grid>
  );
}