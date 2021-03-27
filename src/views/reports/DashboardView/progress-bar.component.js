import React from "react";
import {
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import { AlignCenter } from "react-feather";
const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

  const containerStyles = {
    height: 20,
    width: '100%',
    backgroundColor: "#FE00E5",
    borderRadius: 0,
    marginTop: 0,
    marginBottom:0,
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right'
  }

  const labelStyles = {
    padding: 5,
    color: 'white',
    fontWeight: 'bold'
  }


  return (
    <div>
    <div style={{
      marginTop:50,
      //textAlign: 'center'
    }}>
      <Grid container
        direction="row"
        justify="space-between"
        alignItems="center"
       >
        <Grid item>
        <span variant="h3" style={{
      fontSize:'60px',
        padding: 5,
        // textAlign:'left',
       // marginLeft: '50px',
        color: 'white',
        fontWeight: 'bold',
        postion: 'inline',
        color:"#0928B5",}}
    >{`${completed}`}</span>
    <span style={{fontSize:'30px'}}>%</span>
        </Grid>
        <Grid item>
        <span variant="h3" style={{
            fontSize:'60px',
              padding: 5,
              //marginLeft: '120px',
              color: 'white',
              fontWeight: 'bold',
              postion: 'inline',
              color:"#FE00E5",}}
              >{`${100-completed}`}</span>
              <span style={{fontSize:'30px'}}>%</span>
        </Grid>
      </Grid>
    
    </div>
        <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>
          </span>
      </div>
    </div>

    </div>
    
  );
};

export default ProgressBar;