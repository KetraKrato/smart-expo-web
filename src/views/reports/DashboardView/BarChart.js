import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import {
  BarChart, Bar, XAxis, YAxis, Label, ResponsiveContainer
} from 'recharts';
// import Title from './Title';
import {
  Card, CardContent, CardHeader, Typography, Divider, MenuItem, FormControl, Select, Grid,
} from '@material-ui/core';
// import { Bar } from 'react-chartjs-2';
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

export default function Chart() {
  const theme = useTheme();

  return (
    <Card>
      <Grid 
        container         
        direction="row"
        justify="space-between"
        alignItems="center">
        <Grid item>
          <CardHeader title="เปรียบเทียบการเข้า-ออก ตามตำแหน่ง" />
        </Grid>
        <Grid item>
          <MenuI/>
          <MenuI/>
        </Grid>
      </Grid>
      <Divider />
      <CardContent>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
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
            <Bar type="monotone" dataKey="amount" fill="#8884d8" dot={false} />
            <Bar type="monotone" dataKey="amount2" fill="#82ca9d" dot={false} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
