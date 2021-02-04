import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes, { element } from 'prop-types';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  colors,
  makeStyles,
  
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Stanger from "./Stanger"
import Member from "./Member"
import Warnning from "./Warnning"

const useStyles = makeStyles(({
    root: {
        height: '100%',
        borderRadius:12
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

const CardNotifications = ({ className, ...rest }) => {
  const classes = useStyles();
  const [products] = useState([]);
  React.useEffect(()=>{
    let value = {...rest}
    // setUser(value)
  },[rest])

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        subtitle={`${rest.data.length} in total`}
        variant="h4"
        title="Notification"
      />
      <Divider />
      {rest.data.slice(0,5).sort((a, b) => b.id - a.id).map((product, i) => (
        <div   key={product.id}>
         {  product.face.member_picture ? (
            <div> 
               {  product.face.member_picture.member.type ? (
                <Member  product={product} ></Member>
                
                ) :(
            
                <Warnning product={product}> </Warnning>
             ) 
               }
           </div>
         ) :
         (
           <Stanger product={product} ></Stanger>
         ) 

      }
       </div>

  ))}



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
  );
};

CardNotifications.propTypes = {
  className: PropTypes.string,
};

export default CardNotifications;
