import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import Page from "../../components/Page";
import { deviceService } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { alertDialogActions } from "../../_actions";
import Alert from "../../components/Alert";
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
}));

const RegisterView = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const alertDialog = useSelector((state) => state.alertDialog);
  const [alert, setAlert] = useState(false);
  const [data, setData] = useState({});
  const [listlocation, setListlocation] = React.useState();
  useEffect(() => {
    if (alertDialog.type === "success" && data != {}) {
      deviceService
        .addDevice(data)
        .then((data) => {
          console.log(data);
          if (data.status === 200) {
            //setAlert(true);
          }
        })
        .catch((e) => {
          alert(e);
        });
    }
  }, [alertDialog]);

  useEffect(async () => {
    console.log("Datalocation");
    let dataLocation = await deviceService
      .getAlldevice(data)
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((e) => {
        //alert(e)
      });
    console.log(dataLocation.data.event[0].locations);
    setListlocation(
      dataLocation.data.event[0].locations.map((locations) => (
        <option value={locations.id}>{locations.LocationName}</option>
      ))
    );
  }, []);

  // const navigate = useNavigate();na

  return (
    <Page className={classes.root} title="Create Device">
      {alert && <Alert massage="Add Device is Success"></Alert>}
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              device_name: "",
              device_description: "",
              //device_urlAddress: "http://192.168.1.66",
              device_port: 554,
              device_ipAdress: "192.168.1.",
              stream_url: "rtsp://admin:123456@192.168.1.66:554",
              location: 0,
            }}
            validationSchema={Yup.object().shape({
              device_name: Yup.string()
                .max(10)
                .required("Device Name is required"),
              device_description: Yup.string()
                .max(255)
                .required("Description  is required"),
              //brand: Yup.string().max(50).required("Brand in requried"),
              device_ipAdress: Yup.string()
                .max(20)
                .min(10)
                .required("IP Address in requried"),
            })}
            onSubmit={(data) => {
              dispatch(
                alertDialogActions.pending(
                  "Do you want to Confirm add Device ?"
                )
              );
              let newDataDevice = {
                device_name: data.device_name,
                device_description: data.device_description,
                device_urlAddress: "http://" + data.device_ipAdress,
                device_port: 554,
                device_ipAdress: data.device_ipAdress,
                stream_url:
                  "rtsp://admin:123456@" + data.device_ipAdress + ":554",
                location: data.location,
              };
              console.log(newDataDevice);
              setData(newDataDevice);
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
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Add new device
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Create device for new position camera.
                  </Typography>
                </Box>

                <TextField
                  //error={Boolean(touched.phone_number && errors.phone_number)}
                  fullWidth
                  //helperText={touched.phone_number && errors.phone_number}
                  label="Device Name"
                  margin="normal"
                  name="device_name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.device_name}
                  variant="outlined"
                />
                <TextField
                  //error={Boolean(touched.phone_number && errors.phone_number)}
                  fullWidth
                  //helperText={touched.phone_number && errors.phone_number}
                  label="Device Description"
                  margin="normal"
                  name="device_description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.device_description}
                  variant="outlined"
                />
                <TextField
                  // error={Boolean(touched.ownerName && errors.ownerName)}
                  fullWidth
                  // helperText={touched.ownerName && errors.ownerName }
                  label="IP Address"
                  margin="normal"
                  name="device_ipAdress"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.device_ipAdress}
                  variant="outlined"
                />

                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel
                    className={classes.formControl}
                    htmlFor="outlined-age-native-simple"
                  >
                    Location
                  </InputLabel>
                  <Select
                    error={Boolean(touched.location && errors.location)}
                    native
                    value={values.location}
                    onChange={handleChange}
                    label="location"
                    inputProps={{
                      name: "location",
                      id: "outlined-age-native-simple",
                    }}
                  >
                    <option aria-label="None" value="" />
                    {/* <option value={"male"}>Staff</option>
                                  <option value={"female"}>Sale</option>
                                  <option value={"other"}>Other</option> */}
                    {listlocation}
                  </Select>
                </FormControl>

                <Box my={2}>
                  <Button
                    color="primary"
                    // disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Add Device
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
