import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

const TimePickers = ({ label, hook }) => {
  const classes = useStyles();

  return (
    <div className={classes.container} noValidate>
      <TextField
        label={label}
        type="time"
        defaultValue="00:00"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300,
        }}
        {...hook}
      />
    </div>
  );
};

export default TimePickers;
