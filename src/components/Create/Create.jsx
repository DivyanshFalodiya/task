import { Cancel, Check } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Snack from "../Misc/Snack";

// Styles
const useStyles = makeStyles((theme) => ({
  input: {
    "&:-webkit-autofill": {
      WebkitBoxShadow: `0 0 0 1000px ${
        theme.palette.mode === "dark" ? "#353535" : "#EBEBEB"
      } inset`,
      borderRadius: 0,
    },
  },
}));

// Create Page
const Create = () => {
  const theme = useTheme();
  const classes = useStyles();
  const navigation = useNavigate();

  // States
  const [data, setData] = useState({
    fname: { value: "", dirty: false, valid: false },
    lname: { value: "", dirty: false, valid: false },
    dob: { value: "", dirty: false, valid: false },
    email: { value: "", dirty: false, valid: false },
    about: { value: "", dirty: false, valid: false },
  });
  const [snackOpt, setSnackOpt] = useState({
    severity: "success",
    message: "",
    open: false,
  });

  // Helpers
  const dataMapping = [
    { field: "fname", label: "First Name", type: "text" },
    { field: "lname", label: "Last Name", type: "text" },
    { field: "email", label: "Email", type: "email" },
    { field: "dob", label: "Date of Birth", type: "date" },
    { field: "about", label: "About", type: "text" },
  ];

  // Get AGE by DOB
  const getAge = (date) => {
    var age = Math.floor(
      (new Date() - new Date(date)) / 1000 / 60 / 60 / 24 / 365
    );
    return age;
  };

  // Reset all data
  const resetData = () => {
    setData({
      fname: { value: "", dirty: false, valid: false },
      lname: { value: "", dirty: false, valid: false },
      dob: { value: "", dirty: false, valid: false },
      email: { value: "", dirty: false, valid: false },
      about: { value: "", dirty: false, valid: false },
    });
  };

  // Close Snackbar
  const handleSnackClose = () => {
    setSnackOpt((prev) => ({ ...prev, open: false }));
  };

  // Validity Check
  const checkValidity = (field, val) => {
    // About field
    if (field === "about" && val.length > 0) return true;

    // Name fields
    if (
      (field === "fname" || field === "lname") &&
      val.length > 0 &&
      val.match(/^[A-Za-z]+$/)
    )
      return true;

    // Email field
    if (
      field === "email" &&
      val.length > 0 &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val)
    )
      return true;

    // DOB Field
    if (field === "dob" && getAge(val) >= 18) return true;
    return false;
  };

  // Handle Change
  const handleChange = (e) => {
    setData((prev) => {
      let value = e.target.value;
      if (
        e.target.name === "email" ||
        e.target.name === "fname" ||
        e.target.name === "lname" ||
        e.target.name === "dob"
      )
        value = value.trim();
      return {
        ...prev,
        [e.target.name]: {
          value: value,
          dirty: true,
          valid: checkValidity(e.target.name, value),
        },
      };
    });
  };

  // Handle Submit
  const submit = (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    let flag = false;
    for (const f in data) {
      if (!data[f].valid) {
        flag = true;
        break;
      }
    }
    if (flag) {
      // Set Error Snackbar
      setSnackOpt({
        open: true,
        message: "Invalid Data!",
        severity: "error",
      });
    } else {
      let user = users.find((u) => u.email === data.email.value);
      if (user) {
        setSnackOpt({
          open: true,
          message: "Email Address Already In Use!",
          severity: "error",
        });
      } else {
        data.about.value = data.about.value.trim();
        users.push({
          email: data.email.value,
          fname: data.fname.value,
          lname: data.lname.value,
          dob: data.dob.value,
          about: data.about.value,
          timestamp: Date.now(),
        });
        localStorage.setItem("users", JSON.stringify(users));
        resetData();
        setSnackOpt({
          open: true,
          message: "Data Saved!",
          severity: "success",
        });
        navigation("/", { replace: true });
      }
    }
  };

  return (
    <Box>
      <Typography
        variant="h5"
        align="center"
        color={theme.palette.text.primary}
      >
        Create User
      </Typography>
      <Box
        sx={{
          marginTop: theme.spacing(2),
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <form
          autoComplete="chrome-off"
          onSubmit={submit}
          style={{
            margin: theme.spacing(2),
            padding: theme.spacing(2),
            width: "100%",
            maxWidth: 500,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {dataMapping.map((d, index) => (
            <FormControl
              key={index}
              sx={{ margin: theme.spacing(2), width: "100%" }}
            >
              <TextField
                name={d.field}
                label={d.label}
                variant="filled"
                value={data[d.field].value}
                onChange={handleChange}
                multiline={d.field === "about"}
                rows={5}
                type={d.type}
                InputLabelProps={{ shrink: true }}
                required
                inputProps={{
                  className: classes.input,
                }}
                sx={{ backgroundColor: theme.palette.background.paper }}
                InputProps={{
                  endAdornment: data[d.field].dirty ? (
                    data[d.field].valid ? (
                      <Check sx={{ color: "green" }} />
                    ) : (
                      <Cancel sx={{ color: "red" }} />
                    )
                  ) : null,
                }}
              />
            </FormControl>
          ))}
          <Button
            variant="contained"
            sx={{ margin: theme.spacing(2), width: "100%" }}
            type="submit"
          >
            Save
          </Button>
        </form>
      </Box>
      <Snack
        severity={snackOpt.severity}
        message={snackOpt.message}
        open={snackOpt.open}
        handleClose={handleSnackClose}
      />
    </Box>
  );
};

export default Create;
