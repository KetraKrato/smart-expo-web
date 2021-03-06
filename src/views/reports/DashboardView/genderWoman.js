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
import WcIcon from '@material-ui/icons/Wc';
const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    '& svg': {
        fontSize: 56
      },
    backgroundColor: colors.pink[300],
    height:96,
    width: 96,
    color:colors.grey[100]
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
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h4"
            >
            Total Gender Woman
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
                <WcIcon></WcIcon>
            </Avatar>
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
