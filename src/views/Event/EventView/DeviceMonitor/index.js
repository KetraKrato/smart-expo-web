import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes, { element } from 'prop-types';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';
import Device  from "./DeviceManage"
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  colors,
  makeStyles,
  
} from '@material-ui/core';
import {deviceService} from "../../../../services"
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

const DeviceMonitor = ({ className, ...rest }) => {
  const classes = useStyles();
  const [allDevice,setAlldevice] = useState({event:[]});
  React.useEffect(async ()=>{

    let AllDevice = await deviceService.getAlldevice().then((data)=>{
    // console.log(data)
      
      return data
  
    }).catch((e)=>{
      throw e
    })
    setAlldevice(AllDevice.data)
    console.log(AllDevice.data)

    // setUser(value)
  },[])

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        variant="h4"
        title="Location Manager"
      />
      <Divider />
     {allDevice?.event.map((event)=>
        <div key={event.id}>
          {
           event?.locations.map((location)=>
           <Device key={location.id}  data={location}></Device>)
          }
        </div>
      )}
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

DeviceMonitor.propTypes = {
  className: PropTypes.string,
};

export default DeviceMonitor;
