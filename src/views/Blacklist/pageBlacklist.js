import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes, { element } from 'prop-types';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import TableBlacklist from "../Blacklist/index"
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
  
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
const useStyles = makeStyles(({
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
    
      }
}));

const Video = ({ className, ...rest }) => {
  const classes = useStyles();
  const [products] = useState([]);
  React.useEffect(()=>{
    let value = {...rest}
    // setUser(value)
  },[rest])

    return (  
        <Container maxWidth={false}>
            <Grid Container spacing={3}>
                <Grid item lg={12} md={12} xl={12} xs={12}>
                    <Typography>Blacklist</Typography>
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
