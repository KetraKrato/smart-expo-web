import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Button,
    ListItem,
    Grid,
    Icon,colors,
    IconButton,
    Box,
    } from "@material-ui/core"
    import { useDispatch, useSelector, } from 'react-redux'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  
     
  avatar: {
    
    backgroundColor: colors.green[300],
    color:colors.grey[100],
    spacing:2
  },
  icon :{
    color:colors.grey[50]
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function SimpleAccordion(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (

    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className={classes.icon} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{props.data.LocationName}</Typography>
        </AccordionSummary>
        { props.data.devices.map((device)=>(
         <AccordionDetails key={device.id}
         >
             <Grid
                container
                 justify="space-between"
                 alignItems="center"
                spacing={3}
                > 
                    <Grid item>
                   
                        <ListItem>
                            <Box m={1}>
                            < IconButton className={classes.avatar} ></IconButton>
                            </Box>
                            <Box>
                              {device.device_name}
                            </Box>
                        </ListItem>
                     </Grid>

                <Grid item>
                <Button  variant="contained" color="primary" 
                onClick={()=>{
                    dispatch({type:"SELECT DEVICE",device:device})
                }}
                >
                    View
                </Button>
                </Grid>

        </Grid>  
        </AccordionDetails>

        ))
        }
      </Accordion>
      
  
    </div>
  );
}