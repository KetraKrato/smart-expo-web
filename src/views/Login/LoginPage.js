import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import FacebookIcon from 'src/icons/Facebook';
import GoogleIcon from 'src/icons/Google';
import Page from 'src/components/Page';


const LoginPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
 return (
   <Page 
    className={classes.root}
    title="Login"
   >
     <Box>
        <Container>
          
        </Container>
     </Box>

   </Page>
 );
};
export default LoginPage;
