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
import GroupIcon from '@material-ui/icons/Group';
const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    '& svg': {
        fontSize: 56
      },
    backgroundColor: colors.lightBlue[600],
    height:96,
    width: 96,
    color:colors.grey[100],
    marginLeft: 'auto',
    marginRight: 'auto',
  }
}));

const Stanger = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          // justify="space-between"
          spacing={3}
        >
          <Grid item xs={3}>
            <Avatar className={classes.avatar}>
                <GroupIcon></GroupIcon>
            </Avatar>
          </Grid>
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h2"
            >
            Total Stanger visitor
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {rest.data}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Stanger.propTypes = {
  className: PropTypes.string
};

export default Stanger;
