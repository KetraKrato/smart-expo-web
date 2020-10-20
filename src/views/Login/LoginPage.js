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
  Input,
  InputAdornment,
  IconButton,
  // BottomNavigation,
  // GridList,
} from '@material-ui/core';
import FacebookIcon from 'src/icons/Facebook';
// import GoogleIcon from 'src/icons/Google';
import Page from 'src/components/Page';
// import { fromPairs } from 'lodash';
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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
  textbox: {
    width: '257px'
  },
}));
const LoginPage = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSignUp = () => {
    navigate('/registerpage', { replace: true });
  };
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
                  <Grid container direction="column" justify="center" alignItems="center" spacing={4}>
                    <Grid item xs={6}>
                      <Input
                        className={classes.textbox}
                        variant="standard"
                        margin="normal"
                        required
                        id="Username"
                        placeholder="Username"
                        name="Username"
                        autoComplete="Username"
                        type="text"
                        autoFocus
                        startAdornment={
                          <InputAdornment position="start">
                            <PersonIcon color="primary" fontSize="large" />
                          </InputAdornment>
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Input
                        fullWidth
                        variant="standard"
                        margin="normal"
                        required
                        id="Password"
                        placeholder="Password"
                        name="Password"
                        type={values.showPassword ? 'text' : 'password'}
                        startAdornment={
                          <InputAdornment position="start">
                            <VpnKeyIcon color="primary" fontSize="large" />
                          </InputAdornment>
                        }
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <Grid
                        container
                        direction="row"
                        justify="flex-end"
                        alignItems="flex-start"
                      >
                        <Grid item>
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
                    <Button
                      onClick={handleSignUp}
                    >
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
