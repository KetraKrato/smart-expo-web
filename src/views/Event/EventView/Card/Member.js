import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes, { element } from 'prop-types';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  CardContent,
  List,
  ListItem,
  colors,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Grid
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import FaceIcon from '@material-ui/icons/Face';
import {apiConstants} from "../../../../_constants"
import VerifiedUserIcon from '@material-ui/icons/PermContactCalendar';
const useStyles = makeStyles(({
  
 
      avatar: {
         '& svg': {
          fontSize: 56
        },
        backgroundColor: colors.yellow[800],
        
        height:78,
        width:78,
        justifyContent:"center",
        justifyItems:"center",
        alignContent:"center",
        alignItems:"center",
        color:colors.grey[100],
    
      }
}));

const Member = ({ className, ...rest }) => {
  const classes = useStyles();
//   const [rest.products] = useState([]);
  React.useEffect(()=>{
    let value = {...rest}
    // setUser(value)
  },[rest])

  return (

      <Box m={3}>
        <Card  className={clsx(classes.root, className)}
       {...rest} variant="outlined">
     {/* <CardHeader
     titleTypographyProps={{variant:'h2' }}
    //  title={rest.products.face?.faceid}
    //  subheader= {moment(rest.product).format('DD/MM/YYYY')
    // }
     /> */}
   <CardContent
         style={{
            backgroundColor:rest.product.face.member_picture.member.group.colors,
            borderRadius:20
         }}
   >
     <Grid
       container
       justify="space-evenly"
       alignItems="center"
       spacing={3}
     >
     
      
       <Grid item>
       <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            >
                <Grid item>
       <Typography
          color="textSecondary"
           variant="h4"
           align="center"
        
         >
           {rest.product.face.member_picture.member.group.name}
           
         </Typography>
         </Grid>

         <Grid item>

             <ListItemAvatar>
              <Avatar
                alt="image_detection"
                className={classes.avatar}
                src={rest.product.faceImage}
              />
            </ListItemAvatar>
         </Grid>

         <Typography
           color="textPrimary"
           gutterBottom
           variant="h6"
         >
           History Id :  {rest.product.id}             
         </Typography>
         <Typography 
          color="textSecondary"
           gutterBottom
           variant="h6"
         >
         Time : {moment(rest.product?.created).format('HH:mm:ss')}              
         </Typography>
         <Typography 
          color="textSecondary"
           gutterBottom
           variant="h6"
         >
         {/* Device : {rest.product?.device.device_name}               */}
         </Typography>
         <Typography
           color="textPrimary"
           variant="h6"
         >
         Location : {rest.product?.device.location.LocationName }
         </Typography>

        
           <Typography
          color="textPrimary"
           variant="h6"
         >
            Event
            :
            {rest.product.device?.location.event.eventName}
             
         </Typography>
            </Grid>
        </Grid>

         <Grid item>
         <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        >

        <Grid item>
         <Typography
          color="textSecondary"
           variant="h5"
           align="center"
        
         >
            Score 
            Matching 
         </Typography>
        </Grid>
        <Grid item>

         <Avatar className={classes.avatar} >
            <VerifiedUserIcon></VerifiedUserIcon>
         </Avatar> <br></br>
        </Grid>

        <Grid item>

         <Typography
          color="success.main"
           variant="h4"
           align="center"
        
         >   <Box  color="success.main" >
               {rest.product.score_match.toFixed(2)}
             </Box>

         </Typography>
        </Grid>

            </Grid>

         </Grid>
         <Grid item>
         <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            >
        
            <Typography
            color="primarySecondary"
            variant="h4"
            align="center"
            
            >
            Face 
            
            </Typography>
            <br></br>
            <ListItemAvatar>
                <Avatar
                    alt="rest.product"
                    className={classes.avatar}
                    src={apiConstants.uri+ rest.product.face.member_picture.image_path.substring(6,rest.product.face.member_picture.image_path.length)}
                />
                </ListItemAvatar>
             <Typography
           color="textSecondary"
           gutterBottom
           variant="h6"
         >
         Group : {rest.product.face.member_picture.member.group.name}           
         </Typography>
         <Typography
           color="textPrimary"
           gutterBottom
           variant="h6"
         >
           First name :  {rest.product.face.member_picture.member.firstName}             
         </Typography>
         <Typography 
          color="textSecondary"
           gutterBottom
           variant="h6"
         >
        Date : {moment(rest.product.face.created).format('DD/MM/YYYY')}              
         </Typography>

         <Typography 
          color="textSecondary"
           gutterBottom
           variant="h6"
         >
        Time : {moment(rest.product.face.created).format('HH:mm:ss')}              
         </Typography>
            </Grid>
            </Grid>

        </Grid>
     
      </CardContent>
    </Card> 

  </Box>
  );
};

Member.propTypes = {
  className: PropTypes.string,
};

export default Member;
