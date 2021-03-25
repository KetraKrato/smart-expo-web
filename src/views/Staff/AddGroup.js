import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
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
  FormControl,
} from "@material-ui/core";
import Page from "../../components/Page";
import { useNavigate } from "react-router-dom";
import { SketchPicker, ChromePicker } from "react-color";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  Cancel: {
    background: "#ba000d",
    color: "#ffffff",
  },
  swatch: {
    margin: theme.spacing(3,0,0,1),
    padding: "5px",
    background: "#fff",
    borderRadius: "1px",
    boxShadow: "0 0 0 1px rgba(0,0,0,.1)",
    display: "inline-block",
    cursor: "pointer",
  },
  color: {
    width: "200px",
    height: "30px",
    borderRadius: "2px",
    // background: `rgba(${ this.color.r }, ${ this.color.g }, ${ this.color.b }, ${ this.color.a })`,
  },
  popover: {
    position: "absolute",
    zIndex: "2",
  },
  cover: {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  },
}));

const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState({ r: "241", g: "112", b: "19", a: "1" });
  function handleClick() {
    setDisplayColorPicker(!displayColorPicker);
    console.log(displayColorPicker);
  }

  function handleClose() {
    setDisplayColorPicker(!displayColorPicker);
  }

  function handleChange(color) {
    console.log(color);
    setColor(color.rgb);
  }
  // useEffect(() => {
  //   console.log(color);
  // }, [color]);
  return (
    <Page className={classes.root} title="Register">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
        alignContent="center"
      >
        <Container>
          <Formik
            initialValues={{
              name: "",
              type: true,
              color: "",
            }}
            validationSchema={Yup.object().shape({
              // email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              // password: Yup.string().max(255).required('password is required'),
              // policy: Yup.boolean().oneOf([true], 'This field must be checked')
            })}
            onSubmit={() => {
              // navigate('/app/dashboard', { replace: true });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChangeText,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <Grid container>
                  <Box sm={12}>
                    <Typography color="textPrimary" variant="h2">
                      Add Position
                    </Typography>
                  </Box>
                </Grid>
                <Grid container>
                  <Grid item xs={10}>
                    {" "}
                    <TextField
                      // error={Boolean(touched.email && errors.email)}
                      fullWidth
                      // helperText={touched.email && errors.email}
                      label="Name Position"
                      margin="normal"
                      name="nameposition"
                      onBlur={handleBlur}
                      onChange={handleChangeText}
                      type="text"
                      value={values.email}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    {/* <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Color Position
                  </Typography> */}
                    <div className={classes.swatch} onClick={handleClick}>
                      <div
                        className={classes.color}
                        style={{
                          backgroundColor: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
                        }}
                      />
                    </div>
                    <div>
                      {displayColorPicker ? (
                        <div className={classes.popover}>
                          <div
                            className={classes.cover}
                            onClick={handleClose}
                          />
                          <ChromePicker color={color} onChange={handleChange} />
                        </div>
                      ) : null}
                    </div>
                  </Grid>
                </Grid>

                <Box my={2}>
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
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    // fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Add
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
