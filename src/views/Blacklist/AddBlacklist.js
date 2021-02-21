import React, { useState} from 'react';
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
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import DropzoneDialog from './DropzoneDialog';
import CardMedia from '@material-ui/core/CardMedia';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  formControl: {
    paddingTop: theme.spacing(1),
    //marginTop: theme.spacing(1),
    //minWidth: 120,
  },
  media: {
    width:345,
    height: 140,
  },
}));

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      format="#-###-###-####"
      mask="_"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

// function BirthFormatCustom(props) {
//   const { inputRef, onChange, ...other } = props;

//   return (
//     <NumberFormat
//       {...other}
//       getInputRef={inputRef}
//       onValueChange={(values) => {
//         onChange({
//           target: {
//             name: props.name,
//             value: values.value,
//           },
//         });
//       }}
//       thousandSeparator
//       isNumericString
//       format="##/##/##"
//       mask="DD/MM/YY"
//     />
//   );
// }

// BirthFormatCustom.propTypes = {
//   inputRef: PropTypes.func.isRequired,
//   name: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
// };

const RegisterView = () => {
  const classes = useStyles();
  const [data,setData] = useState({})
  // const navigate = useNavigate();na

  return (
    <Page
      className={classes.root}
      title="Add Blacklist"
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
              IdCardNumber: '',
              PassportNumber:'',
              sex: '',
              race: '',
              nationality: '',
              birthday: '',
              age: '',
              height: '',
              weight: '',
              address: '',
              phone_number:'',
              policy: false
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                name: Yup.string().max(255).required('name is required'),
                policy: Yup.boolean().oneOf([true], 'This field must be checked')
              })
            }
            onSubmit={(data) => {
              setData(data)
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
                    Add Blacklist
                  </Typography>
                  {/* <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography> */}
                </Box>
                </Grid>
                <Grid 
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  spacing={0}
                  xs={12}           
                  >
                  <Grid item xs={2}>
                <TextField
                  error={Boolean(touched.nametitle && errors.nametitle)}
                  fullWidth
                  helperText={touched.nametitle && errors.nametitle}
                  label="NameTitle"
                  margin="normal"
                      name="nametitle"
                    autoComplete="honorific-prefix"
                  onBlur={handleBlur}
                  onChange={handleChange}
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
                      name="name"
                  autoComplete="given-name"
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
                      name="surname"
                  autoComplete="family-name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.surname}
                  variant="outlined"
                    />
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                  <Grid item xs={12}>
                   <TextField
                  error={Boolean(touched.IdCardNumber && errors.IdCardNumber)}
                  fullWidth
                  helperText={touched.IdCardNumber && errors.IdCardNumber}
                  label="ID CardNumber"
                  margin="normal"
                  name="IdCardNumber"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.IdCardNumber}
                    variant="outlined"
                  InputProps={{
                      inputComponent: NumberFormatCustom,
                            }}
                    />
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                  <Grid item xs={12}>
                   <TextField
                  error={Boolean(touched.PassportNumber && errors.PassportNumber)}
                  fullWidth
                  helperText={touched.PassportNumber && errors.PassportNumber}
                  label="Passport Number"
                  margin="normal"
                    name="PassportNumber"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.PassportNumber}
                    variant="outlined"
                  
                    />
                    </Grid>
                </Grid>
                <Grid container xs={12}>
                  <Grid container xs={9}>
                    <Grid container xs={12}
                      direction="row"
                      justify="flex-start"
                      alignItems="center">
                       <Grid item xs={1}>
                          <FormControl variant="outlined" className={classes.formControl}>
                              <InputLabel className={classes.formControl} htmlFor="outlined-age-native-simple">Sex</InputLabel>
                                  <Select
                                    native
                                    value={values.sex}
                                    onChange={handleChange}
                                    label="sex"
                                    inputProps={{
                                    name: 'sex',
                                    id: 'outlined-age-native-simple',
                                    }}
                                  >
                                  <option aria-label="None" value="" />
                                  <option value={"male"}>Male</option>
                                  <option value={"female"}>Female</option>
                                  <option value={"other"}>Other</option>
                                  </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={1}>
                        <TextField
                          error={Boolean(touched.race && errors.race)}
                          fullWidth
                          helperText={touched.race && errors.race}
                          label="Race"
                          margin="normal"
                          name="race"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="text"
                          value={values.race}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <TextField
                          error={Boolean(touched.nationality && errors.nationality)}
                          fullWidth
                          helperText={touched.nationality && errors.nationality}
                          label="Nationality"
                          margin="normal"
                          name="nationality"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="text"
                          value={values.nationality}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <TextField
                          error={Boolean(touched.birthday && errors.birthday)}
                          fullWidth
                          helperText={touched.birthday && errors.birthday}
                          label="Birthday"
                          margin="normal"
                          name="birthday"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="text"
                          value={values.birthday}
                          variant="outlined"
                          //  InputProps={{
                          //       inputComponent: BirthFormatCustom,
                          //   }}
                        />
                      </Grid>
                      <Grid item xs={1}>
                        <TextField
                          error={Boolean(touched.age && errors.age)}
                          fullWidth
                          helperText={touched.age && errors.age}
                          label="Age"
                          margin="normal"
                          name="age"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="number"
                          value={values.age}
                          variant="outlined"
                          //  InputProps={{
                          //       inputComponent: BirthFormatCustom,
                          //   }}
                        />
                      </Grid>
                    </Grid>
                    <Grid container xs={12}>

                    </Grid>
                    <Grid container xs={12}>
                      <Grid item xs={12}>
                        <TextField
                  error={Boolean(touched.address && errors.address)}
                  fullWidth
                  helperText={touched.address && errors.address}
                  label="Address"
                  margin="normal"
                    name="address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.address}
                    variant="outlined"
                    />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container xs={3}>
                    <DropzoneDialog className={classes.media} />
                    <CardMedia
                      className={classes.media}
                    image="../Blcklist/Klee.JPG"
                    title="Contemplative Reptile"
                    />
                  </Grid>
                </Grid>

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
