import React from 'react';
import { Link as RouterLink} from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControl
} from '@material-ui/core';
import Page from '../../components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RegisterView = () => {
  const classes = useStyles();
  // const navigate = useNavigate();na

  return (
    <Page
      className={classes.root}
      title="Register"
    >
      <Box  
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container>

          <Formik
            initialValues={{
            nametitle:'',
            name: '',
              surname: '',
              nameeng: '',
              surnameeng: '',
              sex: '',
              birthday: '',
              location:'',
              email: '',
              password: '',
              confirmpassword: '',
              policy: false
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                password: Yup.string().max(255).required('password is required'),
                policy: Yup.boolean().oneOf([true], 'This field must be checked')
              })
            }
            onSubmit={() => {
              // navigate('/app/dashboard', { replace: true });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Grid container>
                <Box sm={12}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography>
                </Box>
                </Grid>
                <Grid 
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  spacing={1}
                  xs={12}           
                  >
                  <Grid item xs={2}>
                      <TextField
                  error={Boolean(touched.nametitle && errors.nametitle)}
                  fullWidth
                  helperText={touched.nametitle && errors.nametitle}
                  label="Name Title"
                  margin="normal"
                  name="honorific-prefix"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.nametitle}
                  variant="outlined"
                  />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  helperText={touched.name && errors.name}
                  label="Name"
                  margin="normal"
                  name="given-name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.name}
                  variant="outlined"
                />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                  error={Boolean(touched.surname && errors.surname)}
                  fullWidth
                  helperText={touched.surname && errors.surname}
                  label="Surname"
                  margin="normal"
                  name="family-name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.surname}
                  variant="outlined"
                    />
                    </Grid>
                </Grid>
                <Box fullWidth>
                        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={values.age}
          onChange={handleChange}
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Male"}>Male</MenuItem>
          <MenuItem value={"Female"}>Female</MenuItem>
          <MenuItem value={"Other"}>Other</MenuItem>
        </Select>
      </FormControl>
      </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                    />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                    />
                <TextField
                  error={Boolean(touched.confirmpassword && errors.confirmpassword && touched.password)}
                  fullWidth
                  helperText={touched.confirmpassword && errors.confirmpassword && touched.password}
                  label="ConfirmPassword"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.confirmpassword}
                  variant="outlined"
                />
                
                <Box
                  alignItems="center"
                  display="flex"
                  ml={-1}
                >
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    I have read the
                    {' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>
                    {errors.policy}
                  </FormHelperText>
                )}
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Sign in
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
