import React from 'react';
import {
    MenuItem, 
    FormControl, 
    Select,
    makeStyles,
  } from '@material-ui/core';

  export default function MenuI(){

    const useStyles = makeStyles((theme) => ({
      formControl: {
        height: '100%',
        marginRight: '16px',
        marginBottom: '16px',
      },
      selectEmpty: {
        marginTop: theme.spacing(2)
      }
    }));

    const [age, setAge] = React.useState('');
    const handleChange = (event) => {
      setAge(event.target.value);
    };

    const classes = useStyles();

      return(
        <FormControl variant="outlined" 
        className={classes.formControl}
        >
            <Select
              value={age}
              onChange={handleChange}
              displayEmpty
              className={classes.selectEmpty}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="">
                30 วันที่ผ่านมา
              </MenuItem>
              <MenuItem value={45}>45 วันที่ผ่านมา</MenuItem>
              <MenuItem value={60}>Twenty</MenuItem>
              <MenuItem value={90}>Thirty</MenuItem>
            </Select>
          </FormControl>
      );
  }