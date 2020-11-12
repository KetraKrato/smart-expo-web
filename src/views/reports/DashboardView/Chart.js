import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer
} from 'recharts';
// import Title from './Title';
import { Container, Grid, Typography } from '@material-ui/core';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  MenuItem,
  FormControl,
  Select,
} from '@material-ui/core';
import theme from 'src/theme';
import MenuI from './MenuI.js';

// Generate Sales Data
function createData(time, amount, amount2) {
  return { time, amount, amount2 };
}

const data = [
  createData('00:00', 0, 100),
  createData('03:00', 300, 500),
  createData('06:00', 600, 1000),
  createData('09:00', 800, 3000),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('19:30', 2100),
  createData('21:00', 2400),
  createData('24:00', undefined),
];

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(3),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));
export default function Chart() {
//  const classes = useStyles();
//  const [age, setAge] = React.useState('');
//  const handleChange = (event) => {
//    setAge(event.target.value);
//  };
  return (
    <Card>
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
      >
        <Grid
          item
        >
          <MenuI />
        </Grid>
      </Grid>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 24,
            }}
          >
            <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
            <YAxis stroke={theme.palette.text.secondary}>
              <Label
                angle={270}
                position="left"
                style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
              >
                Sales ($)
              </Label>
            </YAxis>
            <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
            <Line type="monotone" dataKey="amount2" stroke={theme.palette.primary.main} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
