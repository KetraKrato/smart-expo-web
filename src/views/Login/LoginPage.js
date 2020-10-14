import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  // Buon,
  Container,
  // Grid,
  // Link,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
// import FacebookIcon from 'src/icons/Facebook';
// import GoogleIcon from 'src/icons/Google';
import Page from 'src/components/Page';
// import { fromPairs } from 'lodash';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#F0F0F7',
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  box: {
    backgroundColor: '#6865A5',
    height: 850,
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },

}));
const LoginPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box display="flex" flexDirection="colum" height="100%" justifyContent="center ">
        <Container maxWidth="sm" color="black">
          <Formik
            initialValues={{ email: 'test@gmail.com', password: '1234567' }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
           // onSubmit={() => { navigate('/app/dashboard', { replace: true }); }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Box>
                  <Typography
                    align="center"
                    color="textSecondary"
                    variant="body1"
                  >
                    or login with email address
                  </Typography>
                </Box>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Password"
                  name="password"
                  autoComplete="email"
                  type="password"
                  autoFocus
                />
                <Typography
                  align="center"
                  color="textSecondary"
                  variant="body1"
                >
                  or login with email address
                </Typography>
              </form>

            )}

          </Formik>
        </Container>
      </Box>

    </Page>
  );
};
export default LoginPage;
