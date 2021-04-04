import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import IconPeople from './multiple-users-silhouette.png'
const useStyles = makeStyles(() => ({
  root: {
    height: '450px',
    weight:  '100%',
    margin: '0px',
  },
  avatar: {
    '& png': {
      height: 96*2,
      width: 96*2,
      },
    backgroundColor: colors.indigo[600],
    height: 96*2,
    width: 96*2,
    color:colors.grey[100],
    marginTop:'50px'

  },
  text:{
    marginTop:'30px'
  }
}));

const VistorAll = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          //spacing={4}
          xl={12}
          xs={12}
        >
          <Grid item xl={6} xs={6}>
            <Avatar className={classes.avatar}>
                {/* <PermContactCalendarIcon></PermContactCalendarIcon> */}
                <img style={{ height: 130,}}src={IconPeople}/>
            </Avatar>
          </Grid>
          <Grid item className={classes.text}>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h1"
            >
              จำนวนคนภายในงาน
            </Typography>
          </Grid>
          <Grid item>
          <Typography
              color="textPrimary"
              variant="h1"
            >
              {rest.data} คน
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

VistorAll.propTypes = {
  className: PropTypes.string
};

export default VistorAll;
