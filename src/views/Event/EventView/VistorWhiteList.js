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
const useStyles = makeStyles(() => ({
  root: {
    height: "100%",
  },
  avatar: {
    "& svg": {
      fontSize: 56,
    },
    backgroundColor: colors.green[600],
    height: 96,
    width: 96,
    color: colors.grey[100],
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

const VistorWhiteList = ({ className, ...rest }) => {
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
              <VerifiedUserIcon></VerifiedUserIcon>
            </Avatar>
          </Grid>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h2">
              Total Member
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

VistorWhiteList.propTypes = {
  className: PropTypes.string,
};

export default VistorWhiteList;
