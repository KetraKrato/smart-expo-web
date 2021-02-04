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
const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    '& svg': {
        fontSize: 56
      },
    backgroundColor: colors.indigo[600],
    height: 96,
    width: 96,
    color:colors.grey[100]

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
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h4"
            >
              Total visitor
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {rest.data}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
            <PermContactCalendarIcon></PermContactCalendarIcon>
            </Avatar>
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
