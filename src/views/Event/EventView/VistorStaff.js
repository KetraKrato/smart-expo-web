import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors,
} from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
  avatar: {
    "& svg": {
      fontSize: 56,
    },
    backgroundColor: colors.yellow[700],
    height: 96,
    width: 96,
    color: colors.grey[100],
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const VistorStaff = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Grid
          container
          //justify="space-between"
          spacing={3}
        >
          <Grid item xs={3}>
            <Avatar className={classes.avatar}>
              <PermContactCalendarIcon></PermContactCalendarIcon>
            </Avatar>
          </Grid>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h2">
              Total Staff
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {rest.data}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

VistorStaff.propTypes = {
  className: PropTypes.string,
};

export default VistorStaff;
