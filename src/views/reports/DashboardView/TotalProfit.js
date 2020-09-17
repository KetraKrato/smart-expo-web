import React ,{useEffect} from 'react';
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
import AttachMoneyIcon from '@material-ui/icons/SupervisedUserCircle';
import axios from 'axios';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56
  }
}));





const TotalProfit = ({ className, ...rest }) => {
  const classes = useStyles();
  const [lenght,setLenght] = React.useState(0)

useEffect(()=>
{

              axios.get(`http://localhost:3000/detection/lenght`)
              .then(res => {
              console.log(res)
              res.data.data.map((i)=>{
               let valume = Object.values(i)
                setLenght(valume)
              })
})
  
},[])

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
              variant="h6"
            >
              Stranger face recognition statistics
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {lenght}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalProfit.propTypes = {
  className: PropTypes.string
};

export default TotalProfit;
