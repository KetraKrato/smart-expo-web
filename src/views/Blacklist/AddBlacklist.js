import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Card,
  CardContent,
  CardActions,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import Page from "../../components/Page";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";
import DropzoneDialog from "./DropzoneDialog";
import CardMedia from "@material-ui/core/CardMedia";
// import Klee from './Klee.jpg'
// import { red } from '@material-ui/core/colors';
import { useNavigate } from "react-router-dom";
import { deviceService } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { alertDialogActions } from "../../_actions";
import Alert from "../../components/Alert";
import { userService } from "../../services";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  formControl: {
    paddingTop: theme.spacing(1),
    //marginTop: theme.spacing(1),
    width: "100%",
  },
  media: {
    width: 150,
    height: 150,
  },
  text: {
    height: 100,
  },
  Cancel: {
    background: "#ba000d",
    color: "#ffffff",
  },
  Name: {
    marginLeft: "8px",
    paddingRight: "8px",
  },
  fixTextbox: {
    paddingRight: "8px",
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

const date = "2021-06-26"; // or Date or Moment.js

const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alertDialog = useSelector((state) => state.alertDialog);
  const [alert, setAlert] = useState(false);
  const [data, setData] = useState({});
  const [avatar, setAvatar] = useState([]);
  useEffect(() => {
    if (alertDialog.type === "success" && data != {}) {
      deviceService
        .addDevice(data)
        .then((data) => {
          console.log(data);
          if (data.status === 200) {
            setAlert(true);
          }
        })
        .catch((e) => {
          alert(e);
        });
    }
  }, [alertDialog]);

  return (
    <Page className={classes.root} title="Add Blacklist">
      {alert && <Alert massage="Add Blacklist is Success"></Alert>}
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container>
          <Card>
            <CardContent>
              <Formik
                initialValues={{
                  groupId: 2,
                  titleName: "",
                  firstName: "",
                  lastName: "",
                  idCard: "",
                  // PassportNumber: '',
                  gender: "",
                  nationality: "",
                  birthday: "00-00-2020",
                  age: "",
                  // height: '',
                  // weight: '',
                  address: "",
                  company: "None",
                  email: "None",
                  // phone_number:'',
                  type: 0,
                }}
                validationSchema={Yup.object().shape({
                  titleName: Yup.string()
                  .max(255)
                  .required("NameTitle is required"),
                  // email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                  // name: Yup.string().max(255).required('name is required'),
                  // policy: Yup.boolean().oneOf([true], 'This field must be checked')
                })}
                onSubmit={(data) => {
                  // dispatch(alertDialogActions.pending("Do you want to Confirm add Blacklist ?"));
                  // setData(data)
                  // console.log(data)

                  let formdata = new FormData();

                  for (const key in data) {
                    formdata.append(key, data[key]);
                  }
                  formdata.append("avatar", avatar[0]);

                  // data.avatar = avatar[0];
                  console.log(formdata);

                  userService.postAddmember(formdata);
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
                  values,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Grid container>
                      <Box sm={12}>
                        <Typography color="textPrimary" variant="h2">
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

                    {/* <CardContent> */}
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                      spacing={0}
                      xs={12}
                    >
                      <Grid item xs={2}>
                      <FormControl
                          variant="outlined"
                          className={classes.formControl}
                        >
                          <InputLabel
                            className={classes.formControl}
                            htmlFor="outlined-age-native-simple"
                          >
                            NameTitle
                          </InputLabel>
                          <Select
                            native
                            error={Boolean(
                              touched.titleName && errors.titleName
                            )}
                            helperText={touched.titleName && errors.titleName}
                            value={values.titleName}
                            onChange={handleChange}
                            label="NameTitle"
                            inputProps={{
                              name: "titleName",
                              id: "outlined-age-native-simple",
                            }}
                          >
                            <option aria-label="None" value="" />
                            <option value={"Mr"}>Mr</option>
                            <option value={"Mrs"}>Mrs</option>
                            <option value={"Other"}>Other</option>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={5}>
                        <TextField
                          className={classes.Name}
                          error={Boolean(touched.name && errors.name)}
                          fullWidth
                          helperText={touched.name && errors.name}
                          label="Name"
                          margin="normal"
                          name="firstName"
                          autoComplete="given-name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="text"
                          value={values.firstName}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={5}>
                        <TextField
                          className={classes.Name}
                          error={Boolean(touched.surname && errors.surname)}
                          fullWidth
                          helperText={touched.surname && errors.surname}
                          label="Surname"
                          margin="normal"
                          name="lastName"
                          autoComplete="family-name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="text"
                          value={values.lastName}
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                    <Grid container spacing={0}>
                      <Grid item xs={12}>
                        <TextField
                          error={Boolean(
                            touched.IdCardNumber && errors.IdCardNumber
                          )}
                          fullWidth
                          helperText={
                            touched.IdCardNumber && errors.IdCardNumber
                          }
                          label="ID CardNumber"
                          margin="normal"
                          name="idCard"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          type="text"
                          value={values.idCard}
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
                          error={Boolean(
                            touched.PassportNumber && errors.PassportNumber
                          )}
                          fullWidth
                          helperText={
                            touched.PassportNumber && errors.PassportNumber
                          }
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
                      <Grid container xs={10}>
                        <Grid
                          container
                          xs={12}
                          direction="row"
                          justify="flex-start"
                          alignItems="center"
                          spacing={1}
                        >
                          <Grid item xs={1}>
                            <FormControl
                              variant="outlined"
                              className={classes.formControl}
                            >
                              <InputLabel
                                className={classes.formControl}
                                htmlFor="outlined-age-native-simple"
                              >
                                Sex
                              </InputLabel>
                              <Select
                                native
                                value={values.gender}
                                onChange={handleChange}
                                label="sex"
                                inputProps={{
                                  name: "gender",
                                  id: "outlined-age-native-simple",
                                }}
                              >
                                <option aria-label="None" value="" />
                                <option value={"male"}>Male</option>
                                <option value={"female"}>Female</option>
                                <option value={"other"}>Other</option>
                              </Select>
                            </FormControl>
                          </Grid>
                          {/* <Grid item xs={1}>
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
                      </Grid> */}
                          <Grid item xs={2}>
                            <TextField
                              error={Boolean(
                                touched.nationality && errors.nationality
                              )}
                              fullWidth
                              helperText={
                                touched.nationality && errors.nationality
                              }
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
                          <Grid item xs={2}>
                            <TextField
                              id="date"
                              error={Boolean(
                                touched.birthday && errors.birthday
                              )}
                              fullWidth
                              helperText={touched.birthday && errors.birthday}
                              label="Birthday"
                              margin="normal"
                              name="birthday"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="date"
                              value={values.birthday}
                              variant="outlined"
                              emptyLabel
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </Grid>
                        </Grid>
                        <Grid container xs={12} spacing={1}>
                          <Grid item xs={2}>
                            <TextField
                              error={Boolean(touched.age && errors.age)}
                              fullWidth
                              helperText={touched.age && errors.age}
                              label="Height"
                              margin="normal"
                              name="height"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="number"
                              value={values.height}
                              variant="outlined"
                              //  InputProps={{
                              //       inputComponent: BirthFormatCustom,
                              //   }}
                            />
                          </Grid>
                          <Grid item xs={2}>
                            <TextField
                              error={Boolean(touched.age && errors.age)}
                              fullWidth
                              helperText={touched.age && errors.age}
                              label="Weight"
                              margin="normal"
                              name="weight"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="number"
                              value={values.weight}
                              variant="outlined"
                              //  InputProps={{
                              //       inputComponent: BirthFormatCustom,
                              //   }}
                            />
                          </Grid>
                        </Grid>
                        <Grid container xs={12}>
                          <Grid item xs={12}>
                            <TextField
                              className={classes.fixTextbox}
                              id="outlined-multiline-static"
                              error={Boolean(touched.address && errors.address)}
                              fullWidth
                              multiline
                              rows={4}
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
                      <Grid
                        container
                        direction="row"
                        justify="flex-end"
                        alignItems="center"
                        xs={2}
                      >
                        <Grid item>
                          <DropzoneDialog
                            className={classes.media}
                            onValueChange={(value) => {
                              setAvatar(value);
                              console.log(`Value Updated: ${value}
                        `);
                              console.log(value[0]);
                              // console.log(value)
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      direction="row"
                      justify="flex-end"
                      alignItems="center"
                      spacing={1}
                    >
                      <Grid item>
                        <Button
                          className={classes.Cancel}
                          //disabled={isSubmitting}
                          // fullWidth
                          size="large"
                          //type="submit"
                          variant="contained"
                          onClick={() => {
                            navigate("/app/blacklist", { replace: true });
                          }}
                        >
                          Cancle
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          color="primary"
                          //disabled={isSubmitting}
                          fullWidth
                          size="large"
                          type="submit"
                          variant="contained"
                        >
                          Add
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
