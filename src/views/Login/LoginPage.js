import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  // AccessAlarm,
  // ThreeDRotation,
  Box,
  Button,
  // Buon,
  Container,
  Grid,
  // Link,
  TextField,
  Typography,
  makeStyles,
  // BottomNavigation,
  // GridList,
} from '@material-ui/core';
import FacebookIcon from 'src/icons/Facebook';
// import GoogleIcon from 'src/icons/Google';
import Page from 'src/components/Page';
// import { fromPairs } from 'lodash';
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
    // paddingBottom: theme.spacing(3),
    // padding: theme.spacing(3)
  },
  box: {
    // backgroundColor: "#3f51b5",
    backgroundColor: '#90caf9',
    height: '850px',
  },
  hh: {
    fontSize: '50px',
    color: '#FFFFFF',
    // backgroundColor: '#451832'
  },
  gidcheck: {
    color: '#FFFFFF',
    // backgroundColor: '#451832'
  },
  buttonC: {
    width: '420px'
  },
  forgot: {
    cursor: 'pointer'

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
        <Container maxWidth="sm">
          <Formik
            initialValues={{ email: 'test@gmail.com', password: '1234567' }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={() => { navigate('/app/dashboard', { replace: true }); }}
          >
            {({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Grid
                  container
                  className={classes.box}
                  direction="column"
                  justify="space-evenly"
                  alignItems="center"
                >
                  <Grid item>
                    <Typography
                      align="center"
                      className={classes.hh}
                    >
                      Sign In
                    </Typography>
                  </Grid>
                  <Grid item direction="column" container>
                    <Grid item>
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        xs={12}
                      >
                        <Grid item xs={1}><PersonIcon color="primary" fontSize="large" /></Grid>
                        <Grid item xs={7}>
                          <TextField
                            fullWidth
                            variant="standard"
                            margin="normal"
                            required
                            id="Email"
                            label="Email Address"
                            name="Email"
                            autoComplete="email"
                            type="email"
                            autoFocus
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        direction="column"
                        justify="space-around"
                        alignItems="center"
                        xs={12}
                      >
                        <Grid
                          container
                          direction="row"
                          justify="center"
                          alignItems="center"
                          xs={12}
                        >
                          <Grid item xs={1}>
                            <VpnKeyIcon color="primary" fontSize="large"/>
                          </Grid>
                          <Grid item xs={7}>
                            <TextField
                              variant="standard"
                              margin="normal"
                              required
                              fullWidth
                              id="email"
                              label="Password"
                              name="password"
                              autoComplete="email"
                              type="password"
                            />
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          direction="row-reverse"
                          justify="space-between"
                          alignItems="flex-start"
                          xs={8}
                        >
                          <Typography
                            align="right"
                            color="textSecondary"
                            variant="subtitle2"
                            display="inline"
                            onClick={handleSubmit}
                            className={classes.forgot}
                          >
                            Forgot Password?
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container justify="center">
                    <Button
                      className={classes.buttonC}
                      color="primary"
                      size="large"
                      variant="contained"
                      onClick={handleSubmit}
                    >
                      Login
                    </Button>
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Typography
                      align="right"
                      color="textSecondary"
                      variant="subtitle2"
                      style={{
                        cursor: "pointer"
                      }}
                    >
                      Don't have an Account?
                    </Typography>
                    <Button>
                      Sign up
                    </Button>
                  </Grid>
                </Grid>
              </form>

            )}

          </Formik>
        </Container>
      </Box>

    </Page>
  );
};
export default LoginPage;
