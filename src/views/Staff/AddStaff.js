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
  Avatar,
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
  const [avatar, setAvatar] = useState([]);
  const [data, setData] = useState({});
  const numbers = [{ id: 1 }, { id: 2 }, { id: 3 }];
  //const listgroup = numbers.map((group)=> <option>{group.id}</option>)
  const [listgroup, setListgroup] = React.useState();
  //const [image, setImage] = React.useState();

  //console.log(image);

  useEffect(() => {
    if (alertDialog.type === "success" && data != {}) {
      userService
        .postAddmember(data)
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

  useEffect(async () => {
    console.log("Datagroup");
    let dataGroup = await userService
      .allGroup(data)
      .then((data) => {
        console.log(data);
        // if (data.status === 200) {
        //   setAlert(true)
        // }

        return data;
      })
      .catch((e) => {
        //alert(e)
      });
    console.log(dataGroup.data.group);
    setListgroup(
      dataGroup.data.group.map((group) =>
        group.name != "Dangerous" ? (
          <option value={group.id}>{group.name}</option>
        ) : (
          <div></div>
        )
      )
    );
  }, []);

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
                // initialValues={{
                //   nametitle: '',
                //   name: '',
                //   surname: '',
                //   nameeng: '',
                //   surnameeng: '',
                //   IdCardNumber: '',
                //   sex: '',
                //   birthday:'',
                //   age: '',
                //   height: '',
                //   weight: '',
                //   address: '',
                //   home_phone:'',
                //   phone_number: '',
                //   position: '',
                //   company: '',
                //   email:'',

                // }}
                initialValues={{
                  groupId: Number,
                  firstName: "",
                  lastName: "",
                  email: "",
                  idCard: "",
                  titleName: "",
                  gender: "",
                  birthday: "00-00-2020",
                  age: "",
                  nationality: "",
                  company: "",
                  address: "",
                  type: 1,
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email("Must be a valid email")
                    .max(255)
                    .required("Email is required"),
                  titleName: Yup.string()
                    .max(255)
                    .required("NameTitle is required"),
                  firstName: Yup.string().max(255).required("Name is required"),
                  lastName: Yup.string()
                    .max(255)
                    .required("Surname is required"),
                  idCard: Yup.string()
                    .max(255)
                    .required("ID CardNumber is required"),
                  nationality: Yup.string()
                    .max(255)
                    .required("Nationality is required"),
                  age: Yup.string().max(3).required("required"),
                  birthday: Yup.string()
                    .max(255)
                    .required("Birthday is required"),
                  address: Yup.string()
                    .max(255)
                    .required("Address is required"),
                  company: Yup.string()
                    .max(255)
                    .required("Company is required"),
                  // home_phone: Yup.string()
                  //   .max(255)
                  //   .required("Address is required"),
                  // policy: Yup.boolean().oneOf([true], 'This field must be checked')
                })}
                onSubmit={(data) => {
                  let formdata = new FormData();

                  for (const key in data) {
                    formdata.append(key, data[key]);
                  }
                  formdata.append("avatar", avatar[0]);

                  // data.avatar = avatar[0];
                  console.log(formdata);

                  // data.avatar = props.onValueChange
                  // dispatch(
                  //   alertDialogActions.pending(
                  //     "Do you want to Confirm add Staff ?"
                  //   )
                  // );
                  //setData(data)
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
                          Add Staff
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
                          error={Boolean(touched.firstName && errors.firstName)}
                          fullWidth
                          helperText={touched.firstName && errors.firstName}
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
                          error={Boolean(touched.lastName && errors.lastName)}
                          fullWidth
                          helperText={touched.lastName && errors.lastName}
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
                          error={Boolean(touched.idCard && errors.idCard)}
                          fullWidth
                          helperText={touched.idCard && errors.idCard}
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
                                // error={Boolean(touched.gender && errors.gender)}
                                // helperText={touched.gender && errors.gender}
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
                                <option value={"unknow"}>Other</option>
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
                          {/* <Grid item xs={2}>
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
                      </Grid> */}
                        </Grid>
                        <TextField
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
                        {/* <TextField
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
                  
                    /> */}
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
                          <Grid item xs={3}>
                            <FormControl
                              variant="outlined"
                              className={classes.formControl}
                            >
                              <InputLabel
                                className={classes.formControl}
                                htmlFor="outlined-age-native-simple"
                              >
                                Position
                              </InputLabel>
                              <Select
                                error={Boolean(
                                  touched.position && errors.position
                                )}
                                native
                                value={values.groupId}
                                onChange={handleChange}
                                label="position"
                                inputProps={{
                                  name: "groupId",
                                  id: "outlined-age-native-simple",
                                }}
                              >
                                <option aria-label="None" value="" />
                                {/* <option value={"male"}>Staff</option>
                                  <option value={"female"}>Sale</option>
                                  <option value={"other"}>Other</option> */}
                                {listgroup}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Grid item xs>
                            <TextField
                              error={Boolean(touched.company && errors.company)}
                              fullWidth
                              helperText={touched.company && errors.company}
                              label="Company"
                              margin="normal"
                              name="company"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="text"
                              value={values.company}
                              variant="outlined"
                            />
                          </Grid>
                        </Grid>
                        <Grid container xs={12}>
                          <Grid item xs={12}>
                            <TextField
                              className={classes.fixTextbox}
                              id="outlined-multiline-static"
                              //error={Boolean(touched.home_phone&& errors.home_phone)}
                              fullWidth
                              // multiline
                              // rows={4}
                              //helperText={touched.address && errors.address}
                              label="Home Phone"
                              margin="normal"
                              name="home_phone"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="text"
                              value={values.home_phone}
                              variant="outlined"
                            />
                            <TextField
                              className={classes.fixTextbox}
                              // error={Boolean(touched.name && errors.name)}
                              fullWidth
                              //helperText={touched.name && errors.name}
                              label="Moblie Phone"
                              margin="normal"
                              name="phone_number"
                              autoComplete="given-name"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="text"
                              value={values.phone_number}
                              variant="outlined"
                            />
                            <TextField
                              //className={classes.Name}
                              error={Boolean(touched.email && errors.email)}
                              fullWidth
                              className={classes.fixTextbox}
                              helperText={touched.email && errors.email}
                              label="Email"
                              margin="normal"
                              name="email"
                              autoComplete="given-name"
                              onBlur={handleBlur}
                              onChange={handleChange}
                              type="email"
                              value={values.email}
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
                            //value={values.avatar = setImage[image]}
                            //check={setImage(image)}
                            //setImage ={setImage}
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
                            navigate("/app/staff", { push: true });
                          }}
                        >
                          Cancle
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          color="primary"
                          // disabled={isSubmitting}
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
