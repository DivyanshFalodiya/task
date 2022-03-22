import { Alert, Snackbar } from "@mui/material";

const Snack = (props) => {
  return (
    <Snackbar
      open={props.open}
      autoHideDuration={6000}
      onClose={props.handleClose}
    >
      <Alert
        onClose={props.handleClose}
        severity={props.severity}
        sx={{ width: "100%" }}
      >
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default Snack;
